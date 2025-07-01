import { getUserInitials } from '@/lib/utils'

describe('utils', () => {
  describe('getUserInitials', () => {
    it('should return initials for full name', () => {
      expect(getUserInitials('João Silva')).toBe('JS')
    })

    it('should return initials for three names, taking only first two', () => {
      expect(getUserInitials('Ana Maria Santos')).toBe('AM')
    })

    it('should handle single name', () => {
      expect(getUserInitials('Carlos')).toBe('C')
    })

    it('should handle empty string', () => {
      expect(getUserInitials('')).toBe('')
    })

    it('should handle name with extra spaces', () => {
      expect(getUserInitials('  Pedro   Oliveira  ')).toBe('PO')
    })

    it('should handle multiple spaces between names', () => {
      expect(getUserInitials('Maria    da    Silva')).toBe('MD')
    })

    it('should convert to uppercase', () => {
      expect(getUserInitials('joão silva')).toBe('JS')
    })

    it('should handle names with special characters', () => {
      expect(getUserInitials('José da Silva')).toBe('JD')
    })

    it('should handle very long names by taking only first two words', () => {
      expect(
        getUserInitials('Ana Beatriz Caroline Daniela Eduarda Fernanda'),
      ).toBe('AB')
    })

    it('should handle single letter names', () => {
      expect(getUserInitials('A B')).toBe('AB')
    })

    it('should filter out empty strings from split', () => {
      expect(getUserInitials('João  Silva')).toBe('JS')
    })
  })
})
