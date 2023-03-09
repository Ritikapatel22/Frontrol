import { showToast } from '@frontrolinc/pace-ui-framework'
export function SavedView() {
  showToast('success', 'View saved successfully.', 'drawer')
}

export function CreateView() {
  showToast('success', 'View created successfully.', 'drawer')
}

export function DeleteView() {
  showToast('success', 'View deleted successfully.', 'drawer')
}

export function DuplicateView() {
  showToast('success', 'View duplicated successfully.', 'drawer')
}

export function Toast(type, msg) {
  showToast(type, msg)
}
