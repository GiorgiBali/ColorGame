const startBtn = document.querySelector("#start");
const allBoxes = document.querySelectorAll(".box");
const requiredBoxes = document.querySelectorAll(".required");
const optionalBoxes = document.querySelectorAll(".optional");
const chosenColorBtn = document.querySelector("#chosenColor");
const resultBtn = document.querySelector("#result");
const levelBtn = document.querySelector("#level");
var chosenColor = undefined;
var colorsCollection = [];
var attempt = 1;

function generateRand(start, end) {
    return Math.round(Math.random() * (end - start) + start);
}

function generateColor() {
    return `rgb(${generateRand(0, 255)},${generateRand(0, 255)},${generateRand(0, 255)})`;
}

function getRandomColorsList(numberOfBoxes) {
    var tmpColors = [];
    while (tmpColors.length < numberOfBoxes) {
        tmpColors.push(generateColor());
    }

    return tmpColors;
}

function setColorsToBoxes(colorsList, activeBoxes) {
    activeBoxes.forEach(item => {
        item.style.backgroundColor = colorsList.pop()
    })
}

function getChosenColor(colorsList) {
    return colorsList[generateRand(0, colorsList.length - 1)];
}

function resetResultBtn()
{
    resultBtn.classList.remove("btn-danger");
    resultBtn.classList.remove("btn-success");
    resultBtn.classList.add("btn-warning");
    resultBtn.textContent = "RESULT";
}



startBtn.addEventListener("click", function () {
    if (levelBtn.textContent == "Hard") { colorsCollection = getRandomColorsList(6); }
    else { colorsCollection = getRandomColorsList(3); }
    chosenColor = getChosenColor(colorsCollection);
    if (levelBtn.textContent == "Hard") { setColorsToBoxes(colorsCollection, allBoxes); }
    else { setColorsToBoxes(colorsCollection, requiredBoxes); }
    chosenColorBtn.textContent = chosenColor;
    resetResultBtn(); attempt = 1;
})

allBoxes.forEach(boxItem => {
    boxItem.addEventListener("click", function(){
        if (attempt < 3 && !resultBtn.classList.contains("btn-success"))
        {
            if (chosenColor == this.style.backgroundColor.replaceAll(" ", ""))
            {
                resultBtn.textContent = "SUCCESS";
                resultBtn.classList.remove("btn-warning");
                resultBtn.classList.remove("btn-danger");
                resultBtn.classList.add("btn-success");
                if (attempt == 1) { alert("Win on First Attempt!"); }
            }
            else
            {
                if (attempt == 1) { resultBtn.textContent = "FAILED"; }
                else { resultBtn.textContent = "FAILED AGAIN"; }
                resultBtn.classList.remove("btn-warning");
                resultBtn.classList.add("btn-danger");
            }
            attempt++;
        }
    })
})

levelBtn.addEventListener("click", function(){
    if (levelBtn.textContent == "Hard")
    {
        levelBtn.textContent = "Easy";
        optionalBoxes.forEach(b => { b.classList.add("hidden"); });
        colorsCollection = getRandomColorsList(3);
        chosenColor = getChosenColor(colorsCollection);
        setColorsToBoxes(colorsCollection, requiredBoxes);
        chosenColorBtn.textContent = chosenColor;
        resetResultBtn(); attempt = 1;
    }
    else
    {
        levelBtn.textContent = "Hard";
        optionalBoxes.forEach(b => { b.classList.remove("hidden"); });
        colorsCollection = getRandomColorsList(6);
        chosenColor = getChosenColor(colorsCollection);
        setColorsToBoxes(colorsCollection, allBoxes);
        chosenColorBtn.textContent = chosenColor;
        resetResultBtn(); attempt = 1;
    }  
})