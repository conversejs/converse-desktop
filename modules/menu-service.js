/**
 * Module for Menu functions.
 */
const { app, Menu, MenuItem } = require('electron')
const settingsService = require('./settings-service')
const { clearCredentials } = require('./credentials-service');
const themeService = require(__dirname + '/../modules/theme-service');

const menuService = {}

menuService.createMenu = (window) => {
    function reload () {
        window.show()
        window.loadFile('index.html').catch((reason) => {
            console.log(reason);
            app.isQuitting = true;
            app.quit();
        });
    }

    let converse;
    const application = new Menu();
    application.append(new MenuItem({
        label: 'Converse Desktop'
        , submenu: converse = Menu.buildFromTemplate([
            {
                label: 'Reconnect',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    reload();
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Minimize on close',
                type: 'checkbox',
                id: 'minimize-on-close',
                checked: settingsService.get('minimizeOnClose', false),
                click: () => {
                    settingsService.set('minimizeOnClose', converse.getMenuItemById('minimize-on-close').checked);
                }
            },
            {
                label: 'Hide Menubar',
                type: 'checkbox',
                id: 'hide-menubar',
                checked: settingsService.get('hideMenubar', false),
                click: () => {
                    const menuItem = converse.getMenuItemById('hide-menubar');
                    settingsService.set('hideMenubar', menuItem.checked);
                    window.setAutoHideMenuBar(menuItem.checked);
                    window.setMenuBarVisibility(!menuItem.checked);
                }
            },
            {
                label: 'Encrypt by default',
                type: 'checkbox',
                id: 'encrypt-by-default',
                checked: settingsService.get('omemo_default', false),
                click: () => {
                    const menuItem = converse.getMenuItemById('encrypt-by-default');
                    settingsService.set('omemo_default', menuItem.checked);
                }
            },
            {
                label: 'Show myself',
                type: 'checkbox',
                id: 'show-self-in-roster',
                checked: settingsService.get('show_self_in_roster', false),
                click: () => {
                    const menuItem = converse.getMenuItemById('show-self-in-roster');
                    settingsService.set('show_self_in_roster', menuItem.checked);
                }
            },
            {
                label: 'Notifications',
                submenu: Menu.buildFromTemplate([
                    {
                        label: 'Enabled',
                        type: 'checkbox',
                        id: 'show-desktop-notifications',
                        checked: settingsService.get('show_desktop_notifications', true),
                        click: () => {
                            const menuItem = converse.getMenuItemById('show-desktop-notifications');
                            settingsService.set('show_desktop_notifications', menuItem.checked);
                        }
                    },
                    {
                        label: 'Play sound',
                        type: 'checkbox',
                        id: 'play-sounds',
                        checked: settingsService.get('play_sounds', true),
                        click: () => {
                            const menuItem = converse.getMenuItemById('play-sounds');
                            settingsService.set('play_sounds', menuItem.checked);
                        }
                    }
                ])
            },
            {
                label: 'Theme',
                submenu: Menu.buildFromTemplate([
                    {
                        label: 'System',
                        type: 'radio',
                        checked: themeService.getThemeSetting() === 'default',
                        click: () => themeService.setTheme('default'),
                    },
                    {
                        label: 'Classic (Light)',
                        type: 'radio',
                        checked: themeService.getThemeSetting() === 'classic',
                        click: () => themeService.setTheme('classic'),
                    },
                    {
                        label: 'Nordic (Light)',
                        type: 'radio',
                        checked: themeService.getThemeSetting() === 'nordic',
                        click: () => themeService.setTheme('nordic'),
                    },
                    {
                        label: 'Dracula (Dark)',
                        type: 'radio',
                        checked: themeService.getThemeSetting() === 'dracula',
                        click: () => themeService.setTheme('dracula'),
                    },
                    {
                        label: 'Cyberpunk',
                        type: 'radio',
                        checked: themeService.getThemeSetting() === 'cyberpunk',
                        click: () => themeService.setTheme('cyberpunk'),
                    },
                ])
            },
            {
                type: 'separator',
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => {
                    app.isQuitting = true
                    app.quit()
                },
            },
        ])
    }));
    application.append(new MenuItem({
        label: 'Edit'
        , submenu: Menu.buildFromTemplate([
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo',
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo',
            },

            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut',
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy',
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste',
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll',
            },
        ])
    }));
    application.append(new MenuItem({
        label: 'Help'
        , submenu: Menu.buildFromTemplate([
            {
                label: 'Debug info',
                accelerator: 'F12',
                click: () => {
                    window.webContents.openDevTools()
                }
            },
            {
                label: 'Clear Credentials',
                click: async () => {
                    await clearCredentials();
                    await window.webContents.session.clearStorageData();
                    reload();
                }
            }
        ])
    }));

    Menu.setApplicationMenu(application);
}

module.exports = menuService
