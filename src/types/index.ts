export type Letter = {
  id?: string | null // UUID - React List Index

  title: string;
  content: string;
  hint?: string;

  hasMedia: boolean;

  read: boolean;
  timestamp: number;
}

export interface LetterForm {
  title: string
  content: string;
  hint: string;
  file?: FileList;
}