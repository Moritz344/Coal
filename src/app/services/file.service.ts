import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  async openFile(): Promise<{ filePath: string, content: string } | null> {
    const filePath = await (window as any).electronAPI.openFile();
    if (!filePath) return null;

    const content = await (window as any).electronAPI.readFile(filePath);
    return { filePath, content };
  }
  async openPath(): Promise<{ filePath: string, } | null> {
    const filePath = await (window as any).electronAPI.openPath();
    if (!filePath) return null;

    return { filePath };
  }

  async readFile(filePath: string): Promise<string> {
    const content = await (window as any).electronAPI.readFile(filePath);
    return content as string;

  }
  async saveFile(filePath: string, content: string): Promise<boolean> {
    return await (window as any).electronAPI.saveFile(filePath, content);
  }
  async deleteFile(filePath: string): Promise<boolean> {
    return await (window as any).electronAPI.deleteFile(filePath);
  }

  async renameFile(oldPath: string, newPath: string): Promise<boolean> {
    return await (window as any).electronAPI.rename(oldPath, newPath);
  }

  async createFolder(path: string) {
    return await (window as any).electronAPI.createFolder(path);
  }

  async readDir(path: string) {
    return await (window as any).electronAPI.readDir(path);
  }
}

