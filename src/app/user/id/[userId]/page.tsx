import { generateUserMetaData } from '@/lib/generate-metatada'
import CardProfile from './components/card-profile'
import UserNotFound from './components/not-found'
import { formatDays } from '@/lib/format-days'
import { getUserById } from '@/http/get-user-by-id'
import { getPostsByUserId } from '@/http/get-posts-by-user-id'
import { getAlbumsByUserId } from '@/http/get-albums-by-user-id'

export const dynamic = 'force-dynamic'
export const revalidate = 300

interface UserPageProps {
  params: Promise<{ userId: string }>
}

export default async function UserPageById({ params }: UserPageProps) {
  const { userId } = await params

  try {
    const [userResponse, userPosts, userAlbums] = await Promise.all([
      getUserById(userId),
      getPostsByUserId(userId),
      getAlbumsByUserId(userId),
    ])

    if (!userResponse?.user) {
      return (
        <UserNotFound
          errorTitle="Usuário não encontrado"
          errorDescription="Ops! Parece que o perfil que você está procurando não existe ou foi removido."
        />
      )
    }

    const currentUser = userResponse.user
    const generatedMetadata = generateUserMetaData(userId)

    const userMetadata = {
      user_id: userId,
      username: generatedMetadata.username,
      days: generatedMetadata.days,
      city: generatedMetadata.city,
    }

    const user = {
      id: currentUser.id,
      username: userMetadata.username,
      name: currentUser.name,
      email: currentUser.email,
      days: formatDays(userMetadata.days),
      city: userMetadata.city,
      posts: userPosts?.posts?.length || 0,
      albums: userAlbums?.albums?.length || 0,
      created_at: currentUser.created_at,
    }

    return (
      <CardProfile
        user={{ ...user, created_at: new Date(user.created_at) }}
        posts={userPosts?.posts || []}
        albums={userAlbums?.albums || []}
      />
    )
  } catch {
    return (
      <UserNotFound
        errorTitle="Erro ao carregar usuário"
        errorDescription="Não foi possível carregar os dados do usuário. Tente novamente."
      />
    )
  }
}
