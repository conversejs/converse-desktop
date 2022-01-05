const {ipcRenderer, contextBridge} = require('electron');
const keytar = require('keytar');

contextBridge.exposeInMainWorld('api', {
    send(channel, ...data) {
        return ipcRenderer.send(channel, ...data);
    },

    receive(channel, cb) {
        ipcRenderer.on(channel, (event, ...args) => cb(...args));
    },

    reload() {
        ipcRenderer.send('reload')
    },

    electronSettings: {
        hasSync(setting) {
            return ipcRenderer.sendSync('electron-settings', 'hasSync', setting)
        },
        setSync(setting, value) {
            ipcRenderer.send('electron-settings', 'setSync', setting, value)
        },
        unsetSync(setting) {
            ipcRenderer.send('electron-settings', 'unsetSync', setting)
        },
        getSync(setting) {
            return ipcRenderer.sendSync('electron-settings', 'getSync', setting);
        }
    },
    trayService: {
        showEnvelope() {
            ipcRenderer.send('tray-service', 'showEnvelope')
        },
        hideEnvelope() {
            ipcRenderer.send('tray-service', 'hideEnvelope')
        }
    },
    keytar: keytar
});
