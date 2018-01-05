var width = prompt("enter width");
var height = prompt("enter height");
/*********Define Object BOARD************/
var board = {
  /*********DATA Sub-object of Object BOARD************/
  data : {
    // The GameBoard Width
    w: 2,
    // The GameBoard Height
    h: 2
  },
  /*********ELEMENT Sub-object of Object BOARD*********/
  element : {
    tiles : [],
    dots  : [],
    hlines: [],
    vlines: []
  },
  /*********METHODS of Object BOARD********************/
  //____ board.init(width,height) ____ takes two arg and initializes the dependent arrays to the given Dimensions
  init : function (w,h) {
    this.data.w = w;
    this.data.h = h;
    this.data.tilecount = w*h;
  }
};
