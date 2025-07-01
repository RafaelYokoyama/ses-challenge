import { FaGrinAlt, FaHeartbeat, FaLifeRing } from 'react-icons/fa'
import InfoBlock from './info-block'

export default function InfoBlocks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:mt-8 mt-4 mb-8">
      <InfoBlock
        icon={<FaLifeRing className="size-12" />}
        title="Precisa de ajuda?"
        description="Estamos aqui para ajudar! Entre em contato com nossa equipe de suporte através do chat ao vivo ou envie um e-mail para suporte@sensedia.com. Respondemos em até 24 horas nos dias úteis."
      />

      <InfoBlock
        icon={<FaHeartbeat className="size-12" />}
        title="Por que se registrar?"
        description="Ao se registrar, você terá acesso a reservas de quadras, participação em torneios exclusivos e poderá formar equipes com outros jogadores. Aproveite também descontos especiais para membros."
      />

      <InfoBlock
        icon={<FaGrinAlt className="size-12" />}
        title="O que está acontecendo?"
        description="Estamos com inscrições abertas para o Campeonato Regional de Society! Registre-se até 15/06 para garantir sua vaga. Também temos novas quadras disponíveis no complexo esportivo central."
      />
    </div>
  )
}
