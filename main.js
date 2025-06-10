// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Require other app modules
const trayService = require(__dirname + '/modules/tray-service')
const menuService = require(__dirname + '/modules/menu-service')
const settingsService = require(__dirname + '/modules/settings-service')
const credentials = require(__dirname + '/modules/credentials-service')

const isMac = process.platform === 'darwin'
const isWin = process.platform === 'win32'

function initApp () {
    if (!app.requestSingleInstanceLock()) {
        app.quit();
    }

    createWindow()
    // Set Windows platform notifications
    if (isWin) {
        app.setAppUserModelId("com.denry.converseDesktop")
    }
}

function createWindow () {
    function getSavedWindowBounds () {
        const winBounds = settingsService.get('winBounds');
        winBounds.width = Math.max(winBounds.width, 200);
        winBounds.height = Math.max(winBounds.height, 200);
        return winBounds;
    }

    // Main window options
    const mainWindowOptions = {
        zoomToPageWidth: true,
        show: false,
        autoHideMenuBar: settingsService.get('hideMenubar') || false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'resources', 'images', 'logo-48x48.png'),
        ...getSavedWindowBounds(),
    }

    // Create the browser window.
    mainWindow = new BrowserWindow(mainWindowOptions)

    // Init tray
    trayService.initTray(mainWindow)

    // Init menu
    menuService.createMenu(mainWindow)

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Before close
    mainWindow.on('close', (e) => {
        settingsService.set('isMaximized', mainWindow.isMaximized());
        if (mainWindow.isFullScreen()) {
            mainWindow.setFullScreen(false);
        }
        if (!app.isQuitting && settingsService.get('minimizeOnClose')) {
            e.preventDefault()
            mainWindow.hide()
        }
        return false;
    })

    mainWindow.on('resized', () => {
        settingsService.set('winBounds', mainWindow.getBounds());
    })
    mainWindow.on('moved', () => {
        settingsService.set('winBounds', mainWindow.getBounds());
    })


    // Handle shutdown event on Mac with minimizeOnClose
    // to prevent shutdown interrupt
    if (isMac) {
        const { powerMonitor } = require('electron')
        powerMonitor.on('shutdown', () => {
            app.isQuitting = true
            app.quit()
        })
    }

    // Handle restart
    ipcMain.on('app-quit', () => {
        app.isQuitting = true
        app.quit();
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    // Open links on system default browser
    mainWindow.webContents.setWindowOpenHandler(function (details) {
        shell.openExternal(details.url).catch((reason) => {
            console.log(reason);
        });
        return { action: 'deny' };
    })

    settingsService.webContents = mainWindow.webContents;
    ipcMain.handle('settings', (e, method, ...args) => {
        return settingsService[method].apply(settingsService, args);
    });

    ipcMain.handle('trayService', (e, method, ...args) => {
        return trayService[method].apply(trayService, args);
    });

    ipcMain.handle('credentials', (e, method, ...args) => {
        return credentials[method].apply(credentials, args);
    });

    mainWindow.on('ready-to-show', () => {
        if (settingsService.get('isMaximized')) {
            mainWindow.maximize();
        } else {
            mainWindow.show();
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html').catch((reason) => {
        console.log(reason);
        app.isQuitting = true;
        app.quit();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initApp)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS, it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin')
    // ^^^^ NOPE ;)
    // Quit ANYWAY
    app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    } else {
        mainWindow.show();
    }
})

app.on('second-instance', function () {
    mainWindow.show();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Allow audio to play automatically
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')
