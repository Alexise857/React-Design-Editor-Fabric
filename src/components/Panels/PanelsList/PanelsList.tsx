import styled from "styled-components"
import PanelListItem from "./PanelListItem"
import panelItems from "./panelItems"
import { Scrollbars } from "react-custom-scrollbars"
import i18n from "i18next"

const Container = styled.div`
  background: #0e1419;
  width: 80px;
  display: flex;
`

interface Props {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}
function PanelsList({ activeTab, setActiveTab }: Props) {
  return (
    <Container>
      <div style={{ flex: 1, position: "relative" }}>
        <div style={{ position: "absolute", height: "100%", width: "100%" }}>
          <Scrollbars autoHide>
            {panelItems.map((panelItem) => (
              <PanelListItem
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                icon={panelItem.icon}
                label={i18n.t(`editor.panel.items.${panelItem.name}`)}
                name={panelItem.name}
                key={panelItem.name}
              />
            ))}
          </Scrollbars>
        </div>
      </div>
    </Container>
  )
}

export default PanelsList
