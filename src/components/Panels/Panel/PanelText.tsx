import { useState } from "react"
import { useSelector } from "react-redux"
import { Scrollbars } from "react-custom-scrollbars"
import { selectTextStyles } from "@store/reducers/text-style/selectors"
import { useCoreHandler } from "@components/Canvas/handlers"
import { Input } from "@chakra-ui/react"
import styled from "styled-components"
import PanelContainer from "@components/ScrollContainer"

const BaseText = styled.div`
  background: rgba(255, 255, 255, 0.1);
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  cursor: pointer;
  transition: background 0.4s;
  font-family: "Lexend";
`

const HeadingText = styled(BaseText)`
  font-weight: 700;
  font-size: 1.66rem;
`
const SubHeadingText = styled(BaseText)`
  background: rgba(255, 255, 255, 0.1);
  font-size: 1.12rem;
  font-weight: 500;
`
const BodyText = styled(BaseText)`
  background: rgba(255, 255, 255, 0.1);
  font-size: 0.76rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
`

const TextLabel = styled.div`
  font-weight: 600;
  padding: 0.8rem 0;
  font-size: 0.84rem;
  padding: 1rem 2rem 0;
  font-family: "Lexend";
`
function PanelText() {
  const [query, setQuery] = useState("")
  const handleChange = (event: any) => setQuery(event.target.value)
  const textStyles = useSelector(selectTextStyles)
  const { addObject } = useCoreHandler()

  const addTextToCanvas = (json: string) => {
    if (!json) return false
    const data = JSON.parse(json)
    let options = {
      type: data.type,
      text: data.text,
      fontSize: data.fontSize,
      fontWeight: data.fontWeight,
      fontFamily: data.fontFamily,
      textAlign: data.textAlign,
      fill: data.fill,
      width: data.width,
      height: data.height,
      left: 450,
      top: 220,
      shadow: data.shadow,
    }
    addObject(options)
  }
  const textBaseOptions = {
    type: "textbox",
    width: 320,
    fontFamily: "Lexend",
    textAlign: "center",
  }
  const addHeading = () => {
    const options = {
      ...textBaseOptions,
      fontWeight: 700,
      text: "Add a heading",
      fontSize: 32,
    }
    addObject(options)
  }

  const addSubheading = () => {
    const options = {
      ...textBaseOptions,
      fontSize: 24,
      text: "Add a subheading",
      fontWeight: 500,
    }
    addObject(options)
  }

  const addTextBody = () => {
    const options = {
      ...textBaseOptions,
      text: "Add a little bit of body text",
      fontSize: 18,
      fontWeight: 300,
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
              placeholder="Search text"
            />
          </div>
        </div>
        <TextLabel>Click text to add to page</TextLabel>

        <div style={{ display: "grid", gap: "0.6rem", padding: "1rem 2rem 0" }}>
          <HeadingText
            onClick={addHeading}
            className="add-text-item add-heading"
          >
            Add a heading
          </HeadingText>
          <SubHeadingText
            onClick={addSubheading}
            className="add-text-item add-subheading"
          >
            Add a subheading
          </SubHeadingText>
          <BodyText
            onClick={addTextBody}
            className="add-text-item add-body-text"
          >
            Add a litle bit of body text
          </BodyText>
        </div>
        <TextLabel>Popular items</TextLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          {textStyles.map((textStyle) => (
            <div
              key={textStyle.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 0 1rem 0",
              }}
              onClick={() => addTextToCanvas(textStyle.json)}
            >
              <img src={textStyle.svg} />
            </div>
          ))}
        </div>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelText
