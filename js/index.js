var flag = false;
var score = 0;
var speed = 1;
var createImgID;
var downImgID;
var game = document.querySelector("#game");
var start = document.querySelector(".start");
var box = document.querySelector("#box");
var scoreDom = document.querySelector(".score");
var squick = document.querySelector(".squick");
var tu = document.querySelector(".tu");
var shade = document.querySelector(".shade");
var reload = document.querySelector(".reload");
var music = document.querySelector("#mus");
var volume = document.querySelector("#volume");
var stop1 = document.querySelector(".stop");
var quick = document.querySelector(".quick");
start.onclick=function(){
    flag = true;
    play(speed);
    music.play();
    this.src = "img/music_open.png";
}
function randomLetter(){
    var chars = ['A','B','C','D','E','F','G','H','I','J','K',
    'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    var num = Math.floor(Math.random()*26);
    return chars[num];
}
function createImg(){
    if(flag){
        var DWidth = document.body.clientWidth;
        var img = document.createElement("img");
        img.src = "img/"+randomLetter()+".png";
        img.style.left=Math.floor(Math.random()*(DWidth-200)+100)+"px";
        img.style.top = "-100px";
        game.appendChild(img);

        console.log(img);
    }    
}
function downImg(){
    if(flag){
        var imgs = game.children;
        for (var i = 0; i<imgs.length;i++){
        var Top = parseInt(imgs[i].style.top);
        var Height = parseInt(box.offsetHeight)-200;
        if(Top<=Height){
            imgs[i].style.top = (Top + 2) + "px";
        }else{
            game.removeChild(imgs[i]);
            if(score == 0){
                score = 0;
            }else{
                score -= 10;
            }
            scoreDom.innerHTML = score;
            if(score <= 0){
                flag = false;
                music.pause();
                this.src = "img/music_open.png";
                shade.style.display = "block";
                reload.style.display = "block";
                window.clearInterval(createImgID);
                window.clearInterval(downImgID);
            }
        }
    }
}
    
}
squick.onclick = function(){
    location.reload();
}
tu.onclick = function(){
    window.close();
}
function play(speed){
    createImgID = setInterval(createImg,1000-speed*50);
    downImgID = setInterval(downImg,20-speed/2);
}
window.onkeyup = function(e){
    var eve = window.event || e;
    var imgs = game.children;
    var code = eve.keyCode;
    if(flag){
        for(var i = 0;i<imgs.length;i++){
            var img = imgs[i];
            var imgsrc = img.src.split("./");
            var name = imgsrc[imgsrc.length-1].split(".")[0]
            if(name.charCodeAt() == code){
                game.removeChild(img);
                score += 10;
                scoreDom.innerHTML = score;
            }
        }
    }
}
volume.onclick = function(){
    if(music.pause){
        music.play();
        this.src = "./img/music_open.png";
    }else{
        music.pause();
        this.src = "./img/music_close.png";
    }
}
stop1.onclick = function(){
    if(flag){
        music.pause();
        volume.src= "img/music_close.png";
        this.value="继 续 游 戏";
        flag=false;
    }else{
        music.play();
        volume.src = "img/music_open.png";
        this.value = "暂 停 游 戏";
        flag= true;
    }
}
quick.onclick = function(){
    if(flag){
        speed += 0.5;
        play(speed);
    }
}
