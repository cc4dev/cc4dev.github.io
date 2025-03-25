let squares = document.querySelectorAll(".ttt-square");
let currentTurn = "x";
let squareCount = 0;
let squareX = [];
let squareO = [];
let isGameOver = false;

const winCondition = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
]

const displayResult = document.getElementById("ttt-display-result");
const board = document.getElementById("ttt-board");

squares.forEach((element) => {
    element.addEventListener("click", updateBoard, {once: true});
});

function restartGame()
{
    location.reload();
}

function winCheck(currentCombination, currentTurn)
{
    for (let i = 0;i < winCondition.length;++i)
    {
        let fullCombination = 0;
        for (let j = 0;j < winCondition[i].length;++j)
        {
            if (currentCombination.includes(winCondition[i][j]))
            {
                fullCombination += 1;
            }
        }
        if (fullCombination == 3)
        {
            console.log(`${currentTurn} wins!`);
            isGameOver = true;
            displayResult.innerText = `The winner is ${currentTurn}!`;
            squares.forEach(element => {
                element.style.cursor = "not-allowed";
            });
            return true;
        }
    }
    return false;
}

function drawCheck()
{
    if (winCheck(squareX, currentTurn) == false && winCheck(squareO, currentTurn) == false && squareCount == 9)
    {
        displayResult.innerText = "It's a Draw!";
    }
}

function updateBoard(event)
{
    if (isGameOver == false)
    {
        const squareClicked = event.target;
        squareClicked.innerText = currentTurn.toUpperCase();
        squareCount += 1;
        let squareOrder = +squareClicked.id;
        console.log(`clicked ${squareOrder}`);
        if (currentTurn == "x")
        {
            squareX.push(squareOrder);
            winCheck(squareX, "x");
            console.log(squareX);
        }
        else
        {
            squareO.push(squareOrder);
            winCheck(squareO, "o");
            console.log(squareO);
        }
        drawCheck();
        if (currentTurn == "x") currentTurn = "o";
        else currentTurn = "x";
    }
}