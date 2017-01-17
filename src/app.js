/* jshint esversion: 6 */
// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from './env';

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());
var Webcam = require('./vendor/webcam.min');
var convertURI = require('image-data-uri');

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').contributors[0]);

document.addEventListener('DOMContentLoaded', function() {
	Webcam.set({
		"image_format":"png",
		"flip_horiz": true
	});
	Webcam.attach('#webcam');
});

$('#snapButton').click(function(){
	Webcam.snap( function(data_uri) {
	// Some image data uri
	let dataURI = data_uri;

	// It will create the full path in case it doesn't exist
	// If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
	let filePath = './out/test.png';
	// Returns a Promise
	convertURI.outputFile(dataURI, filePath)
	// RETURNS image path of the created file 'out/path/fileName.png'
	.then(res => console.log(res));
		});
});

$(document).ready(function(){
	console.log('hi');

});
