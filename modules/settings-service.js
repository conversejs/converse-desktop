/**
 * Module for getting settings in Main process.
 */

const electronSettings = require('electron-settings')

let settingsService = {}

settingsService.get = (itemKey, fallback = null) => {
    const settingValue = electronSettings.getSync(itemKey)
    if (typeof settingValue === 'undefined' || settingValue === null) {
        return fallback;
    }
    return settingValue
}

settingsService.set = (itemKey, settingValue) => {
    electronSettings.setSync(itemKey, settingValue);
    if (settingsService.webContents) {
        settingsService.webContents.send('settings', 'changed', itemKey, settingValue);
    }
}

settingsService.has = (itemKey) => electronSettings.hasSync(itemKey);

settingsService.unset = (itemKey) => electronSettings.unsetSync(itemKey);

settingsService.webContents = null;

module.exports = settingsService
