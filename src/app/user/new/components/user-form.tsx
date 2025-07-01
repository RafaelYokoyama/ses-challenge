'use client'

import { useUserForm } from '@/hooks/useUserForm'
import { FloatingInput, CheckboxGroup } from '@/components'
import FormActions from './form-actions'
import FormHeader from './form-header'

const UserForm = () => {
  const { form, onSubmit, daysOfWeek } = useUserForm()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
    trigger,
  } = form

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <FormHeader title="REGISTRO" />

        <div className="grid lg:grid-cols-2 lg:gap-6 gap-8 w-full mt-8">
          <div className="space-y-8 lg:space-y-12">
            <FloatingInput
              type="text"
              label="Nome de usuário"
              required
              {...register('username')}
              error={errors.username}
            />

            <FloatingInput
              type="text"
              label="Nome completo"
              required
              {...register('name')}
              error={errors.name}
            />

            <FloatingInput
              type="email"
              label="E-mail"
              required
              {...register('email')}
              error={errors.email}
            />
          </div>

          <div className="space-y-8 lg:space-y-12">
            <FloatingInput
              type="text"
              label="Cidade"
              required
              {...register('city')}
              error={errors.city}
            />

            <CheckboxGroup
              label="DIAS DA SEMANA"
              options={daysOfWeek}
              name="days"
              register={register}
              control={control}
              setValue={setValue}
              trigger={trigger}
              error={errors.days}
            />
          </div>
        </div>

        <FormActions isSubmitting={isSubmitting} onCancel={() => reset()} />
      </form>
    </div>
  )
}

export default UserForm
