/* jshint esversion: 6 */
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());
const Webcam = require('./vendor/webcam.min');
const convertURI = require('image-data-uri');

// When the document loads, attach the webcam with the appropriate settings
$(document).ready(function() {
	Webcam.set({
		"image_format":"png",
		"flip_horiz": true
	});
	Webcam.attach('#webcam');
});

// When you click on the snap button, take a picture and save it to /out/test.png
$('#snapButton').click(function(){
	Webcam.snap( function(data_uri) {
		let dataURI = data_uri;
		// It will create the full path in case it doesn't exist
		let filePath = './out/test.png';
		// Returns a Promise
		convertURI.outputFile(dataURI, filePath)
		// RETURNS image path of the created file 'out/path/fileName.png'
		.then(res => console.log(res));
	});
});

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The version of this app is:', appDir.read('package.json', 'json').version);
