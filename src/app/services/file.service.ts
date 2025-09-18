import { Injectable } from '@angular/core';
import { NoteFile } from '../models/note-file.model';

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

  async getDefaultPath(): Promise<string>  {
    return await (window as any).electronAPI.getDefaultPath();
  }


  async readDir(path: string) {
    return await (window as any).electronAPI.readDir(path);
  }
  async buildTree(path: string): Promise<NoteFile[]>{
    const files = await this.readDir(path);
    const tree: NoteFile[] = [];

    for (const file of files) {
      if (file.isDirectory) {
        tree.push({
          name: file.name,
          isDirectory: true,
          path: file.path,
          children: null,
          isImage: false,
        });
      } else {
        tree.push({
          name: file.name,
          path: file.path,
          isDirectory: false,
          isImage: file.isImage,
        });
      }
    }

    return tree;
}



async loadChildren(node: NoteFile): Promise<NoteFile[]> {
    if (node.isDirectory && node.children === null) {
      node.children = await this.buildTree(node.path);
    }
    return node.children || [];
}
}


