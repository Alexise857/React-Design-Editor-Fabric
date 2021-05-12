import { styled } from "baseui"
import Header from "@components/Header"
import Panels from "@components/Panels"
import Menu from "@components/Menu"
import Canvas from "@components/Canvas"

const Container = styled("div", {
  display: "flex",
  height: "100vh",
  width: "100vw",
  flexDirection: "column",
})

const SectionOne = styled("div", {
  flex: 1,
  display: "flex",
  background: "#ecf0f1",
})

const SectionThree = styled("div", {
  flex: 1,
  display: "flex",
  background: "#ecf0f1",
  flexDirection: "column",
})

function Editor() {
  return (
    <Container>
      <Header />
      <SectionOne>
        <Panels />
        <SectionThree>
          <Menu />
          <Canvas />
        </SectionThree>
      </SectionOne>
    </Container>
  )
}

export default Editor