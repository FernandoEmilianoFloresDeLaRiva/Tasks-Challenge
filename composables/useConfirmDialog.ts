/**
 * Composable para confirmaciones reutilizables
 * @param message Mensaje a mostrar en el confirm
 * @returns { confirm }
 */
export function useConfirmDialog(message = '¿Estás seguro?') {
  function confirmAction(): Promise<boolean> {
    return Promise.resolve(window.confirm(message))
  }
  return { confirm: confirmAction }
} 