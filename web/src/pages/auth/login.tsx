import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import z from "zod"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { useAuth } from "@/contexts/auth"
import { signIn } from "@/http/sign-in"

const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().nonempty("Senha é obrigatória"),
})

type SignInSchema = z.infer<typeof signInSchema>

export function Login() {
  const navigate = useNavigate()

  const { save } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  async function handleSignIn({ email, password }: SignInSchema) {
    const { role } = await signIn({
      email,
      password,
    })

    save(role)
    navigate("/", { replace: true })
  }

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="border border-gray-500 rounded-lg p-6 lg:p-7 flex flex-col gap-4"
        >
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
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />

          <Button
            className="mt-6"
            disabled={isSubmitting}
          >
            Entrar
          </Button>

          <p className="text-sm text-center">
            Você é técnico e é o seu primeiro acesso?{" "}
            <Link
              to="/"
              className="text-blue-base hover:text-blue-dark transition hover:underline underline-offset-2"
            >
              Clique aqui
            </Link>
          </p>
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
