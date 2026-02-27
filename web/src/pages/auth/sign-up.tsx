import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import z from "zod"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { signUp } from "@/http/sign-up"

const signUpSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  password: z
    .string("Senha é obrigatória")
    .min(6, "A senha deve conter pelo menos 6 caracteres"),
})

type SignUpSchema = z.infer<typeof signUpSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
    onSuccess(_, { email }) {
      toast.success("Conta criada com sucesso", {
        action: {
          label: "Login",
          onClick: () => navigate(`/auth/sign-in?email=${email}`),
        },
      })

      reset()
    },
    onError() {
      toast.error("Erro ao criar a sua conta")
    },
  })

  async function handleSignUp({ email, name, password }: SignUpSchema) {
    await signUpFn({ email, name, password })
  }

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="border border-gray-500 rounded-lg p-6 lg:p-7 flex flex-col gap-4"
        >
          <header className="flex flex-col gap-0.5 mb-6">
            <h1 className="text-gray-200 font-bold text-xl">Crie sua conta</h1>
            <p className="text-gray-300 text-xs">
              Informe seu nome, e-mail e senha
            </p>
          </header>

          <Input
            label="Nome"
            placeholder="Digite o nome completo"
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="E-mail"
            type="email"
            placeholder="exemplo@email.com"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message ?? "Mínimo de 6 dígitos"}
            {...register("password")}
          />

          <Button
            className="mt-6"
            disabled={isSubmitting}
          >
            Cadastrar
          </Button>
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
