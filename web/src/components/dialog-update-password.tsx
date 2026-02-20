import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { ArrowLeftIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

import { updateProfile } from "@/http/update-profile"

import { Button } from "./button"
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { Input } from "./input"

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(6, "A senha atual contém 6 caracteres"),
  newPassword: z.string().min(6, "A nova senha deve conter 6 caracteres"),
})

type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>

interface DialogUpdatePasswordProps {
  setOpen(open: boolean): void
}

export function DialogUpdatePassword({ setOpen }: DialogUpdatePasswordProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess() {
      toast.success("Senha atualizada com sucesso")
      setOpen(false)
      reset()
    },
    onError() {
      toast.error(
        "Erro ao atualizar senha. Verifique a senha atual e a nova senha e tente novamente",
      )
    },
  })

  async function handleUpdatePassword({
    newPassword,
    currentPassword,
  }: UpdatePasswordSchema) {
    await updateProfileFn({
      password: newPassword,
      currentPassword,
    })
  }

  return (
    <DialogContent
      asChild
      aria-describedby={undefined}
    >
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <DialogHeader>
          <DialogClose asChild>
            <Button
              type="button"
              icon
              variant="link"
            >
              <ArrowLeftIcon />
            </Button>
          </DialogClose>

          <DialogTitle>Alterar senha</DialogTitle>
        </DialogHeader>

        <DialogBody className="grid gap-5">
          <Input
            label="Senha atual"
            type="password"
            placeholder="Digite sua senha atual"
            error={Boolean(errors.currentPassword)}
            helperText={
              errors.currentPassword?.message ?? "Mínimo de 6 dígitos"
            }
            {...register("currentPassword")}
          />

          <Input
            label="Nova senha"
            type="password"
            placeholder="Digite sua nova senha"
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword?.message ?? "Mínimo de 6 dígitos"}
            {...register("newPassword")}
          />
        </DialogBody>

        <DialogFooter>
          <Button disabled={isSubmitting}>Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
