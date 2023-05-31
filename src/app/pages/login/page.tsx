import { UserLoginForm } from "./components/user-login-form"

export default function LoginPage() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail e sua senha nos campos abaixo.
          </p>
        </div>
        <UserLoginForm />
      </div>
    </div>
  )
}
