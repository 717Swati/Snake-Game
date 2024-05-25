//Constant part
let inputdir = { x: 0, y: 0 };
let SnakeArr = [{ x: 10, y: 12 }];
let food = { x: 5, y: 7 };
let score = 0;

//Music
const foodsound = new Audio("Music/food.mp3");
const gameoversound = new Audio("Music/gameover.mp3");
const movesound = new Audio("Music/move.mp3");
const musicsound = new Audio("Music/music.mp3");

//Game Loop
let speed = 5;
let lastpaintTime = 0;

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
}

function isCollide(Sarr) {
    //jab wo wall se takrayega
    if (SnakeArr[0].x >= 18 || SnakeArr[0].x <= 0 ||
        SnakeArr[0].y >= 18 || SnakeArr[0].y <= 0) {
        return true;
    }
    // jab wo khud se takra jaaye
    for (let i = 1; i < SnakeArr.length; i++) {
        if (SnakeArr[i].x === SnakeArr[0].x && SnakeArr[i].y === SnakeArr[0].y) {
            return true;
        }
    }
}

//Game Logic
function gameEngine() {
    if (isCollide(SnakeArr)) {
        score = 0;
        document.querySelector('.scorebox').innerHTML = "Score=" + score;
        gameoversound.play();
        musicsound.pause();
        alert("*** Game Over ***");
        inputdir = { x: 0, y: 0 };
        SnakeArr = [{ x: 10, y: 12 }];
        musicsound.play();
    }
    //Snake will eat food and move forward
    if (SnakeArr[0].y === food.y && SnakeArr[0].x === food.x) {
        musicsound.play();
        foodsound.play();
        score += 1;
        document.querySelector('.scorebox').innerHTML = "Score=" + score;

        //now add element using unshift method
        SnakeArr.unshift({
            x: SnakeArr[0].x + inputdir.x,
            y: SnakeArr[0].y + inputdir.y,
        });

        //Random food genrate
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random()),
        };
    }

    //move snake
    for (let i = SnakeArr.length - 2; i >= 0; i--) {
        SnakeArr[i + 1] = { ...SnakeArr[i] };
    }
    SnakeArr[0].x += inputdir.x;
    SnakeArr[0].y += inputdir.y;

    //display head
    board.innerHTML = "";
    SnakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");  //to create element using js
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        //Add class using js
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }

        board.appendChild(snakeElement);
    });

    //display food
    foodElement = document.createElement("div");  //to create element using js
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

//main Logic
let count = JSON.parse(localStorage.getItem("score"));
musicsound.play();
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputdir = { x: 0, y: 1 };
    movesound.play();
    switch (e.key) {
        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowUp":
            inputdir.x = 0;
            inputdir.y = -1;
            break;
    }
});

document.querySelector(".down").addEventListener("click", () => {
    inputDir.x = 0;
    inputDir.y = 1;
});
document.querySelector(".left").addEventListener("click", () => {
    inputdir.x = -1;
    inputdir.y = 0;
});
document.querySelector(".right").addEventListener("click", () => {
    inputdir.x = 1;
    inputdir.y = 0;
});
document.querySelector(".up").addEventListener("click", () => {
    inputdir.x = 0;
    inputdir.y = -1;
});
document.querySelector(".down").addEventListener("click", () => {
    inputdir.x = 0;
    inputdir.y = 1;
});
// Start playing music on the first interaction to comply with mobile policies
window.addEventListener("click", () => {
    musicsound.play();
}, { once: true });

window.addEventListener("touchstart", () => {
    musicsound.play();
}, { once: true });
