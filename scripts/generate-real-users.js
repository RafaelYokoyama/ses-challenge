import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

console.log('🇧🇷 Generating Brazilian-style users...\n')

const NAMES = [
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
]

const CITIES = [
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
]

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

function seed(text, salt = 0) {
  const str = `${text}-${salt}`
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) / 2147483647
}

function generateUsername(id) {
  const name = NAMES[Math.floor(seed(id, 3) * NAMES.length)]
  const pre =
    CHARS[Math.floor(seed(id, 4) * CHARS.length)] +
    CHARS[Math.floor(seed(id, 5) * CHARS.length)]
  return `${pre}${name}`
}

function generateCity(id) {
  return CITIES[Math.floor(seed(id, 2) * CITIES.length)]
}

function generateDays(id) {
  const count = Math.floor(seed(id, 1) * 7) + 1
  const shuffled = [...WEEKDAYS].sort(() => seed(id, 10) - 0.5)
  return shuffled
    .slice(0, count)
    .sort((a, b) => WEEKDAYS.indexOf(a) - WEEKDAYS.indexOf(b))
}

async function fetchUsers() {
  const res = await fetch('http://localhost:8080/api/v1/users')
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.users
}

async function ensureDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
}

async function createBackup(filePath) {
  const backupPath = path.join(
    path.dirname(filePath),
    `user-meta-backup-${Date.now()}.json`,
  )
  await fs.copyFile(filePath, backupPath)
  console.log(`💾 Backup: ${path.basename(backupPath)}`)
}

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const filePath = path.join(__dirname, 'data', 'user-meta.json')

  await ensureDirectory(filePath)

  const fileExists = await fs
    .access(filePath)
    .then(() => true)
    .catch(() => false)

  if (fileExists) await createBackup(filePath)

  const users = await fetchUsers().catch(() => [
    { id: 'ad8f0a37-a194-4e37-84c4-ac15f09847f0' },
    { id: '4c2080c4-1b6b-4b14-835c-fa8990480eb9' },
    { id: '06c63014-fe69-4621-a2c3-1a8bd440970a' },
    { id: 'bfdeda9c-e940-406d-8b55-0b5a1ca12526' },
    { id: 'b7fec0c4-399e-473f-979e-764eaa94c5cc' },
  ])

  console.log('\n📄 User metadata:\n' + '─'.repeat(60))

  const metadata = users.map((user, i) => {
    const username = generateUsername(user.id)
    const city = generateCity(user.id)
    const days = generateDays(user.id)

    console.log(`${i + 1}. ${username} - ${city} - [${days.join(', ')}]`)

    return {
      user_id: user.id,
      username,
      city,
      days,
    }
  })

  console.log('─'.repeat(60))
  await fs.writeFile(filePath, JSON.stringify(metadata, null, 2))
  console.log(
    `\n✅ ${metadata.length} users saved to ${path.basename(filePath)}!`,
  )
  console.log('🚀 Run: npm run dev')
  console.log('🌐 Visit: http://localhost:3000/user')
  console.log('🎉 All users now have Brazilian-style metadata!')
}

main().catch(console.error)
