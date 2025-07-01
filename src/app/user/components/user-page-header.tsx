'use client'

import SmartNavigation from '@/components/smart-navigation'

export default function UserPageHeader() {
  return (
    <section className="mt-5 flex items-center justify-between">
      <h1 className="lg:text-2xl text-lg font-bold">Usuários</h1>

      <SmartNavigation
        href="/user/new"
        preventRSC={false}
        prefetch={true}
        optimistic={true}
        className="bg-[#7E50CE] text-sm lg:text-base text-white px-4 py-2 rounded-md hover:bg-[#6B42B1] transition-colors duration-200 hover:scale-105 transform"
      >
        Adicionar Usuário
      </SmartNavigation>
    </section>
  )
}
