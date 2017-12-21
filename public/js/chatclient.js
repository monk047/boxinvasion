// var socket = io.connect('http://localhost:3000');
var socket = io();
var message = document.getElementById('message');
user = document.getElementById('user');
btn = document.getElementById('send');
messageArea = document.getElementById('messageArea');
feedback = document.getElementById('typingMessage');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        user: user.value
    });
    message.value = "";
});
message.addEventListener('keypress', function(event){

    if (event.key === "Enter") {
        socket.emit('chat', {
            message: message.value,
            user: user.value
        });
        message.value = "";
    }

    socket.emit('typing', user.value);
})
// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    messageArea.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
});
socket.on('typing', function(data){
    typingMessage.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});