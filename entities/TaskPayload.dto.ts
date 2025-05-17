export class TaskPayloadDTO {
  id: number = 0;
  title: string = "";
  is_completed: number = 0;
  due_date: string = "";
  comments?: string;
  description?: string;
  tags?: string;
  token?: string;
  created_at?: string;
  updated_at?: string;

  constructor() {}

  setId(id: number): TaskPayloadDTO {
    this.id = id;
    return this;
  }

  setTitle(title: string): TaskPayloadDTO {
    this.title = title;
    return this;
  }

  setIsCompleted(isCompleted: boolean): TaskPayloadDTO {
    this.is_completed = isCompleted ? 1 : 0;
    return this;
  }

  setDueDate(dueDate: string): TaskPayloadDTO {
    this.due_date = dueDate;
    return this;
  }

  setComments(comments: string): TaskPayloadDTO {
    this.comments = comments;
    return this;
  }

  setDescription(description: string): TaskPayloadDTO {
    this.description = description;
    return this;
  }

  setTags(tags: string): TaskPayloadDTO {
    this.tags = tags;
    return this;
  }

  setToken(token: string): TaskPayloadDTO {
    this.token = token;
    return this;
  }

  setCreatedAt(createdAt: string): TaskPayloadDTO {
    this.created_at = createdAt;
    return this;
  }

  setUpdatedAt(updatedAt: string): TaskPayloadDTO {
    this.updated_at = updatedAt;
    return this;
  }

  build(): TaskPayloadDTO {
    return this;
  }
}
