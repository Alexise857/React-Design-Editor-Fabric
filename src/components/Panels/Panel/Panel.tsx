import styled from "styled-components"
import { useState } from "react"
import ClosePanel from "./ClosePanel"
import Panels from "./Panels"

interface ContainerProps {
  collapse: boolean
}
const Container = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  background: #29303a;
  transition: width 0.4s;
  width: ${(props) => (props.collapse ? "370px" : "0px")};
`
interface Props {
  activeTab: string
}
function PanelsList({ activeTab }: Props) {
  const [collapse, setCollapse] = useState(true)

  return (
    <Container collapse={collapse}>
      <ClosePanel closePanel={() => setCollapse(!collapse)} />
      {Panels[activeTab as "formats"]}
    </Container>
  )
}

export default PanelsList
