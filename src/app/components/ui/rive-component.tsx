import { memo } from "react"
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas"

export const RiveComponent = memo(() => {
  const { RiveComponent } = useRive({
    src: "/mouse_tracking.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  })

  return <RiveComponent />
})
