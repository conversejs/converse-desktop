let angApp = require(__dirname + '/../init')

angApp.factory('SystemService', () => {

    const remote = require('electron').remote

    let systemService = {}

    systemService.playAudio = () => {
        var audio = new Audio(__dirname + '/../../resources/sounds/graceful.ogg')
        audio.play()
    }

    systemService.showEnvelope = () => {
        remote.require('./main').trayService.showEnvelope()
    }

    systemService.hideEnvelope = () => {
        remote.require('./main').trayService.hideEnvelope()
    }

    systemService.reloadWindow = () => {
        remote.getCurrentWindow().reload()
    }

    return systemService

})