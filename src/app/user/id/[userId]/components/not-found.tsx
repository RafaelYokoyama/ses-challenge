import { Home, Users, UserX } from 'lucide-react'
import { NotFound } from '@/components'

interface UserNotFoundProps {
  errorTitle: string
  errorDescription: string
}

export default function UserNotFound({
  errorTitle,
  errorDescription,
}: UserNotFoundProps) {
  return (
    <NotFound.Root>
      <NotFound.Icon>
        <UserX className="w-12 h-12 text-white" />
      </NotFound.Icon>

      <NotFound.Title>{errorTitle}</NotFound.Title>

      <NotFound.Description>{errorDescription}</NotFound.Description>

      <NotFound.Actions>
        <NotFound.Action href="/user" icon={Users} variant="primary">
          Ver Todos os Usuários
        </NotFound.Action>
        <NotFound.Action href="/" icon={Home}>
          Página Inicial
        </NotFound.Action>
      </NotFound.Actions>
    </NotFound.Root>
  )
}
