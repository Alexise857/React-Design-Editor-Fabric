import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import Editor from "@components/Editor"
import { ChakraProvider } from "@chakra-ui/react"
import { CanvasProvider } from "@components/Canvas"
import store from "@/store/store"
import { Provider } from "react-redux"

import "focus-visible/dist/focus-visible"
import "./i18n/index"
import "./index.css"

ReactDOM.render(
  <Provider store={store}>
    <CanvasProvider>
      <ChakraProvider>
        <Editor />
      </ChakraProvider>
    </CanvasProvider>
  </Provider>,
  document.getElementById("root")
)

reportWebVitals()
