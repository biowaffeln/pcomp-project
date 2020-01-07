#include <LedControl.h>
#include <WString.h>

LedControl lc =
	LedControl(12, 10, 11, 2); // Pins: DIN,CLK,CS, # of Display connected

byte closed[] = {
	B00000000, B00000000, B00000000, B00000000,
	B00000000, B00000000, B00000000, B00000000,
};

byte look_straight_1[] = {
	B00111100, B01111110, B11111111, B11100111,
	B11100111, B11111111, B01111110, B00111100,
};

byte look_straight_2[] = {
	B00000000, B01111110, B11111111, B11100111,
	B11100111, B11111111, B01111110, B00000000,
};
byte look_straight_3[] = {
	B00000000, B00000000, B01111110, B11100111,
	B11100111, B01111110, B00000000, B00000000,
};

byte look_straight_4[] = {
	B00000000, B00000000, B00000000, B11100111,
	B11100111, B00000000, B00000000, B00000000,
};

void setEye(int display, byte arr[]) {
	for (int i = 0; i < 8; i++) {
		lc.setRow(display, i, arr[i]);
	}
}

void setEyes(byte arr[]) {
	setEye(0, arr);
	setEye(1, arr);
}

void blink() {
	setEyes(look_straight_1);
	delay(20);
	setEyes(look_straight_2);
	delay(20);
	setEyes(look_straight_3);
	delay(20);
	setEyes(look_straight_4);
	delay(20);
	setEyes(closed);
	delay(20);
	setEyes(look_straight_4);
	delay(20);
	setEyes(look_straight_3);
	delay(20);
	setEyes(look_straight_2);
	delay(20);
	setEyes(look_straight_1);
}

void squint() {
	setEyes(look_straight_1);
	delay(50);
	setEyes(look_straight_2);
	delay(50);
	setEyes(look_straight_3);
}

void unsquint() {
	setEyes(look_straight_3);
	delay(50);
	setEyes(look_straight_2);
	delay(50);
	setEyes(look_straight_1);
}

void setup() {
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

	setEyes(look_straight_1);
}

void loop() {
	char message[32] = "";
	byte i = 0;

	while (Serial.available()) {
		char character = Serial.read();
		if (character == ';') {
			parseCommands(message);
			memset(message, 0, 32);
			i = 0;
		} else {
			message[i] = character;
			i++;
		}
	}
}

void parseCommands(char msg[]) {
	char *charPointer;
	char cmdName[3];

	charPointer = strtok(msg, " ");
	strcpy(cmdName, charPointer);

	if (strcmp(cmdName, "led") == 0) {
		charPointer = strtok(NULL, " ");

		if (strcmp(charPointer, "blink") == 0) {
			blink();
		}
		if (strcmp(charPointer, "squint") == 0) {
			squint();
		}
		if (strcmp(charPointer, "unsquint") == 0) {
			unsquint();
		}

	} else if (strcmp(cmdName, "srv") == 0) {
		charPointer = strtok(NULL, " ");
	} else {
		Serial.print("unknown command ");
		Serial.println(cmdName);
	}
}
