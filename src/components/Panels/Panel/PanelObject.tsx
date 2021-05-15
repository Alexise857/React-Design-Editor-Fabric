import { useState } from "react"
import { objects } from "@constants/objects"
import { Scrollbars } from "react-custom-scrollbars"
import { Input } from "@chakra-ui/react"
import PanelContainer from "./PanelContainer"
import useCoreHandler from "@/handlers/useCoreHandler"

function PanelObject() {
  const [query, setQuery] = useState("")
  const handleChange = (event: any) => setQuery(event.target.value)
  const { addObject } = useCoreHandler()

  const addObjectToCanvas = (pathString: string) => {
    const options = {
      path: pathString,
      type: "path",
    }
    addObject(options)
  }

  return (
    <PanelContainer>
      <Scrollbars autoHide>
        <div
          style={{
            padding: "2rem 2rem 0",
          }}
        >
          <div
            style={{
              backgroundColor: "rebeccapurple",
              display: "block",
            }}
          >
            <Input
              color="#333"
              background="#fff"
              value={query}
              onChange={handleChange}
              placeholder="Search objects"
            />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          {objects.map((object) => (
            <div key={object.id} onClick={() => addObjectToCanvas(object.path)}>
              <img src={object.preview} alt="preview" />
            </div>
          ))}
        </div>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelObject
