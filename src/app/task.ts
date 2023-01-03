export interface Task {
  id:number;
  name:string;
  categoryIds:number[];
  note:string;
  isImportant:boolean;
  isCompleted:boolean;
}