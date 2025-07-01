import {
  generateActiveDays,
  generateCity,
  generateUsername,
  generateUserMetaData,
  getAllUsersMetaData,
  daysOfTheWeek,
  randomDays,
  randomCity,
  randomUserName
} from '@/lib/generate-metatada'

describe('generate-metatada', () => {
  describe('generateActiveDays', () => {
    it('should generate consistent days for the same userId', () => {
      const userId = 'test-user-1'
      const days1 = generateActiveDays(userId)
      const days2 = generateActiveDays(userId)
      
      expect(days1).toEqual(days2)
    })

    it('should generate different days for different userIds', () => {
      const results = []
      for (let i = 0; i < 50; i++) {
        results.push(JSON.stringify(generateActiveDays(`user${i}`)))
      }
      
      const uniqueResults = new Set(results)
      expect(uniqueResults.size).toBeGreaterThan(5)
    })

    it('should generate between 1 and 7 days', () => {
      for (let i = 0; i < 10; i++) {
        const days = generateActiveDays(`test-user-${i}`)
        expect(days.length).toBeGreaterThanOrEqual(1)
        expect(days.length).toBeLessThanOrEqual(7)
      }
    })

    it('should only return valid days of the week', () => {
      const days = generateActiveDays('test-user')
      const validDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      
      days.forEach(day => {
        expect(validDays).toContain(day)
      })
    })

    it('should return days in the correct order', () => {
      const days = generateActiveDays('test-user')
      const dayOrder = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
      
      for (let i = 1; i < days.length; i++) {
        const currentIndex = dayOrder.indexOf(days[i])
        const previousIndex = dayOrder.indexOf(days[i - 1])
        expect(currentIndex).toBeGreaterThan(previousIndex)
      }
    })

    it('should not have duplicate days', () => {
      const days = generateActiveDays('test-user')
      const uniqueDays = [...new Set(days)]
      
      expect(days.length).toBe(uniqueDays.length)
    })
  })

  describe('generateCity', () => {
    it('should generate consistent city for the same userId', () => {
      const userId = 'test-user-1'
      const city1 = generateCity(userId)
      const city2 = generateCity(userId)
      
      expect(city1).toBe(city2)
    })

    it('should generate different cities for different userIds', () => {
      const cities = []
      for (let i = 0; i < 100; i++) {
        cities.push(generateCity(`user-${i}`))
      }
      
      const uniqueCities = new Set(cities)
      expect(uniqueCities.size).toBeGreaterThan(3)
    })

    it('should only return valid Brazilian cities', () => {
      const validCities = [
        'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba',
        'Porto Alegre', 'Salvador', 'Fortaleza', 'Recife', 'Brasília',
        'Manaus', 'Belém', 'Goiânia', 'Campinas', 'São Luís',
        'Maceió', 'Natal', 'Teresina', 'João Pessoa'
      ]
      
      for (let i = 0; i < 10; i++) {
        const city = generateCity(`test-user-${i}`)
        expect(validCities).toContain(city)
      }
    })
  })

  describe('generateUsername', () => {
    it('should generate consistent username for the same userId', () => {
      const userId = 'test-user-1'
      const username1 = generateUsername(userId)
      const username2 = generateUsername(userId)
      
      expect(username1).toBe(username2)
    })

    it('should generate different usernames for different userIds', () => {
      const usernames = []
      for (let i = 0; i < 100; i++) {
        usernames.push(generateUsername(`user-${i}`))
      }
      
      const uniqueUsernames = new Set(usernames)
      expect(uniqueUsernames.size).toBeGreaterThan(10)
    })

    it('should have correct username format (2 chars + name)', () => {
      const username = generateUsername('test-user')
      
      expect(username.length).toBeGreaterThanOrEqual(3)
      
      const prefix = username.substring(0, 2)
      expect(prefix).toMatch(/^[a-z0-9]{2}$/)
    })

    it('should contain valid base names', () => {
      const validBaseNames = [
        'Carlos', 'Ana', 'Pedro', 'Maria', 'João', 'Fernanda', 'Rafael',
        'Juliana', 'Lucas', 'Beatriz', 'Bruno', 'Camila', 'Diego', 'Letícia',
        'Rodrigo', 'Mariana', 'Gustavo', 'Amanda', 'Thiago', 'Larissa',
        'Felipe', 'Gabriela', 'Henrique', 'Isabela', 'Mateus', 'Sophia',
        'André', 'Vitória', 'Daniel', 'Bianca'
      ]
      
      const username = generateUsername('test-user')
      const baseName = username.substring(2)
      
      expect(validBaseNames).toContain(baseName)
    })
  })

  describe('generateUserMetaData', () => {
    it('should generate consistent metadata for the same userId', () => {
      const userId = 'test-user-1'
      const meta1 = generateUserMetaData(userId)
      const meta2 = generateUserMetaData(userId)
      
      expect(meta1).toEqual(meta2)
    })

    it('should cache metadata for performance', () => {
      const userId = 'cached-user'
      
      const meta1 = generateUserMetaData(userId)
      
      const meta2 = generateUserMetaData(userId)
      
      expect(meta1).toBe(meta2)
    })

    it('should have all required properties', () => {
      const meta = generateUserMetaData('test-user')
      
      expect(meta).toHaveProperty('days')
      expect(meta).toHaveProperty('city')
      expect(meta).toHaveProperty('username')
      
      expect(Array.isArray(meta.days)).toBe(true)
      expect(typeof meta.city).toBe('string')
      expect(typeof meta.username).toBe('string')
    })

    it('should generate different metadata for different users', () => {
      const results = []
      for (let i = 0; i < 50; i++) {
        const meta = generateUserMetaData(`user${i}`)
        results.push(JSON.stringify(meta))
      }
      
      const uniqueResults = new Set(results)
      expect(uniqueResults.size).toBeGreaterThan(10)
    })
  })

  describe('getAllUsersMetaData', () => {
    beforeEach(() => {
      generateUserMetaData('user1')
      generateUserMetaData('user2')
    })

    it('should return all cached user metadata', () => {
      const allMeta = getAllUsersMetaData()
      
      expect(Array.isArray(allMeta)).toBe(true)
      expect(allMeta.length).toBeGreaterThanOrEqual(2)
    })

    it('should include user_id in returned data', () => {
      const allMeta = getAllUsersMetaData()
      
      allMeta.forEach(meta => {
        expect(meta).toHaveProperty('user_id')
        expect(meta).toHaveProperty('days')
        expect(meta).toHaveProperty('city')
        expect(meta).toHaveProperty('username')
      })
    })

    it('should return data for previously generated users', () => {
      generateUserMetaData('test-get-all-1')
      generateUserMetaData('test-get-all-2')
      
      const allMeta = getAllUsersMetaData()
      const userIds = allMeta.map(meta => meta.user_id)
      
      expect(userIds).toContain('test-get-all-1')
      expect(userIds).toContain('test-get-all-2')
    })
  })

  describe('exported aliases', () => {
    it('should export correct constants and function aliases', () => {
      expect(daysOfTheWeek).toEqual([
        'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
      ])
      
      expect(randomDays).toBe(generateActiveDays)
      expect(randomCity).toBe(generateCity)
      expect(randomUserName).toBe(generateUsername)
    })
  })

  describe('seeded randomization', () => {
    it('should be deterministic for the same seed', () => {
      for (let i = 0; i < 5; i++) {
        const days1 = generateActiveDays('consistent-seed')
        const days2 = generateActiveDays('consistent-seed')
        const city1 = generateCity('consistent-seed')
        const city2 = generateCity('consistent-seed')
        const username1 = generateUsername('consistent-seed')
        const username2 = generateUsername('consistent-seed')
        
        expect(days1).toEqual(days2)
        expect(city1).toBe(city2)
        expect(username1).toBe(username2)
      }
    })

    it('should produce different results for different seeds', () => {
      const results1 = {
        days: generateActiveDays('seed1'),
        city: generateCity('seed1'),
        username: generateUsername('seed1')
      }
      
      const results2 = {
        days: generateActiveDays('seed2'),
        city: generateCity('seed2'),
        username: generateUsername('seed2')
      }
      
      const isDifferent = 
        results1.city !== results2.city ||
        results1.username !== results2.username ||
        JSON.stringify(results1.days) !== JSON.stringify(results2.days)
      
      expect(isDifferent).toBe(true)
    })
  })
}) 