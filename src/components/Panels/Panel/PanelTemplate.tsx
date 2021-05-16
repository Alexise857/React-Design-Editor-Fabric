import { useState } from "react"
import { useSelector } from "react-redux"
import { Scrollbars } from "react-custom-scrollbars"
import { useCoreHandler } from "@components/Canvas/handlers"
import { Input } from "@chakra-ui/react"
import { selectTemplates } from "@store/reducers/templates/selectors"
import { getTemplateObject } from "@services/api"
import PanelContainer from "@components/ScrollContainer"

function PanelTemplate() {
  const [query, setQuery] = useState("")
  const handleChange = (event: any) => setQuery(event.target.value)
  const templates = useSelector(selectTemplates)
  const { importTemplate } = useCoreHandler()

  const addTemplateToCanvas = async (template: any, path: string) => {
    const [options, canvasJSON] = (await getTemplateObject(
      template,
      path
    )) as any
    importTemplate({ options, canvasJSON })
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
              placeholder="Search text"
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
          {templates.map((template) => (
            <div
              key={template.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 0 1rem 0",
              }}
              onClick={() => addTemplateToCanvas(template.id, template.path)}
            >
              <img src={template.image} />
            </div>
          ))}
        </div>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelTemplate
