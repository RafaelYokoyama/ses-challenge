import 'server-only'


import { promises as fs } from 'fs'
import path from 'path'

export interface UserMeta {
  user_id: string
  days: string[]
  city: string
  username: string
}

const filePath = path.join(process.cwd(), 'data', 'user-meta.json')

export async function readUserMeta() {
  try {
    await fs.access(filePath)

    const data = await fs.readFile(filePath, 'utf8')

    if (!data.trim()) {
      return []
    }

    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function writeUserMeta(data: UserMeta[]) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}

export async function saveUsersMeta(data: UserMeta[]) {
  const existingData = await readUserMeta()

  const userMetaMap = new Map<string, UserMeta>()

  existingData.forEach((meta: UserMeta) => {
    userMetaMap.set(meta.user_id, meta)
  })

  data.forEach((meta) => {
    if (!userMetaMap.has(meta.user_id)) {
      userMetaMap.set(meta.user_id, meta)
    }
  })

  const mergedData = Array.from(userMetaMap.values())

  await writeUserMeta(mergedData)
}