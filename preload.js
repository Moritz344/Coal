const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readDir: (dirPath) => ipcRenderer.invoke('fs:readDir',dirPath),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (filePath,content) => ipcRenderer.invoke('fs:saveFile', filePath,content),
  deleteFile: (filePath) => ipcRenderer.invoke('fs:deleteFile', filePath),
  readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath),
  rename: (oldPath,newPath) => ipcRenderer.invoke('fs:rename', oldPath,newPath),
  createFolder: (filePath) => ipcRenderer.invoke('fs:createFolder', filePath)
});

