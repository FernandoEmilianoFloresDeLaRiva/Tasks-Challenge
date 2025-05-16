import { Task } from './Task.entity'

export class TaskDetail extends Task {
  comments?: string;
  description?: string;
  tags?: string;
  token?: string;
  created_at?: string;
  updated_at?: string;

  constructor() {
    super();
  }

  static override fromJson(json: any): TaskDetail {
    const task = new TaskDetail();
    Object.assign(task, Task.fromJson(json));
    task.comments = json["comments"];
    task.description = json["description"];
    task.tags = json["tags"];
    task.token = json["token"];
    task.created_at = json["created_at"];
    task.updated_at = json["updated_at"];
    return task;
  }
}
