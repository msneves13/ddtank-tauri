import { RiveComponent } from "@/app/components/ui/rive-component"
import { cn } from "@/app/libs/utils"
import { ThemeProvider } from "@/app/providers/theme-provider"

interface Props {
  children: JSX.Element
}

export default function Layout({ children }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="h-screen overflow-clip">
        <div
          className={cn(
            "h-screen overflow-auto bg-background",
            "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
          )}
        >
          <div className="container relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
              <div className="absolute inset-0 bg-cover">
                <RiveComponent></RiveComponent>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
