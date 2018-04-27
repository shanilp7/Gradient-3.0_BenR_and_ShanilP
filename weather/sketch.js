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
var p1;
var p2;
var locat;
var full;
var price;
var change, mappedChange, summaryText;
var result;

var weather;

var colorValue = 255;


var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here

// this is the message that will be sent to the Arduino:
var outMessage = 'H';

function setup() {
    //  createCanvas(windowWidth, windowHeight);
    //  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=f7a4f34551e7c1bd1f2d6c30a8917636', gotData);

    loadBtcInfo();
    weatherLoad1();
    weatherLoad2();
    weatherLoad3();
    weatherLoad4();
    weatherLoad5();
    weatherLoad6();



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
    serial.on('data', gotData);
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

//3 - high, 2 - medium, 1 - low
function gotBitcoinData(data){
    price = data[0].price_usd;
    console.log("price : " + price);
    
    if (price > 6780){
        result = 3;
    }
    else if (price > 6700 && price < 6779){
        result = 2;
    }
    else {
        result = 1;
    }
    serial.write(result + '\n');
}



function weatherLoad1() {
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Toronto&APPID=f7a4f34551e7c1bd1f2d6c30a8917636', gotData1);
}

function weatherLoad2() {
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=f7a4f34551e7c1bd1f2d6c30a8917636', gotData2);
}

function weatherLoad3() {
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Bangkok&APPID=f7a4f34551e7c1bd1f2d6c30a8917636', gotData3);
}

function weatherLoad4() {
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Cairo&APPID=f7a4f34551e7c1bd1f2d6c30a8917636', gotData4);
}

function weatherLoad5() {
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Moscow&APPID=f7a4f34551e7c1bd1f2d6c30a8917636', gotData5);
}

function weatherLoad6() {
    loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Lima&APPID=f7a4f34551e7c1bd1f2d6c30a8917636', gotData6);
}

function gotData(data) {
    // var currentString = serial.readLine();
    // console.log(currentString);
    weather = data.weather[0].main;


    // serial.write(weather);
    if (weather === 'Clouds') {
        colorValue = '255';
    } else if (weather === 'Rain') {
        colorValue = '255';
    }
    serial.write(colorValue + '\n');
}

function gotData1(data) {
    document.getElementById('Toronto').children[0].children[1].innerHTML = data.weather[0].main;
}

function gotData2(data) {
    document.getElementById('London').children[0].children[1].innerHTML = data.weather[0].main;
}

function gotData3(data) {
    document.getElementById('Bangkok').children[0].children[1].innerHTML = data.weather[0].main;
}

function gotData4(data) {
    document.getElementById('Cairo').children[0].children[1].innerHTML = data.weather[0].main;
}

function gotData5(data) {
    document.getElementById('Moscow').children[0].children[1].innerHTML = data.weather[0].main;
}

function gotData6(data) {
    document.getElementById('Lima').children[0].children[1].innerHTML = data.weather[0].main;
}


function city(c) {

    p1 = "http://api.openweathermap.org/data/2.5/weather?q=";
    locat = c;
    p2 = "&APPID=f7a4f34551e7c1bd1f2d6c30a8917636";
    full = p1.concat(locat, p2);

    loadJSON(full, gotData);
}

//function draw() {
//  background(255,255,255);
//  fill(0,0,0);
//  text("click to change the LED", 10, 10);
//}

// When you click on the screen, the server sends H or L out the serial port
