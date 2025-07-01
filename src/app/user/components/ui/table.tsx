'use client'

import { UserType } from '../user-table'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { AlertDialog } from '@/components/alert-dialog'
import { Table } from '@/components/table'
import DeleteUserModal from '../delete-user-modal'

interface TableProps {
  paginatedUsers: UserType[]
  onUserDeleted: (userId: string) => void
}

const UserTable = ({ paginatedUsers, onUserDeleted }: TableProps) => {
  const router = useRouter()

  const handleDoubleClick = (userId: string) => {
    startTransition(() => {
      router.push(`/user/id/${userId}`)
    })
  }

  return (
    <Table.Root>
      <Table.Header>
        <tr>
          <Table.HeadCell>User</Table.HeadCell>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell>E-mail</Table.HeadCell>
          <Table.HeadCell className="pr-20">Cidade</Table.HeadCell>
          <Table.HeadCell className="w-[150px]">Dias da Semana</Table.HeadCell>
          <Table.HeadCell className="text-center">Posts</Table.HeadCell>
          <Table.HeadCell className="text-center">Álbuns</Table.HeadCell>
          <Table.HeadCell className="text-center">Ações</Table.HeadCell>
        </tr>
      </Table.Header>

      <Table.Body>
        {paginatedUsers.length === 0 ? (
          <Table.EmptyState
            colSpan={8}
            icon="👥"
            title="Nenhum usuário encontrado"
            description="Tente ajustar os filtros de pesquisa ou adicione novos usuários"
          />
        ) : (
          paginatedUsers.map((user, index) => (
            <Table.Row
              key={index}
              onDoubleClick={() => handleDoubleClick(user.id)}
              title="Duplo clique para ver o perfil do usuário"
            >
              <Table.Cell className="py-2 font-bold text-gray-700">
                {user.username}
              </Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell className="pl-[1px]">{user.city}</Table.Cell>
              <Table.Cell>{user.days}</Table.Cell>
              <Table.Cell className="text-center">{user.posts}</Table.Cell>
              <Table.Cell className="text-center">{user.albums}</Table.Cell>

              <Table.Action showOnHover={true}>
                <AlertDialog.Root>
                  <AlertDialog.Trigger asChild>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className="flex items-center justify-center p-2 rounded-md cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                      title={`Excluir usuário ${user.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </AlertDialog.Trigger>

                  <DeleteUserModal
                    user_id={user.id}
                    userName={user.name}
                    onUserDeleted={() => onUserDeleted(user.id)}
                  />
                </AlertDialog.Root>
              </Table.Action>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}

export default UserTable
