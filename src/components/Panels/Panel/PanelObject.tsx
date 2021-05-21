import { useState } from "react"
import { objects } from "@constants/objects"
import { Scrollbars } from "react-custom-scrollbars"
import { Input } from "@chakra-ui/react"
import PanelContainer from "../../ScrollContainer/ScrollContainer"
import useCoreHandler from "@/components/Canvas/handlers/useCoreHandler"

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

  const isFiltered = (element: string) => {
    const ele = element.toLowerCase()
    const res = query.toLowerCase()
    return ele.includes(res) || ele === res
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
          {objects
            .filter((object) => isFiltered(object.name))
            .map((object) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 0 1rem 0",
                }}
                key={object.id}
                onClick={() => addObjectToCanvas(object.path)}
              >
                <img
                  style={{ maxHeight: "90px", maxWidth: "100px" }}
                  src={object.preview}
                  alt="preview"
                />
              </div>
            ))}
        </div>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelObject
