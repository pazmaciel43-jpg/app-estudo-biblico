'use client';

import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Meu Estudo Bíblico
          </h1>
          <p className="text-gray-600">Gere esboços profundos com contexto, aplicação e ilustrações.</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-10 flex gap-3">
          <input
            className="flex-1 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none text-black"
            value={input}
            placeholder="Digite a passagem bíblica (Ex: Romanos 8:1-11)"
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Gerando...' : 'Estudar Texto'}
          </button>
        </form>

        <div className="space-y-8">
          {messages.filter(m => m.role !== 'user').map(m => (
            <div key={m.id} className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <div className="prose prose-blue max-w-none text-gray-800">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
