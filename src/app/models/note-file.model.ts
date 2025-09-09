export interface NoteFile {
  path: string;

  name: string;

  isDirectory: boolean;

  isImage?: boolean;

  children?: NoteFile[] | null;

  content?: string;

  lastModified?: Date;

  tags?: string[];



}


