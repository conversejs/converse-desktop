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

    getApplicationVersion() {
        return ipcRenderer.invoke('getApplicationVersion');
    },

    getElectronVersion() {
        return ipcRenderer.invoke('getElectronVersion');
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
            ipcRenderer.invoke('trayService.showEnvelope')
        },
        hideEnvelope() {
            ipcRenderer.invoke('trayService.hideEnvelope')
        }
    },
    keytar: {
        getPassword(service, login) {
            return keytar.getPassword(service, login);
        },
        setPassword(service, login, password) {
            return keytar.setPassword(service, login, password);
        },
        deletePassword(service, login) {
            return keytar.deletePassword(service, login);
        }
    }
});
