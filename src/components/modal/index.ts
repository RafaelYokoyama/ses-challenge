
export * from './modal.types'

import { Modal as ModalBase } from './modal'
import { ConfirmModal } from './confirm-modal'
import { DeleteModal } from './delete-modal'

export const Modal = {
  Root: ModalBase,
  Confirm: ConfirmModal,
  Delete: DeleteModal,
}

export { Modal as ModalRoot, ConfirmModal, DeleteModal } 