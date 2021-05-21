import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ButtonGroup,
  Input,
} from "@chakra-ui/react"
import styled from "styled-components"
import { Button } from "@chakra-ui/react"
import { useCanvasContext } from "../Canvas/hooks"
import logo from "@assets/images/logo-35.png"
import { saveCanvas } from "@services/api"

const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid rgba(57, 76, 96, 0.15);
  flex: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`

function Header() {
  const { canvas, formatSize } = useCanvasContext()
  const downloadImage = () => {
    const data = canvas?.toDataURL({ multiplier: 3 })
    if (data) {
      const a = document.createElement("a")
      a.href = data
      a.download = "drawing.png"
      a.click()
    }
  }

  const onSave = async () => {
    let base64 = btoa(JSON.stringify(canvas?.toJSON()))
    let baseParsed = `data:image/png;base64,${base64}`

    const savedJson = (await saveCanvas(baseParsed)) as any
  }

  return (
    <Container>
      <div>
        <ButtonGroup>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "2rem",
            }}
          >
            <img src={logo} alt="logo" />
          </div>
          <Menu>
            <MenuButton
              variant="outline"
              as={Button}
              leftIcon={
                <i style={{ fontSize: "16px" }} className="material-icons">
                  insert_drive_file
                </i>
              }
            >
              Dosya
            </MenuButton>
            <MenuList>
              <MenuItem>Tasarım alanını temizle</MenuItem>
              <MenuItem>Tasarımımı Kaydet</MenuItem>
              <MenuItem>Kaydedilen tasarımlarım</MenuItem>
              <MenuItem>Yeniden Boyutlandır</MenuItem>
              <MenuItem>Tasarımımı indir</MenuItem>
              <MenuItem>Yardım</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              onClick={onSave}
              variant="outline"
              as={Button}
              leftIcon={
                <i style={{ fontSize: "16px" }} className="material-icons">
                  save
                </i>
              }
            >
              Tasarımı Kaydet
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "140px 100px",
          alignItems: "center",
        }}
      >
        <Input size={"sm"} placeholder="Template name" />
        <div
          style={{
            paddingLeft: "1rem",
            fontSize: "0.9rem",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          {formatSize.height}x{formatSize.width}
        </div>
      </div>
      <ButtonGroup>
        <Menu>
          <MenuButton
            variant="outline"
            as={Button}
            leftIcon={
              <i style={{ fontSize: "16px" }} className="material-icons">
                share
              </i>
            }
          >
            &nbsp;Paylaş
          </MenuButton>
          <MenuList>
            <MenuItem>Facebook'da paylaş</MenuItem>
            <MenuItem>Twitter'da Paylaş</MenuItem>
            <MenuItem>Instagram'da Paylaş</MenuItem>
            <MenuItem>Pinterest'de Paylaş</MenuItem>
            <MenuItem>Linkedin'de Paylaş</MenuItem>
          </MenuList>
        </Menu>
        <Button
          variant="outline"
          leftIcon={
            <i style={{ fontSize: "16px" }} className="material-icons">
              cloud_download
            </i>
          }
          onClick={downloadImage}
        >
          {" "}
          &nbsp;İndir
        </Button>

        <Button
          leftIcon={
            <i
              style={{ fontSize: "16px" }}
              className="material-icons md-16 spanicon"
            >
              stars
            </i>
          }
          colorScheme="red"
          onClick={downloadImage}
        >
          &nbsp;YÜKSELT
        </Button>
      </ButtonGroup>
    </Container>
  )
}

export default Header
