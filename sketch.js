/*
Serial write example
Sends a byte to a webSocket server which sends the same byte
out through a serial port.
You can use this with the included Arduino example called PhysicalPixel.
Works with P5 editor as the socket/serial server, version 0.5.5 or later.
written 2 Oct 2015
by Tom Igoe
*/

// Declare a "SerialPort" object
var serial;
var price;
var result;
var high;
var low;
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var milliseconds;
var lastCall = 0;

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var setPoint;
var res;
var highIsSet = false;
var lowIsSet = false;

function setup() {
    
    myRec.onResult = showResult;
    myRec.continuous = true;
    //myRec.interimResults = true; 
    myRec.start();
    
   
    
    //  createCanvas(windowWidth, windowHeight);
    //  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=f7a4f34551e7c1bd1f2d6c30a8917636', gotData);

    loadBtcInfo();

    // make an instance of the SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results. See gotList, below:
    serial.list();

    // Assuming our Arduino is connected,  open the connection to it
    serial.open(portName);

    // When you get a list of serial ports that are available
    serial.on('list', gotList);

    // When you some data from the serial port
    serial.on('data', gotBitcoinData);
}

// Got the list of ports
function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}




function loadBtcInfo () {
    loadJSON('https://api.coinmarketcap.com/v1/ticker/bitcoin/',gotBitcoinData); //run the collectBtcInfo function on the BTC JSON data
}


function load(){
    high = document.getElementById("high").value;
    low = document.getElementById("low").value;
    
    loadBtcInfo();
}

function gotBitcoinData(data){
    //3 - green, 2 - blue, 1 - red
    price = data[0].price_usd;
    //console.log("price : " + price);
    
    if (price > high){
        result = 3; 
    }
    else if (price < high && price > low){
        result = 2; 
    }
    else if (price < low){
        result = 1;
    }
    else{
        result = 2;
    }
    
    serial.write(result + '\n');
    
    document.getElementById("currentPrice").innerHTML = "Current price is : " + price;
}

function showResult()
{
    if(myRec.resultValue==true) {
        //background(192, 255, 192);
        //text(myRec.resultString, width/2, height/2);
        console.log(myRec.resultString);
        res = myRec.resultString;
        document.getElementById('speech').innerHTML = res;
        
        //HIGH
        if (res == 'set High'){
            setPoint = "high";
            console.log("high selected");
            document.getElementById('high').className = "highSelected";
            if (document.getElementById('low').classList.contains("lowSelected")){
                document.getElementById('low').classList.remove("lowSelected");
            }
            if (document.getElementById('upload').classList.contains("uploaded")){
              document.getElementById('upload').classList.remove("uploaded");
            }
        }
        else if (res == 'set low'){
            setPoint = "low";
            console.log("low selected");
            document.getElementById('low').className = "lowSelected";
            if (document.getElementById('high').classList.contains("highSelected")){
              document.getElementById('high').classList.remove("highSelected");
            }
            if (document.getElementById('upload').classList.contains("uploaded")){
              document.getElementById('upload').classList.remove("uploaded");
            }
            
        }
        
        if (!isNaN(parseInt(res)) && setPoint == "high"){
            high = parseInt(myRec.resultString);
            document.getElementById('high').value = high;
            //highIsSet = true;
        }
        if (!isNaN(parseInt(res)) && setPoint == "low"){
            low = parseInt(myRec.resultString);
            document.getElementById('low').value = low;
            //lowIsSet = true;
        }

        if (res == 'upload'){
            
            document.getElementById('upload').className = "uploaded";
            
            if (document.getElementById('low').classList.contains("lowSelected")){
                document.getElementById('low').classList.remove("lowSelected");
            }
            if (document.getElementById('high').classList.contains("highSelected")){
              document.getElementById('high').classList.remove("highSelected");
            }
            
        }

       
        //console.log("high is " + high);
    }
}


function draw(){
    milliseconds = millis();
    
    if (milliseconds > lastCall + 3000){
        console.log("call bitcoin api");
        loadBtcInfo();
        lastCall = milliseconds;
    }
    
}


