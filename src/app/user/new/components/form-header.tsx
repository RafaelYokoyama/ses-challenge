'use client'

interface FormHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

const FormHeader = ({ title, subtitle, className = '' }: FormHeaderProps) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <h2 className="text-lg font-semibold text-[#919191]">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  )
}
export default FormHeader
