let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 68;
let birdHeight = 48;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipe
let pipeArray = [];
let pipeWidth = 64;//384/3072 = 1/8
let pipeHeight = 512
let pipeX = boardWidth;//右上角開始
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;
let score = 0;
let gameOver = false;

let countdown = 3;
let gameStarted = false;
let flapSound;

window.onload = function(){
    showGameRules();
    
    
    board = document.getElementById("board");//這行程式碼的作用是找到 HTML 文件中 id 為 “board” 的元素，並將這個元素存儲到 board 變量中。
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    //context.fillStyle = "green";
    //context.fillRect(birdX,birdY,birdWidth,birdHeight);
    
    birdImg = new Image();
    birdImg.src = "airpica.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);//x 座標、y 座標、寬度和高度
    }

    topPipeImg = new Image();
    topPipeImg.src = "toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "bottompipe.png";
    
    flapSound = new Audio("pixel.mp3");
}
function update(){
    if(gameOver || !gameStarted){
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //bird
    flapSound.play();
    velocityY += gravity;
    //bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY ,0);//0是頂部
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    if(bird.y > boardHeight - 80){
        stopSound(flapSound); 
        gameOver = true; 
        showScoreBoard();

    }

    //pipe
    for(let i = 0;i < pipeArray.length;i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 1;
            pipe.passed = true;
        } 
        if(detectCollision(bird,pipe) || bird.y > boardHeight){
            stopSound(flapSound); 
            gameOver = true;
            showScoreBoard();
        }
        

    }
    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){ 
        pipeArray.shift();
    } 

    //score
    context.fillStyle = "white"; 
    context.font = "28px Arial";
    context.fillText("分數: " + score, 5, 45);
    

}

function placePipes(){
    if(gameOver){
        return;
    }
    let randomPipeY = pipeY - pipeHeight/4 - Math.random() * (pipeHeight/2);
    let openingSpace = board.height/4;
    let topPipe = {
        img : topPipeImg,
        x : pipeX,//開始位置
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,//尺寸
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,//開始位置
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,//尺寸
        passed : false
    }
    pipeArray.push(bottomPipe);
}
function moveBird(e){
    if(e.code == "Space" || e.code == "ArrowUp"){
        velocityY = -6;
        if(gameOver || !gameStarted){
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
            countdown = 3;
            update();
            hideScoreBoard();
        }
    }
    
}
function detectCollision(a,b){//a->bird,b->pipe
    if (a.x < b.x + b.width) {
        if (a.x + a.width > b.x) {
            if (a.y < b.y + b.height) {
                if (a.y + a.height > b.y) {
                    return true;  // 所有条件都成立，发生碰撞
                }
            }
        }
    }
    return false;
}
function stopSound(sound) {
    sound.pause();
    sound.currentTime = 0;
}
function showScoreBoard() {
    let scoreBoard = document.createElement("div");
    scoreBoard.id = "scoreBoard"; 
    scoreBoard.style.position = "absolute";
    scoreBoard.style.width = "300px";
    scoreBoard.style.height = "300px";
    scoreBoard.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    scoreBoard.style.color = "white";
    scoreBoard.style.fontSize = "20px";
    scoreBoard.style.textAlign = "center";
    scoreBoard.style.padding = "20px";
    scoreBoard.style.borderRadius = "10px";
    scoreBoard.style.top = "50%";
    scoreBoard.style.left = "50%";
    scoreBoard.style.transform = "translate(-50%, -50%)";

    scoreBoard.innerHTML = `
        <h1>遊戲結束</h1>
        <p>分數: ${score}</p>
        <h1>按空白鍵再玩一次</h1>
    `;

    document.body.appendChild(scoreBoard);
}
function hideScoreBoard() {
    let scoreBoard = document.getElementById("scoreBoard");
    if (scoreBoard) {
        document.body.removeChild(scoreBoard);
    }
}

function showGameRules() {
    let gameRules = document.createElement("div");
    gameRules.style.position = "absolute";
    gameRules.style.width = "300px";
    gameRules.style.height = "300px";
    gameRules.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    gameRules.style.color = "white";
    gameRules.style.fontSize = "20px";
    gameRules.style.textAlign = "center";
    gameRules.style.padding = "20px";
    gameRules.style.borderRadius = "10px";
    gameRules.style.top = "50%";
    gameRules.style.left = "50%";
    gameRules.style.transform = "translate(-50%, -50%)";

    gameRules.innerHTML = `
        <h1>遊戲規則</h1>
        <p>空白鍵向上飛,不要撞到柱子.</p>
        <p>經過柱子加2分.</p>
        <button onclick="startCountdown()">開始遊戲</button>
    `;

    document.body.appendChild(gameRules);
}
function startCountdown() {
    // 移除遊戲規則
    let gameRules = document.querySelector("div");
    document.body.removeChild(gameRules);

    // 開始倒數
    let countdownInterval = setInterval(function() {
        context.clearRect(0, 0, board.width, board.height);
        context.font = "55px Arial";
        context.fillText(countdown, board.width / 2, board.height / 2);
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            gameStarted = true;
            requestAnimationFrame(update);
            setInterval(placePipes,1500);//1.5s
            document.addEventListener("keydown", moveBird);
        }
    }, 1000);
}