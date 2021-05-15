import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import Editor from "@components/Editor"
import { ChakraProvider } from "@chakra-ui/react"
import { CanvasProvider } from "@components/Canvas"

import "focus-visible/dist/focus-visible"
import "./i18n/index"
import "./index.css"

ReactDOM.render(
  <CanvasProvider>
    <ChakraProvider>
      <Editor />
    </ChakraProvider>
  </CanvasProvider>,
  document.getElementById("root")
)

reportWebVitals()
