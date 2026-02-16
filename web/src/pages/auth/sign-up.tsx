import { useNavigate } from "react-router"

import { Button } from "@/components/button"
import { Input } from "@/components/input"

export function SignUp() {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <form className="border border-gray-500 rounded-lg p-6 lg:p-7 flex flex-col gap-4">
          <header className="flex flex-col gap-0.5 mb-6">
            <h1 className="text-gray-200 font-bold text-xl">Crie sua conta</h1>
            <p className="text-gray-300 text-xs">
              Informe seu nome, e-mail e senha
            </p>
          </header>

          <Input
            label="Nome"
            placeholder="Digite o nome completo"
          />

          <Input
            label="E-mail"
            type="email"
            placeholder="exemplo@email.com"
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            helperText="Mínimo de 6 dígitos"
          />

          <Button className="mt-6">Cadastrar</Button>
        </form>

        <div className="border border-gray-500 rounded-lg p-6 lg:p-7">
          <header className="flex flex-col gap-0.5 mb-6">
            <h2 className="text-gray-200 font-bold text-xl">
              Já tem uma conta?
            </h2>
            <p className="text-gray-300 text-xs">Entre agora mesmo</p>
          </header>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate("/auth/sign-in")}
          >
            Acessar conta
          </Button>
        </div>
      </div>
    </>
  )
}
