import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import z from "zod"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { createPassword } from "@/http/create-password"

const createPasswordSchema = z
  .object({
    email: z.email("E-mail inválido"),
    password: z
      .string("A senha é obrigatória")
      .min(6, "A senha deve conter pelo menos 6 caracteres"),
    confirmPassword: z.string("A confirmação de senha é obrigatória"),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "As senhas não correspondem",
  })

type CreatePasswordSchema = z.infer<typeof createPasswordSchema>

export function CreatePassword() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreatePasswordSchema>({
    resolver: zodResolver(createPasswordSchema),
  })

  const { mutateAsync: createPasswordFn } = useMutation({
    mutationFn: createPassword,
    onSuccess(_, { email }) {
      toast.success("Senha criada com sucesso", {
        action: {
          label: "Login",
          onClick: () => navigate(`/auth/sign-in?email=${email}`),
        },
      })

      reset()
    },
    onError() {
      toast.error("Erro ao criar a senha")
    },
  })

  async function handleCreatePassword({
    email,
    password,
  }: CreatePasswordSchema) {
    await createPasswordFn({ email, password })
  }

  return (
    <>
      <div className="grid gap-3 w-full">
        <form
          onSubmit={handleSubmit(handleCreatePassword)}
          className="border border-gray-500 rounded-lg p-6 lg:p-7 grid gap-4"
        >
          <header className="grid gap-0.5 mb-6">
            <h1 className="font-bold text-xl">Defina a sua senha</h1>
            <p className="text-gray-300 text-xs">
              Informe a nova senha e confirme-a
            </p>
          </header>

          <Input
            label="E-mail"
            placeholder="exemplo@email.com"
            type="email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Senha"
            placeholder="Defina a sua senha"
            type="password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register("password")}
          />

          <Input
            label="Confirmar senha"
            placeholder="Confirme a sua senha"
            type="password"
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button
            className="mt-6"
            disabled={isSubmitting}
          >
            Criar senha
          </Button>
        </form>
      </div>
    </>
  )
}
