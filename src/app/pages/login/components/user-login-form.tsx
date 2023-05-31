import * as React from "react"
import { authService } from "@/core/services/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { open } from "@tauri-apps/api/shell"
import to from "await-to-js"
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

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string().email({
    message: "E-mail inválido.",
  }),
  password: z.string().nonempty({
    message: "Campo obrigatório.",
  }),
})

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema.required()),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const [loginError, loggedUser] = await to(authService.login(values))

    if (loginError) {
      toast({
        title: "Erro no login.",
        description: loginError.message,
      })

      setIsLoading(false)

      return
    }

    login(loggedUser!, values.email)

    setIsLoading(false)
  }

  const handleRegisterButton = () => {
    navigate("/register")
  }

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className={"grid gap-4"}>
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
            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Entrar
            </Button>
            <Button
              variant={"discord"}
              className="w-full"
              onClick={(event) => {
                event.preventDefault()
                open("https://discord.gg/WVxyJJEwPr")
              }}
            >
              <Icons.discord className="mr-2 h-4 w-4" />
              Discord
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Não tem uma conta?
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" onClick={handleRegisterButton}>
        Criar conta
      </Button>
    </div>
  )
}
