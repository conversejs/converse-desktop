// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, shell } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Require other app modules
const trayService     = require(__dirname+'/modules/tray-service')
const menuService     = require(__dirname+'/modules/menu-service')
const settingsService = require(__dirname+'/modules/settings-service')

const isMac = process.platform === 'darwin'
const isWin = process.platform === 'win32'

function initApp() {
    createWindow()
    // Set Windows platform notifications
    if (isWin) {
        app.setAppUserModelId("com.denry.converseDesktop")
    }
}

function createWindow () {
    // Main window options
    let mainWindowOptions = {
        width: 800,
        height: 600,
        minWidth: 780,
        minHeight: 560,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    }

    // Load app settings
    let runMinimized = settingsService.get('runMinimized')
    if (runMinimized) {
        mainWindowOptions.show = !runMinimized
    }
    let preserveWindowSize = settingsService.get('preserveWindowSize')
    if (preserveWindowSize) {
        let width = settingsService.get('windowWidth')
        let height = settingsService.get('windowHeight')
        if (width) mainWindowOptions.width = width
        if (height) mainWindowOptions.height = height
    }

    let preserveWindowPosition = settingsService.get('preserveWindowPosition')
    if (preserveWindowPosition) {
        let windowX = settingsService.get('windowX')
        let windowY = settingsService.get('windowY')
        if (windowX) mainWindowOptions.x = windowX
        if (windowY) mainWindowOptions.y = windowY
    }

    // Create the browser window.
    mainWindow = new BrowserWindow(mainWindowOptions)

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Init tray
    trayService.initTray(mainWindow)

    // Init menu
    menuService.createMenu()

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Before close
    let minimizeOnClose = settingsService.get('minimizeOnClose')
    if (minimizeOnClose) {
        mainWindow.on('close', (e) => {
            if (!app.isQuitting) {
                e.preventDefault()
                mainWindow.hide()
            }
        })
    }

    // Save window size
    if (preserveWindowSize) {
        mainWindow.on('resize', (e) => {
            let newSize = mainWindow.getSize()
            let width = newSize[0]
            let height = newSize[1]
            settingsService.set('windowWidth', width)
            settingsService.set('windowHeight', height)
        })
    }

    // Save window position
    if (preserveWindowPosition !== 'undefined') {
        mainWindow.on('move', (e) => {
            let newPosition = mainWindow.getPosition()
            let windowX = newPosition[0]
            let windowY = newPosition[1]
            settingsService.set('windowX', windowX)
            settingsService.set('windowY', windowY)
        })
    }

    // Handle shutdown event on Mac with minimizeOnClose
    // to prevent shutdown interrupt
    if (isMac && minimizeOnClose) {
        const { powerMonitor } = require('electron')
        powerMonitor.on('shutdown', () => {
            app.isQuitting = true
            app.quit()
        })
    }

    // Handle restart
    ipcMain.on('app-restart', (evt, arg) => {
        app.isQuitting = true
        app.relaunch()
        app.exit()
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    // Open links on system default browser
    mainWindow.webContents.on('new-window', function(e, url) {
        e.preventDefault()
        shell.openExternal(url)
    })
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
    if (mainWindow === null){
        createWindow()
    } else {
        mainWindow.show();
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Allow to play audio automatically
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')

/**
 * Export functions
 */

exports.trayService = trayService
