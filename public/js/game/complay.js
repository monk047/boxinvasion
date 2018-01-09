var canvas = document.querySelector('canvas');
//Canvas Dimension
var cnvW = 500+20;
var cnvH = 500+20;
//Setting Canvas Dimensions
canvas.width = cnvW;
canvas.height = cnvH;
//Context variable
var c = canvas.getContext('2d');
/***************************************************/
//Array of the objects
//var board [11][11];
/***************************************************/
//RENDER DOTS
var dotX =0;
var dotY =0;
var dotHeight = 20;
var dotWidth = 20;
//DOT COLOR
c.fillStyle ='#469280';// 'rgba(27, 71, 142,0.75)';

// varaibles
var numberOfDots = 6;
var cellWidth = 100;

//Loop to render the dots
for (var i = dotX; i < numberOfDots; i++) {
    for (var j = dotY; j < numberOfDots; j++) {
        c.fillRect(i*cellWidth, j*cellWidth, dotWidth, dotHeight);
    }
}


$( document ).ready(function() {


    //alert("called");



    $("#Leave_Game").hide();

    $( "#Play" ).click(function() {
        var canvas = document.getElementById("canvas");
        canvas.addEventListener('click', getPosition , false);

        document.getElementById("game_msg").innerHTML = "<h3><span> Make a first move </span></h3>";

        $("#Play").hide();
        $("#Leave_Game").show();

        var PlayerTurnStatus = document.getElementById("PlayerTurn");
        PlayerTurnStatus.innerHTML = "<h3>" +"<span class ='label label-success'>" +
            TurnStatus +
            "</span>" + "</h3>";

    });
});





var player1Name = "P1";
var player2Name = "n/a" ;
var TurnStatus = "P1";


function checkboard(HLineNo , VLineNo , isHorizontal , isVertical)
{
  var bComTurn = true;
  var ComputerHorizontalLineNumber;
  var ComputerVerticalLineNumber;
var HorizontalCompeletedLines;
var VerticalCompeletedLines;

while(bComTurn)
{
    var res =false;
    var randonNumberX = Math.floor((Math.random() * 500) + 0);
    var randonNumberY = Math.floor((Math.random() * 500) + 0);
    ComputerHorizontalLineNumber = Math.floor(randonNumberX / 100);
    ComputerVerticalLineNumber = Math.floor(randonNumberY / 100);
    var XVal = randonNumberX % 100;
    var YVal = randonNumberY % 100;
    if( (XVal > 20 && XVal < 100)  && (YVal > 0  && YVal < 20) ){
        if(IsHorizontal(randonNumberX ,randonNumberY))
            {
                bComTurn = false;
            }
    }
    else if( (XVal > 0 && XVal < 20)  && (YVal > 20  && YVal < 100) )
    {
        if(IsVertical(randonNumberX, randonNumberY))
            {
                bComTurn = false;
            }
    }
}
// IF COMPUTER GETS EXTRA TURN.
if(TurnStatus == "COM")
    setTimeout(ComputerTurn, 800);
else
    TurnStatus = "P1";

//update turn message after Computer's turn.
UpdateTurnStatus();

var Player1stats = document.getElementById( "player1_stats");
Player1stats.innerHTML = "<span class =' text-center label label-success'>" +
    Player1Score +
    "</span>";

var Player2stats = document.getElementById( "player2_stats");
Player2stats.innerHTML = "<span class =' text-center label label-success'>" +
    Player2Score +
    "</span>" ;

if(HorizontalCompeletedLines + VerticalCompeletedLines = 3){
  //draw if 3 lines are made
}
else if(HorizontalCompeletedLines + VerticalCompeletedLines = 1){
//draw where 1 line is made

}
else {
  //draw anywhere
}

}


