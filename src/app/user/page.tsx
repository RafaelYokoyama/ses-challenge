import { Suspense } from 'react'

import { HeroSection } from '@/components'
import UserPageHeader from './components/user-page-header'

export const dynamic = 'force-dynamic'
import { FaDribbble, FaAlignLeft, FaTrophy } from 'react-icons/fa'
import { getUsers } from '@/http/get-users'
import { getPosts } from '@/http/get-posts'
import { getAlbums } from '@/http/get-albums'
import { getUsersMetaData } from '@/http/get-user-metadata'
import { UserDisplay, User, Post, Album, UserMetadata } from '@/types'
import { formatDays } from '@/lib/format-days'
import { generateUserMetaData } from '@/lib/generate-metatada'
import UserTableComponent from './components/user-table'
import UserTableSkeleton from './components/user-table-skeleton'

function UserTableWrapper({
  usersData,
  posts,
  albums,
  userMetadataList,
}: {
  usersData: User[]
  posts: Post[]
  albums: Album[]
  userMetadataList: UserMetadata[]
}) {
  const metadataMap = new Map(
    userMetadataList.map((meta) => [meta.user_id, meta]),
  )

  const mappedUsers: UserDisplay[] = usersData.map((user) => {
    const savedMetadata = metadataMap.get(user.id)
    const metadata = savedMetadata || generateUserMetaData(user.id)

    const userPosts = posts.filter(
      (post) => String(post.user_id) === String(user.id),
    )
    const userAlbums = albums.filter(
      (album) => String(album.user_id) === String(user.id),
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
  })

  return <UserTableComponent initialUsers={mappedUsers} />
}

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
        <UserPageHeader />

        <section className="mt-2">
          <div className="mt-4">
            <Suspense fallback={<UserTableSkeleton />}>
              <UserTableWrapper
                usersData={usersData}
                posts={posts}
                albums={albums}
                userMetadataList={userMetadataList}
              />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  )
}

export default UsersPage
