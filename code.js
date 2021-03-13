//data for for rolls remaining and how many they have. A variety of arrays, functions, etc.


let imgSrc= {"adversary":"https://raw.githubusercontent.com/breyes4/finalproject/main/tank.png", "defense":"https://raw.githubusercontent.com/breyes4/finalproject/main/raygun.png", "cows":"https://raw.githubusercontent.com/breyes4/finalproject/main/cow.png", "chickens":"https://raw.githubusercontent.com/breyes4/finalproject/main/chicken.png", "humans":"https://raw.githubusercontent.com/breyes4/finalproject/main/human.png"};

let rolls = 2;
$("#rollCount").append(rolls);

let score_X = 0;
let score_Y = 0;
let score_Z = 0;

let diceArray = [];

$(document).ready(function()
{
    $("button#start").click(startTurn);
    $("button#roll").click(roll);
    $("button#end").click(endTurn);
    $("button#x").click(scoreX);
    $("button#y").click(scoreY);
    $("button#z").click(scoreZ);

    for(let i = 0; i < 13; i++)
    {
        alienGame(i);
    }

    startTurn();

});

function alienGame(v) {
    let board = $("div#board");
    let dice = $("<span>");
    dice.attr("id","address"+v+"");
    dice.addClass("gamesAlien");
    dice.click(toggleHeld);
    board.append(dice);
}

function getRandomDieFace()
{
    let randomNumber =  Math.floor(Math.random() * 6) +1;
    let randomDieFace = "";
    if(randomNumber === 1 || randomNumber === 2)
        randomDieFace = "defense";
    else if (randomNumber === 3)
        randomDieFace = "adversary";
    else if (randomNumber === 4)
        randomDieFace = "cows";
    else if (randomNumber === 5)
        randomDieFace = "chickens";
    else if (randomNumber === 6)
        randomDieFace = "humans";

    return randomDieFace;
}

function createDieObject(index)
{
    let randomFace = getRandomDieFace();


    let dieObject ={
        face: randomFace,
        held: function(){
            if(this.face === "adversary")
                return this.held =true;
            else
                return this.held = false;
        } ,

        toggleHeld: function (){
            if(this.face !== "adversary") {
                if (this.held === false)
                    return this.held = true;
                else if (this.held === true)
                    return this.held = false;
            }
            else
                return this.held = true;
        }
    };

    diceArray.splice(index, 1, dieObject);

}

function sortDice(a, b)
{
    if (a.held > b.held)
        return -1;
    else if (a.held < b.held)
        return 1;
    else {
        if (a.face < b.face)
            return -1;
        else if (a.face > b.face)
            return 1;
        else
            return 0;
    }

}

function rollAllDice()
{
    for(let i = 0; i< 13; i++)
    {
        createDieObject(i);
    }
}
let i = 0;

function drawDie(index)
{
    let dice = $("span#address"+i);
    i++;
    let imageUrl = imgSrc[diceArray[index].face];
    dice.css({"background-image": "url(" + imageUrl + ")", "background-repeat":"no-repeat"});

    if(diceArray[index].held() === true)
    {
        dice.css("box-shadow", "10px 10px red");
    }
    else
        dice.css("box-shadow", "");

}

function drawAllDice()
{
    diceArray.sort(sortDice);

    for(let i = 0; i < diceArray.length; i++)
    {
        drawDie(i);
    }
}

function toggleHeld()
{
    let clickedSpan = $(this);
    let clickedIndex = clickedSpan.index();


    if(diceArray[clickedIndex].held === false)
    {

        diceArray[clickedIndex].toggleHeld();
    }
    else if(diceArray[clickedIndex].held === true)
    {
        diceArray[clickedIndex].toggleHeld();
    }

    if(diceArray[clickedIndex].held === true)
    {
        clickedSpan.css("box-shadow", "10px 10px blue");
    }
    else
        clickedSpan.css("box-shadow", "");

}

function startTurn()
{
    $("button#start").hide();
    $("button#x").hide();
    $("button#y").hide();
    $("button#z").hide();
    $("button#roll").show();
    $("button#end").show();


    rolls = 2;
    rollAllDice();
    drawAllDice();
}

function lost ()
{
    let adversaryCount = 0;
    let defenseCount = 0;

    for(let i = 0; i< diceArray.length; i++)

    {
        if(diceArray[i].face === "adversary"  && diceArray[i].held === true){

            adversaryCount++;
        }

        if(diceArray[i].face === "defense"  && diceArray[i].held === true){
            defenseCount++;
        }

    }

    alert("adversary count " + adversaryCount);
    alert("defense count " + defenseCount);


    if (adversaryCount > defenseCount)
        return true;
    else
        return false;
}

function endTurn()
{
    $("button#roll").hide();
    $("button#end").hide();


    let lostTurn = lost();

    if(lostTurn === true)
    {
        $("#message").text("You Lost! The adversary is more than defense");
        $("button#start").show();
    }
    else
    {
        if(score_X === 0)
            $("button#x").show();
        if(score_Y === 0)
            $("button#y").show();
        if(score_Z === 0)
            $("button#z").show();
    }
}


function roll()
{
    rolls--;
    $("#rollCount").text(rolls);

    for(let i = 0; i < diceArray.length; i++)
    {

        if(diceArray[i].held === false)
        {
            createDieObject(i);

        }

    }

    i = 0;
    drawAllDice();

    if(rolls === 0)
    {
        endTurn();
    }


}

function endGame()
{
    $("button#start").hide();
    $("button#roll").hide();
    $("button#end").hide();
    $("button#x").hide();
    $("button#y").hide();
    $("button#z").hide();

    $("#message").text(`You scored ${score_X} humans, ${score_Y} cows and ${score_Z} chickens`);
}



function scoreX()
{
    let countX = 0;
    for(let i = 0; i< diceArray.length; i++)
    {
        if(diceArray[i].face === "humans" && diceArray[i].held === true)
            countX++;
    }


    score_X = countX;


    $("#human").append(countX);
    $("h5#message").text(`You scored ${countX} humans.`);


    if(score_X > 0 && score_Y > 0 && score_Z> 0)
    {
        endGame();
    }
    else
        startTurn();

}


function scoreY()
{

    let countY = 0;
    for(let i = 0; i< diceArray.length; i++)
    {
        if(diceArray[i].face === "cows" && diceArray[i].held === true)
            countY++;
    }

    score_Y = countY;


    $("#cows").append(countY);
    $("h5#message").text(`You scored ${countY} cows.`);


    if(score_X > 0 && score_Y > 0 && score_Z> 0)
    {
        endGame();
    }
    else
        startTurn();

}

function scoreZ()
{
    let countZ = 0;
    for(let i = 0; i< diceArray.length; i++)
    {
        if(diceArray[i].face === "chickens" && diceArray[i].held === true)
            countZ++;
    }

    score_Z = countZ;


    $("#chickens").append(countZ);
    $("h5#message").text(`You scored ${countZ} chickens.`);


    if(score_X > 0 && score_Y > 0 && score_Z> 0)
    {
        endGame();
    }
    else
        startTurn();
}