function getPosition(event)
{

    document.getElementById("game_msg").innerHTML = "";
    x = event.offsetX || event.layerX ;
    y = event.offsetY || event.layerY ;

    IsHorizontal(x,y);
    IsVertical(x,y);



    player2Name = "Computer";
    //alert(TurnStatus + " turn");
    if(TurnStatus != "P1")
    {
            setTimeout(ComputerTurn, 800);
    }

    //update turn message after Player's turn.
    UpdateTurnStatus();
    var Player1stats = document.getElementById( "player1_stats");
    Player1stats.innerHTML = "<span class ='text-center label label-success'>" +
                                Player1Score +
                                "</span>" ;

    var Player2stats = document.getElementById( "player2_stats");
    Player2stats.innerHTML = "<span class =' text-center label label-success'>" +
                                Player2Score +
                                "</span>" ;


}
function ComputerTurn(){

    var bComTurn = true;
    var ComputerHorizontalLineNumber;
    var ComputerVerticalLineNumber;
    while(bComTurn)
    {
        var res =false;
        var randonNumberX = Math.floor((Math.random() * 500) + 0);
        var randonNumberY = Math.floor((Math.random() * 500) + 0);
        ComputerHorizontalLineNumber = Math.floor(randonNumberX / 100);
        ComputerVerticalLineNumber = Math.floor(randonNumberY / 100);
        var XVal = randonNumberX % 100;
        var YVal = randonNumberY % 100;
        if( (XVal > 20 && XVal < 100)  && (YVal > 0  && YVal < 20) ){
            if(IsHorizontal(randonNumberX ,randonNumberY))
                {
                    bComTurn = false;
                }
        }
        else if( (XVal > 0 && XVal < 20)  && (YVal > 20  && YVal < 100) )
        {
            if(IsVertical(randonNumberX, randonNumberY))
                {
                    bComTurn = false;
                }
        }
    }
    // IF COMPUTER GETS EXTRA TURN.
    if(TurnStatus == "COM")
        setTimeout(ComputerTurn, 800);
    else
        TurnStatus = "P1";

    //update turn message after Computer's turn.
    UpdateTurnStatus();

    var Player1stats = document.getElementById( "player1_stats");
    Player1stats.innerHTML = "<span class =' text-center label label-success'>" +
        Player1Score +
        "</span>";

    var Player2stats = document.getElementById( "player2_stats");
    Player2stats.innerHTML = "<span class =' text-center label label-success'>" +
        Player2Score +
        "</span>" ;

}


function UpdateTurnStatus()
{
    var PlayerTurnStatus = document.getElementById("PlayerTurn");
    PlayerTurnStatus.innerHTML = "<h3>" +"<span class ='label label-success'>" +
        TurnStatus +
        "</span>" + "</h3>";
}

/////////////////////////////// Variables ///////////////////////////////
c.font = "bold 18px Slab serif";
//c.fontWeight(20);
var RectX = 20;
var RectY =20;
var RectWidth = 80;
var RectHeight =80;
var PlayerNoRectX = 52;
var PlayerNoRectY =63;

var IsBoxCompleted =false;

var HorizontalLineNumber = 0;
var VerticalLineNumber = 0;

var count = 0;


var HorizontalArrayLineStatus = [ [],[],[],[],[] ]; // Horizontal array
var VerticalArrayLineStatus = [ [],[],[],[],[] ]; // Vertical array
var BoxCapturedArray = [[], [], [], [], [] ];

var Player1Score =0;
var Player2Score =0;



/////////////////////////////////////////////////////////////////////////



