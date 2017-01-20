// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.
/* jshint esversion: 6 */

import path from 'path';
import url from 'url';
import { app, Menu } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { editMenuTemplate } from './menu/edit_menu_template';
import createWindow from './helpers/window';

var mainWindow;
// Dev variable
var dev = true;

var setApplicationMenu = function() {
	var menus = [editMenuTemplate];
	if (dev === true) {
		menus.push(devMenuTemplate);
	}
	Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
var userDataPath = app.getPath('userData');
if (dev === true) {
	app.setPath('userData', userDataPath + ' (dev)');
} else {
	app.setPath('userData', userDataPath + ' (prod)');
}

app.on('ready', function() {
	setApplicationMenu();

	var mainWindow = createWindow('main', {
		width: 1000,
		height: 600
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app.html'),
		protocol: 'file:',
		slashes: true
	}));

	if (dev === true) {
		mainWindow.openDevTools();
	}
});

app.on('window-all-closed', function() {
	app.quit();
});
