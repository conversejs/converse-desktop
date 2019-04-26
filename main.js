// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let tray = null;

function initApp() {
  let iconPath = __dirname + '/images/icon.png'
  tray = new Tray(iconPath)
  tray.setToolTip('Chimeverse')
  createWindow();
  tray.on('click', function() {
    hideEnvelope();
    if (mainWindow === null) {
      createWindow();
    }
    mainWindow.show();
  });
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initApp)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin')
  // ^^^^ NOPE ;)
  // Quit ANYWAY
  app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Allow to play audio automatically
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

/**
 * Export functions
 */
function showEnvelope() {
  tray.setImage(__dirname + '/images/envelope.png')
}

function hideEnvelope() {
  tray.setImage(__dirname + '/images/icon.png')
}

exports.showEnvelope = showEnvelope;
exports.hideEnvelope = hideEnvelope;