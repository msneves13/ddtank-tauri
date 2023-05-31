import { authService } from "@/core/services/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { Command } from "@tauri-apps/api/shell"
import { appWindow } from "@tauri-apps/api/window"
import to from "await-to-js"
import { LucideLogOut } from "lucide-react"
import { useState } from "react"
import Countdown, { CountdownRenderProps } from "react-countdown"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form"
import { Icons } from "@/app/components/ui/icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { toast } from "@/app/hooks/use-toast"
import { useAuth } from "@/app/providers/auth-provider"

const FormSchema = z.object({
  server: z.string({
    required_error: "Você precisa selecionar um servidor.",
  }),
})

export function ServerSelectionForm() {
  const { user, logout } = useAuth()
  const [isRunning, setIsRunning] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const renderer = ({ seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      appWindow.close()
      return <span>0</span>
    } else {
      return <span>{seconds}</span>
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isRunning) {
      return
    }

    setIsRunning(true)
    const [loadingError, loadingData] = await to(
      authService.loadingAuth(data.server)
    )

    if (loadingError) {
      toast({
        title: "Erro ao iniciar o jogo.",
        description: loadingError.message,
      })
      setIsRunning(false)
      return
    }

    const url = `https://ddtank4.com.br/flash/Loading.swf?user=${user.email}&key=${loadingData.token}&v=104&rand=${loadingData.time}&config=https://ddtank4.com.br/gameconfig/2.xml`

    console.log(url)
    const command = Command.sidecar("binaries/flash", [`--url=${url}`])

    await command.spawn()

    toast({
      title: "Bom jogo!",
      description: (
        <>
          O Launcher se fechará em{" "}
          <Countdown date={Date.now() + 5000} renderer={renderer} /> segundos.
        </>
      ),
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-4"
      >
        <FormField
          control={form.control}
          name="server"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o servidor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">S01 - Continente dos Heróis</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isRunning} type="submit">
          {isRunning && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Jogar
        </Button>
        <div className="flex flex-row gap-4">
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
          <Button
            className="w-full"
            variant={"outline"}
            disabled={isRunning}
            onClick={(event) => {
              event.preventDefault()
              logout()
            }}
          >
            <LucideLogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </form>
    </Form>
  )
}
