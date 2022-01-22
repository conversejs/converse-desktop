/**
 * Module for getting settings in Main process.
 */

const electronSettings = require('electron-settings')

let settingsService = {}

settingsService.get = (itemKey) => {
    const settingValue = electronSettings.getSync(itemKey)
    if (typeof settingValue === 'undefined' || settingValue === null) {
        return false
    }
    return settingValue
}

settingsService.set = (itemKey, settingValue) => {
    electronSettings.setSync(itemKey, settingValue)
}

settingsService.has = (itemKey) => electronSettings.hasSync(itemKey);

settingsService.unset = (itemKey) => electronSettings.unsetSync(itemKey);

module.exports = settingsService
