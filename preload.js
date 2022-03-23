const {ipcRenderer, contextBridge} = require('electron');
const keytar = require('keytar');

contextBridge.exposeInMainWorld('api', {
    reload() {
        ipcRenderer.send('reload')
    },

    settings: {
        has(setting) {
            return ipcRenderer.invoke('settings', 'has', setting);
        },
        set(setting, value) {
            ipcRenderer.invoke('settings', 'set', setting, value);
        },
        unset(setting) {
            ipcRenderer.invoke('settings', 'unset', setting);
        },
        get(setting) {
            return ipcRenderer.invoke('settings', 'get', setting);
        }
    },
    trayService: {
        showEnvelope() {
            ipcRenderer.invoke('trayService', 'showEnvelope');
        },
        hideEnvelope() {
            ipcRenderer.invoke('trayService', 'hideEnvelope');
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
