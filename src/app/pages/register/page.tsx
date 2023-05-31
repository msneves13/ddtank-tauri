import { UserRegisterForm } from "./components/user-register-form"

export default function RegisterPage() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
          <p className="text-sm text-muted-foreground">
            Preencha os campos abaixo para criar sua conta.
          </p>
        </div>
        <UserRegisterForm />
      </div>
    </div>
  )
}
