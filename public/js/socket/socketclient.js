let token = document.getElementById('token').innerHTML;

//Establish Connection
let socket = io(`http://localhost:3000?token=${token}`);