function IsHorizontal(x ,y)
{
    IsBoxCompleted =false;
    HorizontalLineNumber = Math.floor(x / 100);
    VerticalLineNumber = Math.floor(y / 100);

   // alert(HorizontalLineNumber + " , " + VerticalLineNumber)
    var XVal = x % 100;
    var YVal = y % 100;
    if( (XVal > 20 && XVal < 100)  && (YVal > 0  && YVal < 20) )
    {

        // CHECK FOR ALREADY DRAWN LINE
        var result = validateMove(HorizontalLineNumber , VerticalLineNumber ,true ,false);
        if(!result){
            return false;
        }

        if(CheckBoxCompleted(HorizontalLineNumber , VerticalLineNumber , true  ,false))
        {
            if(count%2 == 0)
            {
                TurnStatus = "P1";
            }
            else {
                TurnStatus = "COM";
            }

        }

        if(!IsBoxCompleted )
        {
             //alert("count incremented");
            count++;//kiski turn ha odd and even (1st player)

            if(count%2 == 0)
            {
                TurnStatus = "P1";
            }
            else {
                TurnStatus = "COM";
            }
        }

        var hLineX = 20;
        var hLineY = 0;
        var hLineW = 80;
        var hLineH = 20;

        PopulateArray(HorizontalLineNumber , VerticalLineNumber ,true); //true is for Horizontal
        //drawing the Line
        c.fillStyle = '#1d5a67';//'rgba(250, 144, 33,0.7)';
        c.fillRect((HorizontalLineNumber*cellWidth)+hLineX,(VerticalLineNumber*cellWidth)+hLineY, hLineW, hLineH);
    }
    return true;
}

function IsVertical(x ,y)
{


    IsBoxCompleted =false;
    HorizontalLineNumber = Math.floor(x / 100);
    VerticalLineNumber = Math.floor(y / 100);
    var XVal = x % 100;
    var YVal = y % 100;
    if( (XVal > 0 && XVal < 20)  && (YVal > 20  && YVal < 100) )
    {

        // CHECK FOR ALREADY DRAWN LINE
        var result = validateMove(HorizontalLineNumber , VerticalLineNumber , false ,true);
        if(!result){
            return false;
        }

        if(CheckBoxCompleted(HorizontalLineNumber , VerticalLineNumber , false ,true))
        {
            if(count%2 == 0)
            {
                TurnStatus = "P1";
            }
            else {
                TurnStatus = "COM";
            }
        }


        if(!IsBoxCompleted )
        {
            //alert("count incremented");
            count++;

            if(count%2 == 0)
            {
                TurnStatus = "P1";
            }
            else {
                TurnStatus = "COM";
            }
        }

        var vLineX = 0;
        var vLineY = 20;
        var vLineW = 20;
        var vLineH = 80;

        PopulateArray(VerticalLineNumber,HorizontalLineNumber ,false); //false is for Vertical
        //drawing the Line
        c.fillStyle = '#1d5a67';//'rgba(250, 144, 33,0.7)';
        c.fillRect((HorizontalLineNumber*cellWidth)+vLineX,(VerticalLineNumber*cellWidth)+vLineY, vLineW, vLineH);
    }
    return true;
}

function PopulateArray(FirstIndex , SecondIndex , isHorizontal)
{

    if(isHorizontal){

        HorizontalArrayLineStatus[FirstIndex][SecondIndex] = 'Filled';
    }
    else{

        VerticalArrayLineStatus[FirstIndex][SecondIndex] = 'Filled';
    }

    //alert(count);
}

function PopulateBoxCapturedArray(FirstIndex , SecondIndex )
{
    //alert(FirstIndex +" , " + SecondIndex);
    BoxCapturedArray[FirstIndex][SecondIndex] = TurnStatus;

}

function CalculateScore()
{
    var score1 =0;
    var score2 =0;
    for(var i=0; i<BoxCapturedArray.length; i++)
    {
        for(var j=0; j<BoxCapturedArray.length; j++)
        {
            if(BoxCapturedArray[i][j] == "P1")
            {
                score1++;
            }
            else if(BoxCapturedArray[i][j] == "COM")
            {
                score2++;
            }
        }
    }
    if(score1+score2 == 25)
    {
        if(score1 > score2)
        {
            WinningUpdate(document.getElementById("user").innerHTML);
        }
        else
        {
            WinningUpdate(player2Name);
        }
    }
    Player1Score = score1;
    Player2Score = score2;
   // alert(Player1Score);
}
// HTMLCanvasElement.prototype.getPosition = getPosition;


