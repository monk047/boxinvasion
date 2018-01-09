let token = document.getElementById('token').innerHTML;

//Establish Connection
let socket = io(`https://intense-fortress-53620.herokuapp.com?token=${token}`);

socket.on('connect', function () {



});