import SmartNavigation from '@/components/smart-navigation'

import { HeroSection } from '@/components'
import { FaDribbble, FaAlignLeft, FaTrophy } from 'react-icons/fa'
import { getUsers } from '@/http/get-users'
import { getPosts } from '@/http/get-posts'
import { getAlbums } from '@/http/get-albums'
import { getUsersMetaData } from '@/http/get-user-metadata'
import { UserDisplay } from '@/types'
import { formatDays } from '@/lib/format-days'
import { generateUserMetaData } from '@/lib/generate-metatada'
import UserTableComponent from './components/user-table'

const UsersPage = async () => {
  const [usersResponse, postsResponse, albumsResponse, userMetadataResponse] =
    await Promise.all([getUsers(), getPosts(), getAlbums(), getUsersMetaData()])

  if (!usersResponse?.users || !Array.isArray(usersResponse.users)) {
    throw new Error('API de usuários retornou dados inválidos')
  }

  const usersData = usersResponse.users.reverse()
  const posts = postsResponse?.posts || []
  const albums = albumsResponse?.albums || []
  const userMetadataList = userMetadataResponse?.users || []

  const metadataMap = new Map(
    userMetadataList.map((meta) => [meta.user_id, meta]),
  )

  const mappedUsers: UserDisplay[] = usersData.map(
    (user: { id: string; name: string; email: string; created_at: string }) => {
      const savedMetadata = metadataMap.get(user.id)
      const metadata = savedMetadata || generateUserMetaData(user.id)

      const userPosts = posts.filter(
        (post: { user_id: string }) => String(post.user_id) === String(user.id),
      )
      const userAlbums = albums.filter(
        (album: { user_id: string }) =>
          String(album.user_id) === String(user.id),
      )

      return {
        id: user.id,
        name: user.name,
        username: metadata.username,
        email: user.email,
        days: formatDays(metadata.days),
        city: metadata.city,
        posts: userPosts.length,
        albums: userAlbums.length,
        created_at: new Date(user.created_at),
      }
    },
  )

  return (
    <>
      <HeroSection>
        <HeroSection.Item
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

      <main className="lg:max-w-[1300px] mx-auto px-4 lg:px-8 mb-10 overflow-hidden">
        <section className="mt-5 flex items-center justify-between">
          <h1 className="lg:text-2xl text-lg font-bold">Usuários</h1>

          <SmartNavigation
            href="/user/new"
            preventRSC={false}
            className="bg-[#7E50CE] text-sm lg:text-base text-white px-4 py-2 rounded-md hover:bg-[#6B42B1] transition-colors"
          >
            Adicionar Usuário
          </SmartNavigation>
        </section>

        <section className="mt-2">
          <UserTableComponent initialUsers={mappedUsers} />
        </section>
      </main>
    </>
  )
}

export default UsersPage
