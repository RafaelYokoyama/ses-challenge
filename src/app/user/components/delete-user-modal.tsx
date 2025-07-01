'use client'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/alert-dialog'
import { deleteUser } from '@/http/delete-user'
import { toast } from 'sonner'
import { useState } from 'react'

interface DeleteUserModalProps {
  user_id: string
  userName: string
  onUserDeleted: () => void
}

const DeleteUserModal = ({
  user_id,
  userName,
  onUserDeleted,
}: DeleteUserModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteUser = async () => {
    setIsDeleting(true)

    try {
      onUserDeleted()
      toast.success(`Usuário &quot;${userName}&quot; excluído com sucesso`)

      await deleteUser(user_id)
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Erro ao excluir usuário. Recarregue a página se necessário.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialogContent className="px-5 w-[450px]">
      <AlertDialogTitle>Excluir usuário?</AlertDialogTitle>
      <AlertDialogDescription>
        Tem certeza que deseja excluir o usuário{' '}
        <strong>&quot;{userName}&quot;</strong>?
        <br />
        <span className="text-sm text-gray-500 mt-2 block">
          Esta ação não pode ser desfeita.
        </span>
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          onClick={handleDeleteUser}
          disabled={isDeleting}
        >
          {isDeleting ? '🔄 Excluindo...' : 'Excluir'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteUserModal
