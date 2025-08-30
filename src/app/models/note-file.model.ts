export interface NoteFile {
  path: string;

  name: string;

  content: string;

  isDirectory: boolean;

  lastModified?: Date;

  tags?: string[];
}

