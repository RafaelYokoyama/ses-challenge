type UserMeta = {
  days: string[]
  city: string
  username: string
}

const DAYS_OF_WEEK = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
] as const

const BRAZILIAN_CITIES = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Curitiba',
  'Porto Alegre',
  'Salvador',
  'Fortaleza',
  'Recife',
  'Brasília',
  'Manaus',
  'Belém',
  'Goiânia',
  'Campinas',
  'São Luís',
  'Maceió',
  'Natal',
  'Teresina',
  'João Pessoa',
] as const

const USERNAME_BASES = [
  'Carlos',
  'Ana',
  'Pedro',
  'Maria',
  'João',
  'Fernanda',
  'Rafael',
  'Juliana',
  'Lucas',
  'Beatriz',
  'Bruno',
  'Camila',
  'Diego',
  'Letícia',
  'Rodrigo',
  'Mariana',
  'Gustavo',
  'Amanda',
  'Thiago',
  'Larissa',
  'Felipe',
  'Gabriela',
  'Henrique',
  'Isabela',
  'Mateus',
  'Sophia',
  'André',
  'Vitória',
  'Daniel',
  'Bianca',
] as const

const ALPHANUMERIC_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

const userMetaDataCache: Record<string, UserMeta> = {}

function createSeededRandom(seed: string, index: number = 0): number {
  const combined = `${seed}-${index}`
  let hash = 0
  
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  
  const a = 1664525
  const c = 1013904223
  const m = Math.pow(2, 32)
  
  hash = Math.abs(hash)
  hash = (a * hash + c) % m
  
  return hash / m
}

function selectRandomElement<T>(array: readonly T[], seed: string, index: number): T {
  const randomValue = createSeededRandom(seed, index)
  const selectedIndex = Math.floor(randomValue * array.length)
  return array[selectedIndex]
}

function shuffleArray<T>(array: readonly T[], seed: string): T[] {
  const shuffled = [...array]
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomValue = createSeededRandom(seed, i + 100)
    const j = Math.floor(randomValue * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

export function generateActiveDays(userId: string): string[] {
  const dayCount = Math.floor(createSeededRandom(userId, 1) * 7) + 1
  const shuffledDays = shuffleArray(DAYS_OF_WEEK, userId)
  const selectedDays = shuffledDays.slice(0, dayCount)

  return selectedDays.sort((a, b) => {
    return DAYS_OF_WEEK.indexOf(a) - DAYS_OF_WEEK.indexOf(b)
  })
}

export function generateCity(userId: string): string {
  return selectRandomElement(BRAZILIAN_CITIES, userId, 200)
}

export function generateUsername(userId: string): string {
  const baseName = selectRandomElement(USERNAME_BASES, userId, 300)
  const char1 = selectRandomElement([...ALPHANUMERIC_CHARS], userId, 400)
  const char2 = selectRandomElement([...ALPHANUMERIC_CHARS], userId, 500)
  const prefix = char1 + char2
  
  return `${prefix}${baseName}`
}

export function generateUserMetaData(userId: string): UserMeta {
  if (userMetaDataCache[userId]) {
    return userMetaDataCache[userId]
  }
  
  const metadata: UserMeta = {
    days: generateActiveDays(userId),
    city: generateCity(userId),
    username: generateUsername(userId),
  }
  
  userMetaDataCache[userId] = metadata
  
  return metadata
}

export function getAllUsersMetaData() {
  return Object.entries(userMetaDataCache).map(([user_id, meta]) => ({
    user_id,
    ...meta,
  }))
}

export const daysOfTheWeek = DAYS_OF_WEEK
export const randomDays = generateActiveDays
export const randomCity = generateCity
export const randomUserName = generateUsername