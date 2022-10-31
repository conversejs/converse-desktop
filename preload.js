const { ipcRenderer, contextBridge } = require('electron');
const changedHandlers = [];
ipcRenderer.on('settings', function (e, method, setting, newValue) {
    if (method === 'changed'){
        for (let handler of changedHandlers){
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
    keytar: {
        getPassword (service, login) {
            return ipcRenderer.invoke('keytar', 'getPassword', service, login);
        },
        setPassword (service, login, password) {
            return ipcRenderer.invoke('keytar', 'setPassword', service, login, password);
        },
        deletePassword (service, login) {
            return ipcRenderer.invoke('keytar', 'deletePassword', service, login);
        }
    },
    app: {
        quit () {
            ipcRenderer.send('app-quit');
        }
    }
});
