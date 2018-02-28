
#define LED1 4
#define LED2 5
#define LED3 6
#define LED4 7
#define LED5 8
#define LED6 9
#define LED7 10
#define LED8 11
#define LED9 12
#define LED10 13

void setup() {
  Serial.begin(57600);
  setPinMode();
}

char command;
bool mulai = false;
int stopValue = 1000, inc = 4;
void loop(){
  if (Serial.available() >= 0) {
    command = (char) Serial.read();

    if(command == '1') {
      mulai = true;
    } 

    if(command == '2'){
      stopValue = 100;
    }

    if(command == '3') {
      stopValue = 400;
    }

    if(command == '4') {
      stopValue = 800;
    }

  }

  if (mulai){
    //int inc = 4;
    //while (inc <= 13){
      Serial.println(inc);
      startRunningLED(stopValue,inc);
      inc++;
    //}
  }

  if (inc > 13)
    inc = 4;
}

void setPinMode(){
  for (int i = 4; i <= 13; i++)
  {
    /* code */
    pinMode(i,OUTPUT);
  }
}

void startRunningLED(int stop, int pinLED){
  digitalWrite(pinLED, HIGH);
  delay(stop);
  digitalWrite(pinLED,LOW);
  delay(stop);
}

