const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const playerImage = new Image();
playerImage.src = "img/player.png";

const mapImage = new Image();
mapImage.src = "img/map.png"

const starImage = new Image();
starImage.src = "img/star.png"

const player = {
    x: 100,
    y: 100,
    width: 32,
    height: 32,
    speed: 2,
    frameX: 0,
    frameY: 0,
    maxFrame: 3,
    frameDelay: 0
};

const stars = [
    { x: 200, y: 150, collected: false},
    { x: 400, y: 300, collected: false},
    { x: 600, y: 200, collected: false}
];

let score = 0;

const keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function movePlayer() {
    let moving = false;
    let direction = player.frameY;

    if (keys["ArrowUp"]) { player.y = Math.max(0, player.y - player.speed);
                           direction = 1; // su
                           moving = true; 
                        }

    if (keys["ArrowDown"]) { player.y = Math.min(canvas.height - player.height, player.y + player.speed);
                             direction = 0; // giu
                             moving = true;
                             }

    if (keys["ArrowLeft"]) { player.x =  Math.max(0, player.x - player.speed);
                             direction = 2; // sinistra;
                             moving = true;
                            }

    if (keys["ArrowRight"]) { player.x = Math.min(canvas.width - player.width, player.x + player.speed);
                              direction = 3; // destra
                              moving = true }

    if (moving) {
        player.frameY = direction;
        player.frameDelay++;
        if (player.frameDelay % 10 === 0) {
            player.frameX = (player.frameX + 1) % player.maxFrame;
        }
    } else {
        player.frameX = 0;
        player.frameDelay = 0;
    }

    stars.forEach(star => {
        if(!star.collected &&
            player.x < star.x + 32 &&
            player.x + player.width > star.x
            &&
            player.y < star.y + 32 &&
            player.y + player.height > star.y
        ) {
            star.collected = true;
            score += 10;
        }
    });
}

function drawPlayer() {
    ctx.drawImage (
        playerImage,
        player.frameX * player.width, player.frameY * player.height,
        player.width, player.height,
        player.x, player.y,
        player.width, player.height
    );
}

function drawMap() {
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
}

function drawStars() {
    stars.forEach(star => {
        if(!star.collected) {
            ctx.drawImage(starImage, star.x, star.y, 32, 32);
        }
    });
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Punteggio: ${score}`, 10, 30);
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawStars();
    movePlayer();
    drawPlayer();
    drawScore();
    requestAnimationFrame(loop);
}

let imagesLoaded = 0;
function handleImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === 3) {
        loop();
    }
}

playerImage.onload = handleImageLoad;
mapImage.onload = handleImageLoad;
starImage.onload = handleImageLoad;