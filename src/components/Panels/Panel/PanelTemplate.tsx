import { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { Scrollbars } from "react-custom-scrollbars"
import { useCoreHandler } from "@components/Canvas/handlers"
import { Input } from "@chakra-ui/react"
import { selectTemplates } from "@store/reducers/templates/selectors"
import { getTemplateObject } from "@services/api"
import PanelContainer from "@components/ScrollContainer"
import { fabric } from "fabric"
import { useCanvasContext } from "@/components/Canvas/hooks"

function PanelTemplate() {
  const [query, setQuery] = useState("")
  const inputFile = useRef<HTMLInputElement>(null)
  const handleChange = (event: any) => setQuery(event.target.value)
  const templates = useSelector(selectTemplates)
  const { importTemplate, calculateZoomFitRatio, updateFormatSize } =
    useCoreHandler()
  const { canvas } = useCanvasContext()
  const addTemplateToCanvas = async (template: any, path: string) => {
    const [options, canvasJSON] = (await getTemplateObject(
      template,
      path
    )) as any
    importTemplate({ options, canvasJSON })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = URL.createObjectURL(e.target.files![0])
    //@ts-ignore
    loadSVGImage(url)
  }

  const loadSVGImage = (url: string) => {
    fabric.loadSVGFromURL(url, (objects, options) => {
      canvas?.clear()
      const zoomRatio = calculateZoomFitRatio({
        width: options.width,
        height: options.height,
      })
      updateFormatSize({
        width: options.width,
        height: options.height,
        zoomRatio: zoomRatio,
      })

      objects.forEach((object) => {
        canvas?.add(object)
      })
      canvas?.requestRenderAll()
    })
  }

  const onButtonClick = () => {
    inputFile.current?.click()
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
              placeholder="Search templates"
            />
          </div>
        </div>
        <div
          style={{
            padding: "0.8rem 2rem 0",
          }}
        >
          <div
            style={{
              margin: "1rem 0 0",
              border: "1px solid rgba(255,255,255,0.6)",
              padding: "0.5rem",
              cursor: "pointer",
              color: "rgba(255,255,255,0.8)",
            }}
            onClick={onButtonClick}
            className="import-button"
          >
            Import SVG Format
          </div>
          <input
            onChange={handleFileInput}
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          {templates
            .filter((template) => isFiltered(template.name))
            .map((template) => (
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
