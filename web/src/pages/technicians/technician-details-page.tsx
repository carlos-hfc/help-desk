import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { PageTitle } from "@/components/page-title"
import { TagTime } from "@/components/tag-time"
import { hours } from "@/utils/hours"

export function TechnicianDetailsPage() {
  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
      <PageTitle
        title="Perfil de técnico"
        hasBackButton
      >
        <Button variant="secondary">Cancelar</Button>
        <Button>Salvar</Button>
      </PageTitle>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 text-gray-200">
        <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-5 h-full lg:w-72">
          <header className="space-y-1">
            <h2 className="font-bold">Dados pessoais</h2>
            <span className="text-gray-300 text-xs">
              Defina as informações do perfil de técnico
            </span>
          </header>

          <div className="space-y-4">
            <div className="rounded-full bg-blue-dark size-12 text-gray-600 content-center text-center text-xl">
              CF
            </div>

            <Input
              label="Nome"
              placeholder="Nome completo"
            />

            <Input
              label="E-mail"
              placeholder="exemplo@email.com"
            />
          </div>
        </div>

        <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-5 h-full flex-1">
          <header className="space-y-1">
            <h2 className="font-bold">Horários de atendimento</h2>
            <span className="text-gray-300 text-xs">
              Selecione os horários de disponibilidade do técnico para
              atendimento
            </span>
          </header>

          <div className="flex flex-wrap gap-2">
            {hours.map((hour, i) => (
              <TagTime
                key={hour}
                selected={i % 5 === 0}
              >
                {hour}
              </TagTime>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
