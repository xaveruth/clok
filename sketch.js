//TODO
//1. add notes beside clock numbers depending on key signature
//2. light up numbers in addition to circle
//3. fade in highlight?


function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);
	textAlign(CENTER);
	textFont(clockFont);
}

function draw() {
	clear();
	
	var m = millis();
	var numBeats = m * bpm * (1/60);

	var periodBars = 12 / interval * dur;
	var periodMS = periodBars * 4 / bpm * 60000;
	var k = 360 / periodMS;

	var circleX = windowWidth/2;
	var circleY = windowHeight/2;
	var circleRad = windowHeight/4;


	//show grid for checking
	if (grid == true) drawGrid();

	drawCircle(circleX, circleY, circleRad);
	drawNumbers(circleX, circleY, circleRad);

	//start animating after a delay because otherwise it cuts off the first bit
	if (m > delayedStart) {
		animateMinuteHand(circleX, circleY, circleRad, m - delayedStart, k);
		highlightNumbers(circleX, circleY, circleRad, m - delayedStart, k); //TODO
	}
}

function highlightNumbers(circleX, circleY, circleRad, m, k) {
	var currNote = getCurrNote();
	var angle = -k * m + phaseShift;
	var phaseShift = getPhaseShift();

	//highlight current circle
	for (var i = 0; i < angleTable[0].length; i++) {
		if (currNote == angleTable[0][i]) {
			currAngle = angleTable[1][i];
			
			setAesthetics('highlight');
			ellipse(circleX + circleRad * cos(currAngle), circleY - circleRad * sin(currAngle), 70);
		}
	}
}

function getCurrNote() {
	var m = millis();
	var numBeats = (m - delayedStart) * bpm * (1/60000) - dur;
	var numNotes = round(numBeats / dur / 4);
	var currNote = (startingNumber + numNotes * interval) % 12;
	if (currNote == 0) currNote = 12;
	return currNote;
}

function getPhaseShift() {
	for (var i = 0; i < angleTable[0].length; i++) {
		if (angleTable[0][i] == startingNumber) return angleTable[1][i];
	}	
}

function animateMinuteHand(circleX, circleY, circleRad, m, k) {
	var phaseShift = getPhaseShift();
	var angle = -k * m + phaseShift;

	setAesthetics('minute hand');
	line(circleX, circleY, circleX + (circleRad + radAdjust/2) * cos(angle), circleY - (circleRad + radAdjust/2) * sin(angle));
}

function drawCircle(circleX, circleY, circleRad) {
	setAesthetics('circle');
	ellipse(circleX, circleY, 2 * circleRad + radAdjust);
}

function drawNumbers(circleX, circleY, circleRad) {
	var currNote = getCurrNote();
	var keyIndex = getDo();
	print(keyIndex);

	for (var i = 0; i < angleTable[0].length; i++) {
		
		//draw numbers
		var x = circleX + circleRad * cos(angleTable[1][i]);
		var y = circleY - circleRad * sin(angleTable[1][i]) + yAdjust;

		setAesthetics('numbers');
		if (angleTable[0][i] == currNote) fill(255, 0, 0, 255);
		else fill(0);
		text(angleTable[0][i], x, y);


		//draw notes
		var x = circleX + 0.8 * circleRad * cos(angleTable[1][i]);
		var y = circleY - 0.8 * circleRad * sin(angleTable[1][i]) + yAdjust;
		var k = (12 + keyIndex - i) % 12;

		setAesthetics('notes');
		text(notesTable[k], x, y);
	}
}

function getDo() {
	var key = 'G';
	for (var i = 0; i < notesTable.length; i++) {
		if (notesTable[i] == key) return i;
	}
}

//set parameters like fill, stroke, etc. depending on what's being drawn
function setAesthetics(item) {
	if (item == 'highlight') {
		fill(255, 255, 0, 100);
		noStroke();
	}

	else if (item == 'minute hand') {
		stroke(minuteHandStroke);
		fill(minuteHandFill);
		strokeWeight(minuteHandStrokeWeight);
	}

	else if (item == 'circle') {
		stroke(clockStroke);
		strokeWeight(circleWidth);
		fill(0, 0, 255, 70); //how to bring this in from parameters?	
	}

	else if(item == 'numbers') {
		textSize(clockFontSize);
		noStroke();
	}

	else if (item == 'notes') {
		textSize(noteFontSize);
	}
}

function drawGrid() {
	textSize(gridFontSize);
	strokeWeight(gridStrokeWeight);
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var x = floor(windowWidth/10 * i);
			var y = floor(windowHeight/10 * j);
			text(str(x) + ","+ str(y), x, y);
		}
	}
}