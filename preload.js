const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readDir: (dirPath) => ipcRenderer.invoke('fs:readDir',dirPath),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (filePath,content) => ipcRenderer.invoke('fs:saveFile', filePath,content),
  readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath),
  renameFile: (oldPath,newPath) => ipcRenderer.invoke('fs:renameFile', oldPath,newPath)
});

