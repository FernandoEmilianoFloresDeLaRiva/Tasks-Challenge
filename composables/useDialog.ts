import { ref } from 'vue'

/**
 * Composable to manage dialog state and selection of an item (e.g., a task).
 * @template T Type of the selected item id (default: number)
 * @returns { dialog, selectedId, open, close, select }
 */
export function useDialog<T = number>() {
  // Whether the dialog is open
  const dialog = ref(false)
  // The currently selected item id
  const selectedId = ref<T | null>(null)

  /**
   * Open the dialog and select an item
   * @param id The id of the item to select
   */
  function open(id: T) {
    selectedId.value = id
    dialog.value = true
  }

  /**
   * Close the dialog and clear selection
   */
  function close() {
    dialog.value = false
    selectedId.value = null
  }

  /**
   * Select an item without opening the dialog
   * @param id The id of the item to select
   */
  function select(id: T) {
    selectedId.value = id
  }

  return {
    dialog,
    selectedId,
    open,
    close,
    select,
  }
} 