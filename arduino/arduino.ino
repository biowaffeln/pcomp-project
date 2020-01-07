#include <LedControl.h>
#include <WString.h>

LedControl lc =
    LedControl(12, 10, 11, 2); // Pins: DIN,CLK,CS, # of Display connected

byte blank[] = {
    B00000000,
    B00000000,
    B00000000,
    B00000000,
    B00000000,
    B00000000,
    B00000000,
    B00000000,
};

byte eye1[] = {
    B00111100,
    B01111110,
    B11111111,
    B11100111,
    B11100111,
    B11111111,
    B01111110,
    B00111100,
};

void setEye(int display, byte arr[])
{
  for (int i = 0; i < 8; i++)
  {
    lc.setRow(display, i, arr[i]);
  }
}

void setEyes(byte arr[])
{
  setEye(0, arr);
  setEye(1, arr);
}

void setup()
{
  Serial.begin(9600);

  // wake up displays
  lc.shutdown(0, false);
  lc.shutdown(1, false);
  // Set intensity levels
  lc.setIntensity(0, 5);
  lc.setIntensity(1, 5);
  // Clear Displays
  lc.clearDisplay(0);
  lc.clearDisplay(1);
}

void loop()
{
  char content[32] = "";
  byte i = 0;

  while (Serial.available())
  {
    char character = Serial.read();
    if (character == ';')
    {
      parseCommand(content);
      memset(content, 0, 32);
      i = 0;
    }
    else
    {
      content[i] = character;
      i++;
    }
  }
}

void parseCommand(char cmd[])
{
  char *charPointer;
  char cmdName[3];

  charPointer = strtok(cmd, " ");
  strcpy(cmdName, charPointer);

  if (strcmp(cmdName, "led") == 0)
  {
    Serial.println("received LED command");
    charPointer = strtok(NULL, " ");
  }
  else if (strcmp(cmdName, "srv") == 0)
  {
    Serial.println("received SERVO command");
    charPointer = strtok(NULL, " ");
  }
  else
  {
    Serial.print("unknown command ");
    Serial.println(cmdName);
  }
}