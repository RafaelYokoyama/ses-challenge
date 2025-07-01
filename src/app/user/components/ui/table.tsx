'use client'

import { UserType } from '../user-table'
import { Trash2, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  startTransition,
  memo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react'
import { AlertDialog } from '@/components/alert-dialog'
import { Table } from '@/components/table'
import DeleteUserModal from '../delete-user-modal'

interface TableProps {
  paginatedUsers: UserType[]
  onUserDeleted: (userId: string) => void
}

const UserTableRow = memo(
  ({
    user,
    index,
    onDoubleClick,
    onUserDeleted,
  }: {
    user: UserType
    index: number
    onDoubleClick: (userId: string) => void
    onUserDeleted: (userId: string) => void
  }) => {
    const [isPrefetched, setIsPrefetched] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const router = useRouter()
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const lastClickTime = useRef<number>(0)

    const handleMouseEnter = useCallback(() => {
      if (!isPrefetched) {
        router.prefetch(`/user/id/${user.id}`)
        setIsPrefetched(true)
      }
    }, [router, user.id, isPrefetched])

    const handleRowClick = useCallback(
      (e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        if (
          target.closest('[data-action-button]') ||
          isDeleting ||
          showDeleteModal
        ) {
          return
        }

        const now = Date.now()
        const timeDiff = now - lastClickTime.current
        lastClickTime.current = now

        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current)
          clickTimeoutRef.current = null
        }

        if (timeDiff < 300) {
          onDoubleClick(user.id)
          return
        }

        clickTimeoutRef.current = setTimeout(() => {
          if (!isDeleting && !showDeleteModal) {
            startTransition(() => {
              router.push(`/user/id/${user.id}`)
            })
          }
          clickTimeoutRef.current = null
        }, 300)
      },
      [router, user.id, onDoubleClick, isDeleting, showDeleteModal],
    )

    const handleDoubleClick = useCallback(() => {
      if (isDeleting || showDeleteModal) {
        return
      }

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
        clickTimeoutRef.current = null
      }

      onDoubleClick(user.id)
    }, [onDoubleClick, user.id, isDeleting, showDeleteModal])

    const handleDeleteClick = useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
        clickTimeoutRef.current = null
      }

      setShowDeleteModal(true)
    }, [])

    const handleUserDeleted = useCallback(() => {
      setIsDeleting(false)
      setShowDeleteModal(false)
      onUserDeleted(user.id)
    }, [onUserDeleted, user.id])

    const handleModalClose = useCallback(() => {
      setShowDeleteModal(false)
      setIsDeleting(false)
    }, [])

    useEffect(() => {
      setIsDeleting(false)
      setShowDeleteModal(false)
    }, [user.id])

    return (
      <Table.Row
        key={index}
        onClick={handleRowClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        title="Clique para ver o perfil do usuário (duplo clique é mais rápido)"
        className={`cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
          isDeleting ? 'opacity-75' : ''
        }`}
      >
        <Table.Cell className="py-2 font-bold text-gray-700">
          {user.username}
        </Table.Cell>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell className="break-all">{user.email}</Table.Cell>
        <Table.Cell className="pl-[1px]">{user.city}</Table.Cell>
        <Table.Cell>{user.days}</Table.Cell>
        <Table.Cell className="text-center">
          <span className="inline-flex items-center gap-1">
            {user.posts}
            {user.posts > 0 && (
              <ExternalLink className="w-3 h-3 text-gray-400" />
            )}
          </span>
        </Table.Cell>
        <Table.Cell className="text-center">
          <span className="inline-flex items-center gap-1">
            {user.albums}
            {user.albums > 0 && (
              <ExternalLink className="w-3 h-3 text-gray-400" />
            )}
          </span>
        </Table.Cell>

        <Table.Action showOnHover={true}>
          <AlertDialog.Root
            open={showDeleteModal}
            onOpenChange={setShowDeleteModal}
          >
            <AlertDialog.Trigger asChild>
              <button
                data-action-button="true"
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="flex items-center justify-center p-2 rounded-md cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10 relative"
                title={`Excluir usuário ${user.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </AlertDialog.Trigger>

            <DeleteUserModal
              user_id={user.id}
              userName={user.name}
              onUserDeleted={handleUserDeleted}
              onModalClose={handleModalClose}
              isDeleting={isDeleting}
              setIsDeleting={setIsDeleting}
            />
          </AlertDialog.Root>
        </Table.Action>
      </Table.Row>
    )
  },
)

UserTableRow.displayName = 'UserTableRow'

const UserTable = ({ paginatedUsers, onUserDeleted }: TableProps) => {
  const router = useRouter()

  const handleDoubleClick = useCallback(
    (userId: string) => {
      router.push(`/user/id/${userId}`)
    },
    [router],
  )

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
            <UserTableRow
              key={`${user.id}-${index}`}
              user={user}
              index={index}
              onDoubleClick={handleDoubleClick}
              onUserDeleted={onUserDeleted}
            />
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}

export default memo(UserTable)
