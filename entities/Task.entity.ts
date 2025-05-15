export class Task {
  id: number = 0;
  title: string = "";
  is_completed: number = 0;
  due_date: string = "";

  constructor() {}

  static fromJson(json: any): Task {
    const task = new Task();
    task.setId(json["id"]);
    task.setTitle(json["title"]);
    task.setIsCompleted(json["is_completed"]);
    task.setDueDate(json["due_date"]);
    return task;
  }

  setId(id: number) {
    this.id = id;
  }

  setTitle(title: string) {
    this.title = title;
  }
  setIsCompleted(is_completed: number) {
    this.is_completed = is_completed;
  }

  setDueDate(due_date: string) {
    this.due_date = due_date;
  }
}
