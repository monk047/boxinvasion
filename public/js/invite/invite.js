/*
@Shafiq Aslam
* showing live user in invite div
 */
/*var message = document.getElementById('message');
btn = document.getElementById('send');
messageArea = document.getElementById('messageArea');
feedback = document.getElementById('typingMessage');*/
var thisUser=document.getElementById("user").value;
let myToken =document.getElementById("token1").value;
//show live user
socket.on('newuser', function(data){
    var ele=document.getElementById("onlineuser");
    // $('#onlineuser').empty();
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
    }
    for(i in data.activeUlist) {
        console.log("User id " + data.activeUlist[i]._id);
        console.log(JSON.stringify(data.activeUlist, undefined, 4));
        if (data.activeUlist[i].username !== thisUser) {
            var element = document.getElementById('onlineuser');
            //  if(( $( "#onlineuser" ).length ))
            // element.innerHTML+='<div></div><span class="input-group-addon small" style="width: inherit" id="basic-addon1">'+data.activeUlist[i].username+'</span><span class="input-group-btn "><button socketid="'+data.activeUlist[i].socketid+'"class="btn btn-primary"  id="'+data.activeUlist[i].userid+'">Send</button></span></div>';

            let frag = document.createDocumentFragment();
            let row = frag.appendChild(document.createElement('tr'));
            row.className = "info";
            let col1 = row.appendChild(document.createElement('td'));
            let col2 = row.appendChild(document.createElement('td'));
            col1.innerHTML = data.activeUlist[i].username;
            col2.innerHTML = '<p align="right"> <button  onclick="inviteSend(this)" socketid="' + data.activeUlist[i].socketid + '" id="' + data.activeUlist[i].userid + '"  class=" btn btn-info btn-sm" type="button"> Challenge </button> </p>';
            element.appendChild(frag);

            console.log("new user on");
        }
        else {
            console.log("new user other side");
        }
        //  document.getElementById("onlineuser").contentWindow.location.reload(true);
    }
    document.getElementById("onlineuser").innerHTML = document.getElementById("onlineuser").innerHTML ;
});

//show live user
socket.on('userLogout', function(data){
    console.log(" called on disconnect");
    var ele=document.getElementById("onlineuser");
    while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
    }
    // ele.innerHTML="";
    //  $('#onlineuser').empty();
    for(i in data.activeUlist) {
        console.log("User id " + data.activeUlist[i]._id);
        console.log(JSON.stringify(data.activeUlist, undefined, 4));
        if (data.activeUlist[i].username !== thisUser) {
            var element = document.getElementById('onlineuser');
            // element.innerHTML+='<div></div><span class="input-group-addon small" style="width: inherit" id="basic-addon1">'+data.activeUlist[i].username+'</span><span class="input-group-btn "><button socketid="'+data.activeUlist[i].socketid+'"class="btn btn-primary"  id="'+data.activeUlist[i].userid+'">Send</button></span></div>';
            let frag = document.createDocumentFragment();

            // let div = frag.appendChild(document.createElement('tr'));
            let row = frag.appendChild(document.createElement('tr'));
            row.className = "info";
            let col1 = row.appendChild(document.createElement('td'));
            let col2 = row.appendChild(document.createElement('td'));
            col1.innerHTML = data.activeUlist[i].username;
            col2.innerHTML = '<p align="right"> <button socketid="' + data.activeUlist[i].socketid + '" id="' + data.activeUlist[i].userid + '"  class=" btn btn-info btn-sm" type="button"> Challenge </button> </p>';
            element.appendChild(frag);
            console.log("new user on");
        }
        else {
            console.log("new user other side");
        }
        //document.getElementById("onlineuser").contentWindow.location.reload(true);
    }
    document.getElementById("onlineuser").innerHTML = document.getElementById("onlineuser").innerHTML ;

});
function  inviteSend(userId) {
    if( (userId.innerText).trim()==="Challenge"){
        userId.innerText="invitaion sent";
        userId.disabled=true;
        socket.emit('inviteSend', {
            id: userId.id,
            myToken:myToken,
            myUser:thisUser
        });
    }
    else
    {
        console.log("playing")
    }
}
$( document ).ready(function() {
    socket.on("inviteReceive",function(data){
        var element = document.getElementById('invitationModal_question');
        element.innerText='Do you wants to play with  '+data.requestFromUser+' ?';
        $('#invitationModal').modal('show');
        var invitaionModalConfirm = function(callback){

            $("#invitaion-btn-yes").on("click", function(){
                callback(true);
                $("#invitationModal").modal('hide');
            });
            $("#invitaion-btn-no").on("click", function(){
                callback(false);
                $("#invitationModal").modal('hide');
            });
        };
        invitaionModalConfirm(function(confirm){
            if(confirm){
                if(data.username===thisUser)
                {
                    document.getElementById(data.requestFromId).innerText="Already Playing";
                    document.getElementById(data.requestFromId).disabled=true;
                }
                socket.emit('inviteAccepted', {
                    acceptedToId:data.requestFromId,
                    acceptedById:data.userid,
                    acceptedByName:thisUser
                });
            }else{
                document.getElementById(data.requestFromId).innerText=="Challenge";
                document.getElementById(data.requestFromId).disabled=false;
                socket.emit('inviteRejected', {
                    rejectedToId:data.requestFromId,
                    rejectedById:data.userid,
                    rejectedByName:thisUser
                });
            }
        });

    });
    /////////////////////////////////////
    socket.on("inviteAccepted",function(data){
        var element = document.getElementById('invitationAcceptedModal_Info');
        element.innerText='Invite accepted by '+data.acceptedByName;
        $('#invitationAcceptedModal').modal('show');
        var invitationAcceptedModalConfirm = function(callback){

            $("#invitaionAccepted-btn-yes").on("click", function(){
                callback(true);
                $("#invitationAcceptedModal").modal('hide');
            });
        };
        invitationAcceptedModalConfirm(function(confirm){
            if(confirm){
                if(data.username===thisUser)
                {
                    document.getElementById(data.acceptedById).innerText="Already Playing";
                    document.getElementById(data.acceptedById).disabled=true;
                }
                socket.emit('playgame', {
                    acceptedToId:data.userid,
                    acceptedById:data.acceptedById

                });

            }
        });

    });
    /////////////////////////////////////////////////
    socket.on("inviteRejected",function(data){
        var element = document.getElementById('invitationRejectedModal_Info');
        element.innerText='Invite rejected by '+data.rejectedByName;
        $('#invitationRejectedModal').modal('show');
        var invitationRejectedModalConfirm = function(callback){

            $("#invitaionRejected-btn-yes").on("click", function(){
                callback(true);
                $("#invitationRejectedModal").modal('hide');
            });
        };
        invitationRejectedModalConfirm(function(confirm){
            if(confirm){
                if(data.username===thisUser)
                {
                    document.getElementById(data.rejectedById).innerText="Challenge";
                    document.getElementById(data.rejectedById).disabled=false;
                }
                /*socket.emit('playgame', {
                    msg:"start to playgame",

                });*/
            }
        });

    });
    //  thisUser=$("#user").val();

    ///invite
    $( "#inviteuser" ).click(function() {
        var inviteusername=$("#inviteusername").val().replace(/\s/g, '');
        console.log("Client JS: "+inviteusername)
        socket.emit('invitegame', {
            myToken: $("#token").val(),
            otherToken:$("#inviteuser").val()
        });
        /*socket.on('playgame', function(){
         $("#box-invasion-chat-div").fadeIn();
         });*/
    });
    ////////////////////////////////////////////////
});