function WinningUpdate(WinnerName) {
    /*$('#myModal').modal('show');
    $('#modal_title').innerHTML = "Congratulations "+WinnerName;
    $('#modal_message').innerHTML = "You Win";
    $('#modal_yes').click(function () {
        $('#Leave_Game').trigger('click');
    })*/

    $('.Celebration').fireworks({
        sound: true, // sound effect
        opacity: 0.4,
        width: '20%',
        height: '30%'
    });

}
function CheckBoxCompleted(HLineNo , VLineNo , isHorizontal , isVertical){
    if(isHorizontal)
    {

        if(HorizontalArrayLineStatus[HLineNo][VLineNo + 1] == "Filled" &&
            VerticalArrayLineStatus[VLineNo][HLineNo] == "Filled" &&
            VerticalArrayLineStatus[VLineNo][HLineNo + 1] == "Filled" )
        {
            IsBoxCompleted = true;
            if(count%2 == 0)
            {
                c.fillStyle = 'rgba(0, 0, 0, 1.0)';//'#131a67';
                c.fillText('P1',PlayerNoRectX + (HLineNo * 100) ,PlayerNoRectY + ((VLineNo) *100));
                c.fillStyle = 'rgba(255, 0, 0, .4)';//'#131a67';
            }
            else
            {
                c.fillStyle = 'rgba(0, 0, 0, 1.0)';//'#131a67';
                c.fillText(player2Name, (PlayerNoRectX - 8) + (HLineNo * 100) ,PlayerNoRectY + ((VLineNo) *100));
                c.fillStyle = 'rgba(0, 0, 255, .4)';//'#131a67';
            }

            c.fillRect(RectX + ( HLineNo * 100),RectY + (VLineNo *100)  , RectWidth, RectHeight);

            //update the box captures status.

            PopulateBoxCapturedArray(HLineNo , VLineNo);
            CalculateScore();

        }
        if(HorizontalArrayLineStatus[HLineNo][VLineNo - 1] == "Filled" &&
            VerticalArrayLineStatus[VLineNo - 1][HLineNo + 1] == "Filled" &&
            VerticalArrayLineStatus[VLineNo - 1][HLineNo] == "Filled" )
        {
            IsBoxCompleted = true;
            // Player 1 turn and box is captured by player 1
            if(count%2 == 0)
            {
                c.fillStyle = 'rgba(0, 0, 0, 1.0)';//'#131a67';

                c.fillText('P1',PlayerNoRectX + (HLineNo * 100) ,PlayerNoRectY + ((VLineNo -1) *100));
                c.fillStyle = 'rgba(255, 0, 0, .4)';//'#131a67';
            }
            else
            // Player 2 turn and box is captured by player 2
            {
                c.fillStyle = 'rgba(0, 0, 0, 1.0)';//'#131a67';

                c.fillText(player2Name, (PlayerNoRectX - 8) + (HLineNo * 100) ,PlayerNoRectY + ((VLineNo -1) *100));
                c.fillStyle = 'rgba(0, 0, 255, .4)';//'#131a67';
            }

            c.fillRect(RectX + (HLineNo * 100),RectY + ((VLineNo -1) *100) , RectWidth, RectHeight);
            //alert("Box Completed case 2");
            PopulateBoxCapturedArray(HLineNo , VLineNo-1);
            CalculateScore();
        }
    }
    else if(isVertical) {

        if(VerticalArrayLineStatus[VLineNo][HLineNo + 1] == "Filled" &&
            HorizontalArrayLineStatus[HLineNo][VLineNo] == "Filled" &&
            HorizontalArrayLineStatus[HLineNo][VLineNo + 1] == "Filled" )
        {
            IsBoxCompleted = true;
            if(count%2 == 0)
            {
                c.fillStyle = 'rgba(0, 0, 0, 1.0)';//'#131a67';

                c.fillText('P1',PlayerNoRectX + (HLineNo * 100) ,PlayerNoRectY + ((VLineNo) *100));
                c.fillStyle = 'rgba(255, 0, 0, .4)';//'#131a67';
            }
            else
            {
                c.fillStyle = 'rgba(0, 0, 0, 1.0)';//'#131a67';

                c.fillText(player2Name, (PlayerNoRectX - 8) + (HLineNo * 100) ,PlayerNoRectY + ((VLineNo) *100));
                c.fillStyle = 'rgba(0, 0, 255, .4)';//'#131a67';
            }
            // c.fillStyle = 'rgba(255, 0, 0, .4)';//'#131a67';
            c.fillRect(RectX + ( HLineNo * 100),RectY + (VLineNo *100)  , RectWidth, RectHeight);

            //alert("Box Completed case 1");
            PopulateBoxCapturedArray( HLineNo,VLineNo);
            CalculateScore();
        }
        if(VerticalArrayLineStatus[VLineNo][HLineNo - 1] == "Filled" &&
            HorizontalArrayLineStatus[HLineNo - 1 ][VLineNo ] == "Filled" &&
            HorizontalArrayLineStatus[HLineNo - 1][VLineNo + 1] == "Filled" )
        {
            IsBoxCompleted = true;
            if(count%2 == 0)
            {
                c.fillStyle = 'rgba(0, 0, 0, 1.0)';//'#131a67';

                c.fillText('P1',PlayerNoRectX + ( (HLineNo - 1) * 100) ,PlayerNoRectY + (VLineNo*100));
                c.fillStyle = 'rgba(255, 0, 0, .4)';//'#131a67';
            }
            else
            {
                c.fillStyle = 'rgba(0, 0, 0, 1.0)';//'#131a67';

                c.fillText(player2Name,(PlayerNoRectX - 8) + ( (HorizontalLineNumber - 1) * 100) ,PlayerNoRectY + (VLineNo*100));
                c.fillStyle = 'rgba(0, 0, 255, .4)';//'#131a67';
            }
            //c.fillStyle = 'rgba(255, 0, 0, .4)';//'#131a67';
            c.fillRect(RectX + ( (HorizontalLineNumber - 1) * 100),RectY + ((VLineNo) *100) , RectWidth, RectHeight);
            //alert("Box Completed case 2");
            PopulateBoxCapturedArray(HLineNo-1 , VLineNo );
            CalculateScore();

        }
    }
    return IsBoxCompleted;

}

function updateUI()
{
    if(count%2 == 0) {

    }
    else {

    }

}
function validateMove(HLineNo , VLineNo , isHorizontalLine , isVerticalLine)
{
    if(isHorizontalLine)
    {
        if(HorizontalArrayLineStatus[HLineNo][VLineNo] == "Filled") {
           // alert("H : line is already drawn");
            return false;
        }
    }
    else if(isVerticalLine)
    {
        if(VerticalArrayLineStatus[VLineNo][HLineNo] == "Filled") {
            //alert("V :line is already drawn");
            return false;
        }
    }

    return true;
}

function CheckWinningCondition()
{

}
function sendMove() // update the game object and send it to gameEngine
{

}



// this is for show modal on the page load

    $(window).on('load',function(){
        $('#myModal').modal('show');
    });


var modalConfirm = function(callback){

    $("#modal-btn-yes").on("click", function(){
        callback(true);
        $("#myModal").modal('hide');
    });

    $("#modal-btn-no").on("click", function(){
        callback(false);
        $("#myModal").modal('hide');
    });
};

modalConfirm(function(confirm){
    if(confirm){
        $("#result").html("You are playing with Computer");
    }else{
        $("#result").html("Challenge to start the game");
    }
});
