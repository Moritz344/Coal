const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readDir: (dirPath) => ipcRenderer.invoke('fs:readDir',dirPath),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (data) => ipcRenderer.invoke('dialog:saveFile', data),
  readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath)
});

