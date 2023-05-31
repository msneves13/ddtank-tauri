import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas"
import { memo } from "react"

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
