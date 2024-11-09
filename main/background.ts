import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import {
  Vigenere,
  AutoKeyVigenere,
  ExtendedVigenere,
  PlayfairMatrix,
  Affine,
  Hill,
  SuperEncryption
} from './helpers/encryption'

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    show: false,
    width: 800,
    height: 480,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.webContents.on('dom-ready', () => {
    // if (!isProd) mainWindow.webContents.openDevTools();

    mainWindow.show();
  });

  if (isProd) mainWindow.removeMenu();

  if (isProd) {
    await mainWindow.loadURL('app://./home');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
  }
})();

// Listeners
  // App
    app.on('window-all-closed', () => {
      app.quit();
    });
  
  // IPC
    ipcMain.on('message', async (event, arg) => {
      event.reply('message', `${arg} World!`);
    });

  // Encryption
    ipcMain.handle('encryption.vigenere.encrypt', async (_event, text: string, key: string) => {
      return Vigenere.default().encrypt(text, key);
    });
  
    ipcMain.handle('encryption.vigenere.decrypt', async (_event, text: string, key: string) => {
      return Vigenere.default().decrypt(text, key);
    });
  
    ipcMain.handle('encryption.auto-key-vigenere.encrypt', async (_event, text: string, key: string) => {
      return AutoKeyVigenere.default().encrypt(text, key);
    });
  
    ipcMain.handle('encryption.auto-key-vigenere.decrypt', async (_event, text: string, key: string) => {
      return AutoKeyVigenere.default().decrypt(text, key);
    });
  
    ipcMain.handle('encryption.extended-vigenere.encrypt', async (_event, text: string, key: string) => {
      return ExtendedVigenere.default().encrypt(text, key);
    });
  
    ipcMain.handle('encryption.extended-vigenere.decrypt', async (_event, text: string, key: string) => {
      return ExtendedVigenere.default().decrypt(text, key);
    });
  
    ipcMain.handle('encryption.playfair-matrix.encrypt', async (_event, text: string, key: string) => {
      return PlayfairMatrix.default().encrypt(text, key);
    });
  
    ipcMain.handle('encryption.playfair-matrix.decrypt', async (_event, text: string, key: string) => {
      return PlayfairMatrix.default().decrypt(text, key);
    });
  
    ipcMain.handle('encryption.affine.encrypt', async (_event, text: string, a: number, b: number) => {
      return Affine.default().encrypt(text, a, b);
    });
  
    ipcMain.handle('encryption.affine.decrypt', async (_event, text: string, a: number, b: number) => {
      return Affine.default().decrypt(text, a, b);
    });
  
    ipcMain.handle('encryption.hill.encrypt', async (_event, text: string, key: number[][]) => {
      return Hill.default().encrypt(text, key);
    });
  
    ipcMain.handle('encryption.hill.decrypt', async (_event, text: string, key: number[][]) => {
      return Hill.default().decrypt(text, key);
    });
  
    ipcMain.handle('encryption.super-encryption.encrypt', async (_event, text: string, key: string) => {
      return SuperEncryption.default().encrypt(text, key);
    });

    ipcMain.handle('encryption.super-encryption.decrypt', async (_event, text: string, key: string) => {
      return SuperEncryption.default().decrypt(text, key);
    });