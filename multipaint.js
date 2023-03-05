var myPath;
var partnerPath;
var websocket = new WebSocket("ws://localhost:8003");
// var myMessage;
// var partnerMessage;

websocket.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    if (msg.type == 'mousedown') {
        console.log("mouse down message");

        partnerPath = new Path({
            strokeColor: 'cyan'
        });
        partnerPath.strokeColor = 'cyan';
    }
    
    else if (msg.type == 'mouseup') {
        console.log("mouse up message");

        var partnerCircle = new Path.Circle(new Point(msg.x, msg.y), msg.radius);
        partnerCircle.strokeColor = 'cyan';
    }

    else if (msg.type == 'mousedrag') {
        console.log("mouse drag message");

        partnerPath.add(new Point(msg.x, msg.y));
    }

    else if (msg.type == 'sendmessage' & msg.status == "sent") {
        console.log("user message");

        var partnerMessage = document.createElement('p');
        partnerMessage.style.color = 'cyan';
        var messageList = document.getElementById("message-list");
        messageList.prepend(partnerMessage);
        partnerMessage.textContent = msg.text;
        // msg.status = "received";
        // var partnerMessage = "\n" + msg.text + "\n";
        // partnerMessage.style.color = 'cyan';

        // var messageList = document.getElementById("message-list");
        // messageList.prepend(partnerMessage);


    }
}

function onMouseDown() {
    console.log("mouse down");

    myPath = new Path({
        strokeColor: 'red'
    });
    myPath.strokeColor = 'red';

    var msg = {
        type: 'mousedown',
        strokeColor: 'cyan'
    }
    
    websocket.send(JSON.stringify(msg));
}

function onMouseUp(event) {
    console.log("mouseup event");

    var myCircle = new Path.Circle({
        strokeColor: 'red',
        center: event.point,
        radius: 10
    });
    myCircle.strokeColor = 'red';
    myCircle.fillColor = 'white';

    var msg = {
        type: 'mouseup',
        x: event.point.x,
        y: event.point.y,
        point: event.point,
        radius: 10
    }

    websocket.send(JSON.stringify(msg));
}

function onMouseDrag(event) {
    console.log("drag event");

    myPath.add(event.point);

    var msg = {
        type: 'mousedrag',
        x: event.point.x,
        y: event.point.y,
        point: event.point,
    }

    websocket.send(JSON.stringify(msg));
}

function sendMessage() {
    console.log("sending message");
    var myMessage= document.getElementById("message-1").value;
    var mess = document.createElement('p');
    mess.style.color = 'red';
    mess.textContent = myMessage;
    var messageList = document.getElementById("message-list");
    messageList.prepend(mess);

    var msg = {
        type: 'sendmessage',
        text: myMessage,
        status: "sent",
    }

    document.getElementById("message-1").value = "";

    websocket.send(JSON.stringify(msg));
}