import { ref, watch } from "vue";
import { getToday } from "./useDateUtils";
import type { TaskDetail } from "~/entities/TaskDetail.entity";

/**
 * Composable for managing the state and logic of a task form.
 * Handles edit mode, form reset, and sync with a given task.
 * @param propsTask Optional task to edit
 * @returns { form, editing, resetForm }
 */
export function useTaskForm(propsTask?: TaskDetail | null) {
  // Reactive form state
  const form = ref({
    title: "",
    is_completed: false,
    due_date: getToday(),
    description: "",
    comments: "",
    tags: "",
  });

  // Whether the form is in edit mode
  const editing = ref(false);

  /**
   * Reset the form to its initial state
   */
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

  // Watch for changes in the input task and update the form accordingly
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
