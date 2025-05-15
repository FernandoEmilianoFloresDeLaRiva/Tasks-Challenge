export class TaskDetail {
  id: number = 0;
  title: string = "";
  is_completed: number = 0; // 0 or 1
  due_date: string = ""; // YYYY-MM-DD
  comments?: string;
  description?: string;
  tags?: string;
  token?: string;
  created_at?: string;
  updated_at?: string;

  constructor() {}

  static fromJson(json: any): TaskDetail {
    const task = new TaskDetail();
    task.id = json["id"];
    task.title = json["title"];
    task.is_completed = json["is_completed"];
    task.due_date = json["due_date"];
    task.comments = json["comments"];
    task.description = json["description"];
    task.tags = json["tags"];
    task.token = json["token"];
    task.created_at = json["created_at"];
    task.updated_at = json["updated_at"];
    return task;
  }
}
