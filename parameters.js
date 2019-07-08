//VERSIONS
var grid = false; //turn grid on or off for checking coordinates

//CLOCK PARAMETERS
var clockStroke = 0;
var circleWidth = 3;
var radAdjust = 50;
var clockFill = (0, 0, 255, 70);

//HOUR MARKING PARAMETERS
var yAdjust = 10;
var clockFontSize = 40;
var clockFont = 'Georgia';
var angleTable = [[3, 2,  1,  12, 11,  10,  9,   8,   7,   6,   5,   4],
				  [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]];

//TIMING PARAMETERS
var bpm = 120;
var delayedStart = 500;

//PATTERN PARAMETERS
var dur = 1/4;
var interval = -2;
var startingNumber = 7;

//GRID PARAMATERS
var gridFontSize = 10;
var gridStrokeWeight = 1;

//MINUTE HAND PARAMETERS
var minuteHandStroke = 0;
var minuteHandFill = 0;
var minuteHandStrokeWeight = 5;

//NOTE PARAMETERS
//for some reason i have to define key signature in getDo method
var noteFontSize = 20;
var notesTable = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
//var key = 'C#';