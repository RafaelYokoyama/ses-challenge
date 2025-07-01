import { FaDribbble, FaAlignLeft, FaTrophy } from 'react-icons/fa'
import HeroSection from './hero-section'

const HeroSectionExample = () => {
  return (
    <HeroSection>
      <HeroSection.Icon
        icon={<FaDribbble className="lg:size-9 size-5" />}
        title="Tipo de Quadra"
        subtitle="Society"
      />

      <HeroSection.Icon
        icon={<FaAlignLeft className="lg:size-11 size-7" />}
        title="Nível"
        subtitle="Semi-Profissional"
      />

      <HeroSection.Icon
        icon={<FaTrophy className="lg:size-11 size-7" />}
        title="Vitórias"
        subtitle="345"
      />
    </HeroSection>
  )
}

export default HeroSectionExample
