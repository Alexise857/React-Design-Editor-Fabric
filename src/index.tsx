import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import Editor from "@components/Editor"
import { ChakraProvider } from "@chakra-ui/react"

import "./i18n/index"
import "./index.css"
import { CanvasProvider } from "./contexts/canvas"

ReactDOM.render(
  <CanvasProvider>
    <ChakraProvider>
      <Editor />
    </ChakraProvider>
  </CanvasProvider>,
  document.getElementById("root")
)

reportWebVitals()
