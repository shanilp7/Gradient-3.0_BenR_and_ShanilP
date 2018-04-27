
#define RED_LED 11
#define BLUE_LED 10
#define GREEN_LED 5



int incomingByte;

void setup() {
 Serial.begin(9600);    // initialize serial communications
 Serial.setTimeout(10); // set the timeout for parseInt
 
  pinMode(RED_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);

// digitalWrite(RED_LED, 255);
//
//digitalWrite(BLUE_LED, 255);
 digitalWrite(RED_LED, 255);
  digitalWrite(GREEN_LED, 255);
   digitalWrite(BLUE_LED, 0);

}
 
void loop() {


 
// if (Serial.available() > 0) {// if there's serial data available
// int inByte = Serial.parseInt(); // read it
//   if (inByte == 1) {
//    Serial.write(inByte); // send it back out as raw binary data
//      digitalWrite(RED_LED, 255);
//      digitalWrite(GREEN_LED, 0);
//      digitalWrite(BLUE_LED, 0);
//      
//   } else if (inByte == 2) {
//    Serial.write(inByte); // send it back out as raw binary data 
//      digitalWrite(BLUE_LED, 255); 
//        digitalWrite(GREEN_LED, 0);
//      digitalWrite(RED_LED, 0);
//    
//   }
//    else if (inByte == 3) {
//    Serial.write(inByte); // send it back out as raw binary data
//      digitalWrite(GREEN_LED, 255);
//        digitalWrite(RED_LED, 0);
//      digitalWrite(BLUE_LED, 0);
//    
//    }
//   }
 }

