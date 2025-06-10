const { ipcRenderer, contextBridge } = require('electron');
const changedHandlers = [];
ipcRenderer.on('settings', function (e, method, setting, newValue) {
    if (method === 'changed') {
        for (let handler of changedHandlers) {
            handler.call(null, setting, newValue);
        }
    }
});

contextBridge.exposeInMainWorld('api', {
    settings: {
        has (setting) {
            return ipcRenderer.invoke('settings', 'has', setting);
        },
        set (setting, value) {
            return ipcRenderer.invoke('settings', 'set', setting, value);
        },
        unset (setting) {
            return ipcRenderer.invoke('settings', 'unset', setting);
        },
        get (setting) {
            return ipcRenderer.invoke('settings', 'get', setting);
        },
        changed (cb) {
            changedHandlers.push(cb);
        }
    },
    trayService: {
        showEnvelope () {
            return ipcRenderer.invoke('trayService', 'showEnvelope');
        },
        hideEnvelope () {
            return ipcRenderer.invoke('trayService', 'hideEnvelope');
        }
    },
    credentials: {
        get () {
            return ipcRenderer.invoke('credentials', 'getCredentials');
        },
        save (service, login, password) {
            return ipcRenderer.invoke('credentials', 'saveCredentials', service, login, password);
        },
        clear () {
            return ipcRenderer.invoke('credentials', 'clearCredentials');
        }
    },
    app: {
        quit () {
            ipcRenderer.send('app-quit');
        }
    }
});
