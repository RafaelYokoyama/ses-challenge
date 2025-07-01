import { UserDisplay, Post, Album } from '@/types'
import { Calendar, MapPin, FileText, Camera, Heart, Users } from 'lucide-react'
import {
  Card,
  Block,
  StatCard,
  ActivityList,
  ProfileAvatar,
  ContactInfo,
  UserInfoGrid,
  DaysGrid,
  ProfileSectionHeader as SectionHeader,
} from '@/components/ui'

interface CardProfileProps {
  user: UserDisplay
  posts?: Post[]
  albums?: Album[]
}

const formatDays = (days: string | string[]) => {
  return typeof days === 'string' ? days.split(', ') : days || []
}

export default function CardProfile({
  user,
  posts = [],
  albums = [],
}: CardProfileProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ProfileAvatar name={user.name} size="xl" />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                {user.name}
              </h1>
              <p className="text-xl text-violet-700 mb-4">@{user.username}</p>
              <ContactInfo email={user.email} city={user.city} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          <StatCard
            icon={FileText}
            value={user.posts}
            label="Posts Criados"
            color="violet"
            description="Total de posts publicados"
          />
          <StatCard
            icon={Camera}
            value={user.albums}
            label="Álbuns"
            color="indigo"
            description="Coleções de fotos"
          />
          <StatCard
            icon={Heart}
            value={
              user.albums > 0 ? (user.posts / user.albums).toFixed(1) : '0'
            }
            label="Posts/Álbum"
            color="slate"
            description="Média de posts por álbum"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          <Card>
            <SectionHeader icon={Users} title="Informações do Usuário" />
            <UserInfoGrid>
              <Block title="Identificação">
                <p>
                  <span className="font-medium">ID:</span> {user.id}
                  <br />
                  <span className="font-medium">Nome:</span> {user.name}
                  <br />
                  <span className="font-medium">Username:</span> @
                  {user.username}
                </p>
              </Block>
              <Block title="Localização" variant="subtle">
                <p>
                  <MapPin className="w-4 h-4 inline mr-2 text-violet-600" />
                  {user.city}
                </p>
              </Block>
              <Block title="Data de Criação" variant="subtle">
                <p>
                  {new Intl.DateTimeFormat('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(user.created_at))}
                </p>
              </Block>
            </UserInfoGrid>
          </Card>

          <Card>
            <SectionHeader icon={Calendar} title="Disponibilidade" />
            <UserInfoGrid>
              <Block title="Dias da Semana Disponíveis" variant="highlighted">
                <DaysGrid days={formatDays(user.days)} columns={2} />
              </Block>
              {posts.length > 0 && (
                <ActivityList
                  title="Posts Recentes"
                  data={posts.map((post) => ({
                    id: post.id,
                    title: post.title,
                    subtitle: `Post #${post.id}`,
                  }))}
                  maxItems={3}
                  emptyMessage="Nenhum post encontrado"
                  renderItem={(item) => (
                    <div
                      key={item.id}
                      className="text-sm text-slate-600 p-3 bg-white/70 rounded-lg border border-violet-100"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-violet-700">
                              #{item.id}
                            </span>
                            <span className="text-xs px-2 py-1 bg-violet-100 text-violet-600 rounded-full">
                              Post
                            </span>
                          </div>
                          <h4 className="font-medium text-slate-800 mb-1">
                            {(item.title || 'Sem título').substring(0, 40)}
                            {(item.title || '').length > 40 && '...'}
                          </h4>
                          {item.subtitle && (
                            <p className="text-xs text-slate-500">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              )}
            </UserInfoGrid>
          </Card>
        </div>

        {albums.length > 0 && (
          <Card>
            <SectionHeader
              icon={Camera}
              title="Álbuns"
              subtitle={`${albums.length} álbuns disponíveis`}
            />
            <ActivityList
              title="Álbuns Recentes"
              data={albums.map((album, index) => ({
                id: album.id,
                title: album.title,
                subtitle: `Álbum ${index + 1}`,
              }))}
              maxItems={5}
              emptyMessage="Nenhum álbum encontrado"
              renderItem={(item, index) => (
                <div
                  key={item.id}
                  className="text-sm text-slate-600 p-3 bg-white/70 rounded-lg border border-slate-100 hover:border-violet-200 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-violet-500 rounded-lg flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-800">
                            #{item.id}
                          </span>
                          <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                            Álbum
                          </span>
                        </div>
                        <h4 className="font-medium text-slate-800">
                          {(item.title || 'Sem título').substring(0, 50)}
                          {(item.title || '').length > 50 && '...'}
                        </h4>
                        {item.subtitle && (
                          <p className="text-xs text-slate-500 mt-1">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      Álbum #{index + 1}
                    </div>
                  </div>
                </div>
              )}
            />
          </Card>
        )}
      </div>
    </div>
  )
}
