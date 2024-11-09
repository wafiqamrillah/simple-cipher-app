import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
      callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    }
  },
}

const encryption = {
  vigenere: {
    encrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.vigenere.encrypt', text, key),
    decrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.vigenere.decrypt', text, key),
  },
  autoKeyVigenere: {
    encrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.auto-key-vigenere.encrypt', text, key),
    decrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.auto-key-vigenere.decrypt', text, key),
  },
  extendedVigenere: {
    encrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.extended-vigenere.encrypt', text, key),
    decrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.extended-vigenere.decrypt', text, key),
  },
  playfairMatrix: {
    encrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.playfair-matrix.encrypt', text, key),
    decrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.playfair-matrix.decrypt', text, key),
  },
  affine: {
    encrypt: (text: string, a: number, b: number) => ipcRenderer.invoke('encryption.affine.encrypt', text, a, b),
    decrypt: (text: string, a: number, b: number) => ipcRenderer.invoke('encryption.affine.decrypt', text, a, b),
  },
  hill: {
    encrypt: (text: string, key: number[][]) => ipcRenderer.invoke('encryption.hill.encrypt', text, key),
    decrypt: (text: string, key: number[][]) => ipcRenderer.invoke('encryption.hill.decrypt', text, key),
  },
  superEncryption: {
    encrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.super-encryption.encrypt', text, key),
    decrypt: (text: string, key: string) => ipcRenderer.invoke('encryption.super-encryption.decrypt', text, key),
  },
};

contextBridge.exposeInMainWorld('ipc', handler);
contextBridge.exposeInMainWorld('encryption', {
  lists: () => Object.keys(encryption),
  ...encryption,
});

export type IpcHandler = typeof handler;
