export default function SavedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Artigos Salvos
        </h1>
        <p className="text-gray-600 mb-8">
          Esta funcionalidade ainda não foi implementada.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            Em Desenvolvimento
          </h2>
          <p className="text-yellow-700">
            A funcionalidade de artigos salvos estará disponível em breve.
          </p>
        </div>
        <div className="mt-8">
          <a
            href="/user"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            ← Voltar para Usuários
          </a>
        </div>
      </div>
    </div>
  )
}
