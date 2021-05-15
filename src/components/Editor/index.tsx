import styled from "styled-components"
import Header from "@components/Header"
import Panels from "@components/Panels"
import Menu from "@components/Menu"
import Canvas from "@components/Canvas"
import Footer from "@components/Footer"
import { AppDispatch } from "@store/store"
import { useDispatch } from "react-redux"
import { getTextStyles } from "@store/reducers/text-style/thunks"
import { getTemplates } from "@store/reducers/templates/thunks"
import WebFont from "webfontloader"

import {
  getWordArtCategories,
  getWordArts,
  getWordArtSubcategories,
} from "@store/reducers/wordarts/thunks"
import { useEffect, useState } from "react"

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
`

const SectionOne = styled.div`
  flex: 1;
  display: flex;
  background: #ecf0f1;
`

const SectionThree = styled.div`
  flex: 1;
  display: flex;
  background: #ecf0f1;
  flex-direction: column;
`

function Editor() {
  const [loading] = useState(false)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getTextStyles())
    dispatch(getTemplates())
    dispatch(getWordArts())
    dispatch(getWordArtCategories())
    dispatch(getWordArtSubcategories())
    WebFont.load({
      google: {
        families: [
          "Satisfy",
          "VT323",
          "Pacifico",
          "Quicksand",
          "Inconsolata",
          "Montserrat",
          "Lobster",
          "Dancing Script",
          "New Tegomin",
          "Train One",
        ],
      },
    })
  }, [])

  return (
    <Container>
      <Header />
      <SectionOne>
        <Panels />
        <SectionThree>
          <Menu />
          <Canvas />
          <Footer />
        </SectionThree>
      </SectionOne>
    </Container>
  )
}

export default Editor
