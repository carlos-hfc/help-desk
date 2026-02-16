import { useNavigate } from "react-router"

import { Button } from "@/components/button"
import { Input } from "@/components/input"

export function Login() {
  const navigate = useNavigate()

  return (
    <>
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
            onClick={() => navigate("/auth/sign-up")}
          >
            Criar conta
          </Button>
        </div>
      </div>
    </>
  )
}
