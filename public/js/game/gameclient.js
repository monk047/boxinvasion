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



var canvas = document.getElementById("canvas");

canvas.addEventListener('click', getPosition , false);

function getPosition(event)
{
    x = event.offsetX || event.layerX ;
    y = event.offsetY || event.layerY ;

    IsHorizontal(x,y);
    IsVertical(x,y);

    // alert("x: " + x + "  y: " + y);
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

/////////////////////////////////////////////////////////////////////////



function IsHorizontal(x ,y)
{
    IsBoxCompleted =false;
    HorizontalLineNumber = Math.floor(x / 100);
    VerticalLineNumber = Math.floor(y / 100);
    var XVal = x % 100;
    var YVal = y % 100;
    if( (XVal > 20 && XVal < 100)  && (YVal > 0  && YVal < 20) )
    {
        // CHECK FOR ALREADY DRAWN LINE
        var result = validateMove(HorizontalLineNumber , VerticalLineNumber ,true ,false);
        if(!result){
            return;
        }

        CheckBoxCompleted(HorizontalLineNumber , VerticalLineNumber , true  ,false);

        if(!IsBoxCompleted )
        {
            // alert("count incremented");
            count++;
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
    return ;
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
            return;
        }

        CheckBoxCompleted(HorizontalLineNumber , VerticalLineNumber , false ,true);

        if(!IsBoxCompleted )
        {
            //alert("count incremented");
            count++;
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
    return ;
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
// HTMLCanvasElement.prototype.getPosition = getPosition;

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
                c.fillText('P2', PlayerNoRectX + (HLineNo * 100) ,PlayerNoRectY + ((VLineNo) *100));
                c.fillStyle = 'rgba(0, 0, 255, .4)';//'#131a67';
            }

            c.fillRect(RectX + ( HLineNo * 100),RectY + (VLineNo *100)  , RectWidth, RectHeight);


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

                c.fillText('P2', PlayerNoRectX + (HLineNo * 100) ,PlayerNoRectY + ((VLineNo -1) *100));
                c.fillStyle = 'rgba(0, 0, 255, .4)';//'#131a67';
            }

            c.fillRect(RectX + (HLineNo * 100),RectY + ((VLineNo -1) *100) , RectWidth, RectHeight);
            //alert("Box Completed case 2");
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

                c.fillText('P2', PlayerNoRectX + (HLineNo * 100) ,PlayerNoRectY + ((VLineNo) *100));
                c.fillStyle = 'rgba(0, 0, 255, .4)';//'#131a67';
            }
            // c.fillStyle = 'rgba(255, 0, 0, .4)';//'#131a67';
            c.fillRect(RectX + ( HLineNo * 100),RectY + (VLineNo *100)  , RectWidth, RectHeight);

            //alert("Box Completed case 1");
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

                c.fillText('P2',PlayerNoRectX + ( (HorizontalLineNumber - 1) * 100) ,PlayerNoRectY + (VLineNo*100));
                c.fillStyle = 'rgba(0, 0, 255, .4)';//'#131a67';
            }
            //c.fillStyle = 'rgba(255, 0, 0, .4)';//'#131a67';
            c.fillRect(RectX + ( (HorizontalLineNumber - 1) * 100),RectY + ((VLineNo) *100) , RectWidth, RectHeight);
            //alert("Box Completed case 2");
        }
    }

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
            alert("H : line is already drawn");
            return false;
        }
    }
    else if(isVerticalLine)
    {
        if(VerticalArrayLineStatus[VLineNo][HLineNo] == "Filled") {
            alert("V :line is already drawn");
            return false;
        }
    }

    return true;
}
function sendMove() // update the game object and send it to gameEngine
{

}