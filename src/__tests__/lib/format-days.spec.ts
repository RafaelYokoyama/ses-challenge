import { formatDays } from '@/lib/format-days'

jest.mock('@/lib/generate-metatada', () => ({
  daysOfTheWeek: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ]
}))

describe('format-days', () => {
  describe('formatDays', () => {
    it('should return "Todos os dias" for all 7 days', () => {
      const allDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      expect(formatDays(allDays)).toBe('Todos os dias')
    })

    it('should return "Fim de semana" for Saturday and Sunday', () => {
      expect(formatDays(['Sábado', 'Domingo'])).toBe('Fim de semana')
      expect(formatDays(['Domingo', 'Sábado'])).toBe('Fim de semana')
    })

    it('should format sequential weekdays correctly', () => {
      expect(formatDays(['Segunda', 'Terça', 'Quarta'])).toBe('Segunda a Quarta')
      expect(formatDays(['Quinta', 'Sexta'])).toBe('Quinta,  Sexta')
    })

    it('should format all weekdays correctly', () => {
      const weekdays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
      expect(formatDays(weekdays)).toBe('Segunda a Sexta')
    })

    it('should handle two non-sequential days with "e"', () => {
      expect(formatDays(['Segunda', 'Quarta'])).toBe('Segunda e Quarta')
      expect(formatDays(['Terça', 'Sexta'])).toBe('Terça e Sexta')
    })

    it('should list multiple non-sequential days with commas', () => {
      expect(formatDays(['Segunda', 'Quarta', 'Sexta'])).toBe('Segunda, Quarta, Sexta')
      expect(formatDays(['Domingo', 'Terça', 'Quinta'])).toBe('Domingo, Terça, Quinta')
    })

    it('should handle single day', () => {
      expect(formatDays(['Segunda'])).toBe('Segunda')
      expect(formatDays(['Domingo'])).toBe('Domingo')
    })

    it('should handle empty array', () => {
      expect(formatDays([])).toBe('')
    })

    it('should maintain day order even if input is unordered', () => {
      expect(formatDays(['Quarta', 'Segunda', 'Terça'])).toBe('Segunda a Quarta')
    })

    it('should handle complex sequences correctly', () => {
      expect(formatDays(['Segunda', 'Terça', 'Quarta', 'Sexta', 'Sábado']))
        .toBe('Segunda, Terça, Quarta, Sexta, Sábado')
    })

    it('should handle cross-week sequences (Saturday to Monday)', () => {
      expect(formatDays(['Sábado', 'Domingo', 'Segunda'])).toBe('Sábado, Domingo, Segunda')
    })

    it('should preserve original day names for non-sequential patterns', () => {
      expect(formatDays(['Segunda', 'Quinta', 'Sábado'])).toBe('Segunda, Quinta, Sábado')
    })

    it('should handle case where only weekend days are selected but not both', () => {
      expect(formatDays(['Sábado'])).toBe('Sábado')
      expect(formatDays(['Domingo'])).toBe('Domingo')
    })
  })
}) 