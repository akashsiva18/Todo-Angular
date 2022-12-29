export interface Task {
  id:number;
  name:string;
  category:string[];
  note:string;
  isImportant:boolean;
  isCompleted:boolean;
}