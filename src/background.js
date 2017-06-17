/*jshint esversion: 6 */
const electron = require("electron");
const {app, BrowserWindow, dialog} = electron;

app.on('ready', function() {
	var win = new BrowserWindow();
	win.maximize();
	win.loadURL('file://' + __dirname + '/app.html');
	//win.openDevTools();
});

app.on('window-all-closed', function() {
	app.quit();
});
