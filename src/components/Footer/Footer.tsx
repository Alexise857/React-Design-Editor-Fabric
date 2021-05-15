import styled from "styled-components"
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react"
import { useCanvasContext } from "../Canvas/hooks"
import { useEffect, useState } from "react"

const Container = styled.div`
  height: 64px;
  background: #ffffff;
  border-top: 1px solid rgba(57, 76, 96, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`

interface Option {
  zoomValue: number
}
function Footer() {
  const [option, setOption] = useState<Option>({ zoomValue: 40 })
  const { zoomRatio, setZoomRatio } = useCanvasContext()

  const updateOptions = (key: string, value: number) => {
    setOption({ ...option, [key]: value })
  }

  useEffect(() => {
    updateOptions("zoomValue", zoomRatio * 100)
  }, [zoomRatio])

  const onSlideChange = (value: number) => {
    setZoomRatio(value / 100)
  }
  const zoomString = parseFloat(option.zoomValue.toFixed(2))
  return (
    <Container>
      <div>
        <ButtonGroup variant="outline" spacing="4">
          <IconButton
            variant="outline"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<i className="material-icons">chevron_left</i>}
          />
          <IconButton
            variant="outline"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<i className="material-icons">chevron_right</i>}
          />
        </ButtonGroup>
      </div>
      <div>
        <div
          style={{
            width: "240px",
            display: "grid",
            gridTemplateColumns: "1fr 60px",
          }}
        >
          <Slider
            min={0}
            max={300}
            value={option.zoomValue}
            onChange={(e) => onSlideChange(e)}
            colorScheme="gray"
            defaultValue={option.zoomValue}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb
              boxSize={4}
              style={{
                background: "#333",
                border: "1.8px solid #fff",
              }}
            />
          </Slider>
          <div style={{ paddingLeft: "1rem" }}>{zoomString}%</div>
        </div>
      </div>
    </Container>
  )
}

export default Footer
