const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.ELECTRON_DEV) {
    win.loadURL('http://localhost:4200');  // Angular Dev Server
    win.webContents.openDevTools();        // optional Debugging
  }else {
    win.loadFile(path.join(__dirname, 'dist/emerald/browser/index.html'));
  }

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// read path
ipcMain.handle('fs:readDir', async (event, dirPath) => {
  try {
    const items = await fs.promises.readdir(dirPath, { withFileTypes: true });
    // Gib ein Array von Objekten zurück: { name, path, isDirectory }
    return items.map(item => ({
      name: item.name,
      path: path.join(dirPath, item.name),
      isDirectory: item.isDirectory()
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
});



// open file
ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Markdown', extensions: ['md', 'txt'] }]
  });
  if (canceled) return null;
  return filePaths[0];
});

// read file
ipcMain.handle('fs:readFile', async (event, filePath) => {
  return fs.promises.readFile(filePath, 'utf-8');
});

// save file
ipcMain.handle('fs:saveFile', async (event, filePath, content) => {
  await fs.promises.writeFile(filePath, content, 'utf-8');
  return true;
});

