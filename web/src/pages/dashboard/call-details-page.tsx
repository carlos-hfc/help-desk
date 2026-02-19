import { CheckCircleIcon, Clock2Icon } from "lucide-react"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { CallStatus } from "@/components/call-status"
import { PageTitle } from "@/components/page-title"

export function CallDetailsPage() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <PageTitle
        title="Chamado detalhado"
        hasBackButton
      >
        <Button variant="secondary">
          <Clock2Icon />
          Em atendimento
        </Button>
        <Button variant="secondary">
          <CheckCircleIcon />
          Encerrado
        </Button>
      </PageTitle>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 text-gray-200">
        <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-5 flex-1">
          <header className="font-bold">
            <div className="flex items-center justify-between">
              <span className="block text-gray-300 text-xs">0004</span>
              <CallStatus status="CLOSED" />
            </div>

            <h2>Backup nao funciona</h2>
          </header>

          <div>
            <span className="text-gray-400 font-bold text-xs">Descricao</span>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
              minus magni. Totam quae minus officiis ab porro autem enim culpa
              aliquid molestiae iste modi quia alias labore dolores, doloribus
              possimus.
            </p>
          </div>

          <div>
            <span className="text-gray-400 font-bold text-xs">Categoria</span>
            <p className="text-sm">Recuperacao de dados</p>
          </div>

          <div className="flex items-center justify-between gap-8">
            <div className="w-full">
              <span className="text-gray-400 font-bold text-xs">Criado em</span>
              <p className="text-sm">12/12/12 12:12</p>
            </div>
            <div className="w-full">
              <span className="text-gray-400 font-bold text-xs">
                Atualizado em
              </span>
              <p className="text-sm">12/12/12 12:12</p>
            </div>
          </div>

          <div>
            <span className="text-gray-400 font-bold text-xs mb-2 block">
              Cliente
            </span>
            <Avatar name="Carlos Faustino" />
          </div>
        </div>

        <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-8 h-full lg:w-72">
          <div>
            <span className="text-gray-400 font-bold text-xs mb-2 block">
              Tecnico responsavel
            </span>
            <Avatar
              name="Carlos Faustino"
              email="email@email.com"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2 text-xs">
              <span className="block text-gray-400 font-bold">Valores</span>
              <div className="flex justify-between">
                <p>Preco base</p>
                <p>R$ 200,00</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="block text-gray-400 font-bold">Adicionais</span>
              <div>
                <div className="flex justify-between">
                  <p>Preco base</p>
                  <p>R$ 200,00</p>
                </div>
                <div className="flex justify-between">
                  <p>Preco base</p>
                  <p>R$ 200,00</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-500 text-sm font-bold flex justify-between">
              <p>Total</p>
              <p>R$ 200,00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
