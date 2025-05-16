import { ref } from 'vue'

/**
 * Composable para manejar diálogos y selección de un item
 * @returns { dialog, selectedId, open, close, select }
 */
export function useDialog<T = number>() {
  const dialog = ref(false)
  const selectedId = ref<T | null>(null)

  function open(id: T) {
    selectedId.value = id
    dialog.value = true
  }

  function close() {
    dialog.value = false
    selectedId.value = null
  }

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