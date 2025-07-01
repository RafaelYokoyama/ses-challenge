import InfoBlocks from './components/info-blocks'
import UserForm from './components/user-form'

const UserNewPage = () => {
  return (
    <main className="lg:max-w-[1300px] mx-auto px-8 mb-10">
      <section className="mt-5">
        <h2 className="lg:text-2xl text-lg font-bold">Registro</h2>

        <InfoBlocks />
        <div className="mt-8">
          <UserForm />
        </div>
      </section>
    </main>
  )
}

export default UserNewPage
