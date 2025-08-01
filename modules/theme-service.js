const settingsService = require('./settings-service');

const themeService = {
    getDarkTheme () {
        const theme = this.getThemeSetting();
        return theme === 'default' ? 'dracula' : theme;
    },

    getTheme () {
        const theme = this.getThemeSetting();
        return theme === 'default' ? 'classic' : theme;
    },

    getThemeSetting () {
        return settingsService.get('theme') || 'default';
    },

    setTheme (theme) {
        settingsService.set('theme', theme);
    }
}

module.exports = themeService;
