import { ref, watch } from "vue";
import { getToday } from "./useDateUtils";
import type { TaskDetail } from "~/entities/TaskDetail.entity";

export function useTaskForm(propsTask?: TaskDetail | null) {
  const form = ref({
    title: "",
    is_completed: false,
    due_date: getToday(),
    description: "",
    comments: "",
    tags: "",
  });

  const editing = ref(false);

  function resetForm() {
    form.value = {
      title: "",
      is_completed: false,
      due_date: getToday(),
      description: "",
      comments: "",
      tags: "",
    };
  }

  watch(
    () => propsTask,
    (task) => {
      if (task) {
        editing.value = true;
        form.value = {
          title: task.title,
          is_completed: !!task.is_completed,
          due_date: task.due_date ?? "",
          description: task.description || "",
          comments: task.comments || "",
          tags: task?.tags ?? "",
        };
      } else {
        editing.value = false;
        resetForm();
      }
    },
    { immediate: true }
  );

  return {
    form,
    editing,
    resetForm,
  };
}
