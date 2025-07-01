export interface User {
  id: string
  name: string
  email: string
  updated_at: string
  created_at: string
}

export interface UserMetadata {
  user_id: string
  days: string[]
  city: string
  username: string
}

export interface Post {
  id: string
  user_id: string
  title: string
  content: string
  updated_at: string
  created_at: string
}

export interface Album {
  id: string
  user_id: string
  title: string
  description: string
  updated_at: string
  created_at: string
}

export interface UserDisplay {
  id: string
  name: string
  username: string
  email: string
  days: string
  city: string
  posts: number
  albums: number
  created_at: Date
}

export interface CreateUserFormData {
  username: string
  name: string
  email: string
  city: string
  days: ('Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo')[]
}
 