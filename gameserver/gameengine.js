function Game () {
	//ID
	this.ID = new ObjectID();
	this.type = bool; //0 for computer, 1 multiplayer
	this.player = ['user 1 ID','user 2 ID'/0];
	this.turn = 0 for palyer[0], 1 for player[1];

	this.board = new Board();

	this.connection = 0;

	this.socketID = ['player 1 socket ', 'player 2'] //null for comp


	//functions
	function init();

	function updateGameDB();

	function broadcastGameState(); //send the current game object

	function checkWinningCondition();

	function WinScript();

}

function Board () {
	this.length = 5;
	this.width = 5;

	//array of dots
<<<<<<< HEAD
	this.dots[][] = 
	x, y pos
	color 
=======
	this.dots[][] =
	x, y pos
	color
>>>>>>> a9df8f75ac5d059647a1d3172253299c91bb9d37



	this.tiles[][] =
	x, y pos
<<<<<<< HEAD
	empty color 
=======
	empty color
>>>>>>> a9df8f75ac5d059647a1d3172253299c91bb9d37
	filled color [player 1, player 2]
	captured = bool
	captured by = playerID


<<<<<<< HEAD
	this.hline[][] = 
	x, y pos
	empty color 
=======
	this.hline[][] =
	x, y pos
	empty color
>>>>>>> a9df8f75ac5d059647a1d3172253299c91bb9d37
	filled color [player 1, player 2]
	DRAWN = bool
	DRAWN by = playerID


<<<<<<< HEAD
	this.vline[][] = 
	x, y pos
	empty color 
=======
	this.vline[][] =
	x, y pos
	empty color
>>>>>>> a9df8f75ac5d059647a1d3172253299c91bb9d37
	filled color [player 1, player 2]
	DRAWN = bool
	DRAWN By = playerID

	//functions
	board init();
	board draw();

}
<<<<<<< HEAD


=======
>>>>>>> a9df8f75ac5d059647a1d3172253299c91bb9d37
