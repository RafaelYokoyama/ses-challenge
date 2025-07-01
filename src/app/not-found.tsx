import { Home, Search, FileX } from 'lucide-react'
import { NotFound } from '@/components'

export default function GlobalNotFound() {
  return (
    <NotFound.Root>
      <NotFound.Icon>
        <FileX className="w-12 h-12 text-white" />
      </NotFound.Icon>

      <NotFound.Title>Página não encontrada</NotFound.Title>

      <NotFound.Description>
        Ops! A página que você está procurando não existe ou foi removida.
        Verifique se o endereço está correto ou navegue para uma das opções
        abaixo.
      </NotFound.Description>

      <NotFound.Actions>
        <NotFound.Action href="/" icon={Home} variant="primary">
          Página Inicial
        </NotFound.Action>
        <NotFound.Action href="/user" icon={Search}>
          Ver Usuários
        </NotFound.Action>
      </NotFound.Actions>
    </NotFound.Root>
  )
}
