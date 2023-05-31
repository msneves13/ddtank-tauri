import { authService } from "@/core/services/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import to from "await-to-js"
import * as React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"

import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Icons } from "@/app/components/ui/icons"
import { Input } from "@/app/components/ui/input"
import { toast } from "@/app/hooks/use-toast"
import { cn } from "@/app/libs/utils"
import { useAuth } from "@/app/providers/auth-provider"

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z
  .object({
    name: z.string().nonempty({
      message: "Campo obrigatório.",
    }),
    email: z.string().email({
      message: "E-mail inválido.",
    }),
    password: z.string().nonempty({
      message: "Campo obrigatório.",
    }),
    confirm_password: z.string().nonempty({
      message: "Campo obrigatório.",
    }),
    code: z.string().nonempty({
      message: "Campo obrigatório.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem.",
    path: ["confirm_password"],
  })

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      code: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const [registerError, registeredUser] = await to(
      authService.register(values)
    )

    if (registerError) {
      toast({
        title: "Erro no registro.",
        description: registerError.message,
      })
      setIsLoading(false)

      return
    }
    login(registeredUser!, values.email)

    setIsLoading(false)
  }

  const handleLoginButton = () => {
    navigate("/login")
  }

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div
            className="space-8 grid h-64 gap-4 overflow-auto"
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              width: "calc(100% + 32px)",
              left: -10,
              position: "relative",
            }}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu nome"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="name"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nome@exemplo.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a sua senha"
                      type="password"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirme a sua senha"
                      type="password"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de convite</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o seu código de convite"
                      type="text"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Criar conta
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Já possui uma conta?
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" onClick={handleLoginButton}>
        Entrar
      </Button>
    </div>
  )
}
