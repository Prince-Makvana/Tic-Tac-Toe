let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreX = document.querySelector(".scorex");
let scoreTie = document.querySelector(".scoretie");
let scoreO = document.querySelector(".scoreo");
let newBtn = document.querySelector("#newbtn");
let mainContainer = document.querySelector(".main-container");

let turnO = true;
mainContainer.classList.remove("hidden");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const newGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    mainContainer.classList.remove("hidden");
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    mainContainer.classList.remove("hidden");
    scoreX.textContent = 0;
    scoreTie.textContent = 0;
    scoreO.textContent = 0;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.textContent = "X";
            turnO = false;
        }else{
            box.textContent = "O";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.textContent = "";
    });
};

const showWinner = (winner) =>{
    msg.textContent = `Congratulations Player ${winner} wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winnerFound = false;
    winPatterns.forEach((pattern) => {
        let box1 = boxes[pattern[0]].textContent;
        let box2 = boxes[pattern[1]].textContent;
        let box3 = boxes[pattern[2]].textContent;
        if(box1 === box2 && box2 === box3 && box1 !== ""){
            winnerFound= true;
            if(box1 === "X"){
                scoreX.textContent = Number(scoreX.textContent) + 1;
                showWinner(box1);
                mainContainer.classList.add("hidden");
            }
            else if(box1 === "O"){
                scoreO.textContent = Number(scoreO.textContent) + 1;
                showWinner(box1);
                mainContainer.classList.add("hidden");
            }
        }
    });

    if (!winnerFound) {
        let isTie = true;
        boxes.forEach((box) => {
            if (box.textContent === "") {
                isTie = false;
            }
        });

        if (isTie) {
            scoreTie.textContent = Number(scoreTie.textContent) + 1;
            msg.textContent = "It's a Tie!";
            msgContainer.classList.remove("hide");
            disableBoxes();
            mainContainer.classList.add("hidden");
        }
    }
    
};

newgameBtn.addEventListener("click",newGame);
newBtn.addEventListener("click",newGame);
resetBtn.addEventListener("click",resetGame);