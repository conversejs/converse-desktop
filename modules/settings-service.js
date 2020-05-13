/**
 * Module for getting settigns in Main process.
 */

const electronSettings = require('electron-settings')

let settingsService = {}

settingsService.get = (itemKey) => {
    settingValue = electronSettings.get(itemKey)
    if (typeof settingValue === 'undefined' || settingValue === null) {
        return false
    }
    return settingValue
}

settingsService.set = (itemKey, settingValue) => {
    electronSettings.set(itemKey, settingValue)
}

module.exports = settingsService