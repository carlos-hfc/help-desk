import logoDark from "@/assets/logo-dark.png"
import { Button } from "@/components/button"
import { Input } from "@/components/input"

export function Login() {
  return (
    <div className="h-dvh py-8 lg:py-12 px-6 lg:px-0 flex flex-col gap-6 lg:gap-8 lg:max-w-100 w-full mx-auto">
      <div className="flex items-center justify-center gap-3">
        <img
          src={logoDark}
          alt="HelpDesk"
          className="size-10 shrink-0"
        />

        <span className="text-blue-dark font-bold text-2xl">HelpDesk</span>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <form className="border border-gray-500 rounded-lg p-6 lg:p-7 flex flex-col gap-4">
          <header className="flex flex-col gap-0.5 mb-6">
            <h1 className="text-gray-200 font-bold text-xl">Acesse o portal</h1>
            <p className="text-gray-300 text-xs">
              Entre usando seu e-mail e senha cadastrados
            </p>
          </header>

          <Input
            label="E-mail"
            type="email"
            placeholder="exemplo@email.com"
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
          />

          <Button className="mt-6">Entrar</Button>
        </form>

        <div className="border border-gray-500 rounded-lg p-6 lg:p-7">
          <header className="flex flex-col gap-0.5 mb-6">
            <h2 className="text-gray-200 font-bold text-xl">
              Ainda não tem uma conta?
            </h2>
            <p className="text-gray-300 text-xs">Cadastre agora mesmo</p>
          </header>

          <Button
            variant="secondary"
            className="w-full"
          >
            Criar conta
          </Button>
        </div>
      </div>
    </div>
  )
}
