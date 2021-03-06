
var mqClient;
mqClient = new Paho.Client("mqttbroker.altairsmartcore.com", Number(8884), "mqClient"+new Date().getTime());
mqClient.startTrace();
// set callback handlers
mqClient.onConnectionLost = mqClient_onConnectionLost;
mqClient.onMessageArrived = mqClient_onMessageArrived;

//var devicename = 'mqClient';
var mqClient_topic = "SmartDevice@sarvavid.sarvavid/Data";
 // connect the client
mqClient.connect({userName:'smartDevice.SmartDevice@sarvavid.sarvavid',password:'smart123',onSuccess:onConnect,useSSL: true});
console.log("attempting to connect" )

 // called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect:");
  mqClient.subscribe(mqClient_topic);
  //getData();
  
 }

 // called when the client loses its connection
function mqClient_onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

 // called when a message arrives
function mqClient_onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
   //document.write(message.payloadString); 
  var msg = JSON.parse(message.payloadString);
 if (msg["Type"] == "BIN" && msg["Lid"] == "Closed" ) {
    msgBinId = msg["Id"];
    msgLevel = msg["Level"];
    if(msg["BinFull"] == 1)
     msgLastFill = msg["time"];
 }
}

function getData() {
 const Http = new XMLHttpRequest();
 const url='https://jsonplaceholder.typicode.com/posts';
 Http.open("GET", url);
 Http.send();
 Http.onreadystatechange=(e)=>{
 console.log(Http.responseText)
}
}
