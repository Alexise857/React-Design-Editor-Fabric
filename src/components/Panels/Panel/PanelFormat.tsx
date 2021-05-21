import { useState } from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { Input } from "@chakra-ui/react"
import PanelContainer from "../../ScrollContainer/ScrollContainer"
import useCoreHandler from "@/components/Canvas/handlers/useCoreHandler"
import { useCanvasContext } from "@/components/Canvas/hooks"

interface Format {
  id: number
  height: number
  width: number
  name: string
}
const formats: Format[] = [
  {
    id: 1,
    height: 600,
    width: 400,
    name: "600 x 400",
  },
  {
    id: 2,
    height: 800,
    width: 400,
    name: "800 x 400",
  },
  {
    id: 3,
    height: 900,
    width: 1600,
    name: "900 x 1600",
  },
  {
    id: 4,
    height: 300,
    width: 200,
    name: "300 x 200",
  },
  {
    id: 5,
    height: 500,
    width: 500,
    name: "500 x 500",
  },
]
function PanelFormat() {
  const [query, setQuery] = useState("")
  const { canvas } = useCanvasContext()
  const handleChange = (event: any) => setQuery(event.target.value)
  const { updateFormatSize, calculateZoomFitRatio } = useCoreHandler()

  const loadFormat = (format: Format) => {
    canvas?.clear()
    canvas?.setBackgroundColor("#fff", () => {
      canvas.requestRenderAll()
    })
    const zoomRatio = calculateZoomFitRatio({
      width: format.width,
      height: format.height,
    })
    updateFormatSize({
      width: format.width,
      height: format.height,
      zoomRatio: zoomRatio,
    })
    canvas?.requestRenderAll()
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
              placeholder="Search format"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "2rem",
            flexDirection: "column",
          }}
        >
          {formats.map((format) => (
            <div
              key={format.id}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                flexDirection: "column",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  height: 120,
                  width: "100%",
                  background: "rgba(255,255,255,0.3)",
                }}
                onClick={() => loadFormat(format)}
              ></div>
              <div
                style={{ paddingTop: "1rem", color: "rgba(255,255,255,0.8)" }}
              >
                {format.name}
              </div>
            </div>
          ))}
        </div>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelFormat
