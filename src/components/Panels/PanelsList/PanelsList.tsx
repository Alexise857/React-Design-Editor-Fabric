import { styled } from "baseui"
import { useState } from "react"
import ClosePanel from "./ClosePanel"

interface Props {
  collapse: boolean
}
const Container = styled("div", ({ collapse }: Props) => ({
  width: collapse ? "360px" : "0px",
  transition: "width 0.4s",
  background: "#29303a",
  position: "relative",
}))

function PanelsList() {
  const [collapse, setCollapse] = useState(true)
  return (
    <Container collapse={collapse}>
      <ClosePanel closePanel={() => setCollapse(!collapse)} />
    </Container>
  )
}

export default PanelsList
