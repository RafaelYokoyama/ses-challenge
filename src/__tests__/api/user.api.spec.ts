import { GET } from '@/app/api/user/route'

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      json: async () => data,
      status: 200,
    })),
  },
}))

describe('User API Route', () => {
  describe('GET /api/user', () => {
    it('should return user data with menu items', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('name')
      expect(data).toHaveProperty('menu')
      expect(data.name).toBe('Rafael Yokoyama')
      expect(Array.isArray(data.menu)).toBe(true)
      expect(data.menu).toHaveLength(5)
      
      data.menu.forEach((item: { label: string; route: string }) => {
        expect(item).toHaveProperty('label')
        expect(item).toHaveProperty('route')
        expect(typeof item.label).toBe('string')
        expect(typeof item.route).toBe('string')
      })
    })

    it('should return specific menu items', async () => {
      const response = await GET()
      const data = await response.json()

      const expectedMenuItems = [
        { label: 'Lista de amigos', route: 'friends' },
        { label: 'Artigos salvos', route: 'saved' },
        { label: 'Notificações', route: 'notifications' },
        { label: 'Preferências', route: 'preferences' },
        { label: 'Fechar Sessão', route: 'logout' },
      ]

      expect(data.menu).toEqual(expectedMenuItems)
    })
  })
}) 