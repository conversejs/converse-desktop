const angApp = (await import('../init.js')).default;

angApp.factory('SystemService', () => {
    let systemService = {}

    systemService.playAudio = () => {
        var audio = new Audio(__dirname + '/../../resources/sounds/graceful.ogg')
        audio.play()
    }

    systemService.showEnvelope = () => {
        api.trayService.showEnvelope()
    }

    systemService.hideEnvelope = () => {
        api.trayService.hideEnvelope()
    }

    systemService.reloadWindow = () => {
        api.reload()
    }

    return systemService

})