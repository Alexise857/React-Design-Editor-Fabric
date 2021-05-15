import styled from "styled-components"

const Container = styled.div`
  cursor: pointer;
  color: #ffffff;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.8rem;
`
interface Props {
  name: string
  icon: string
  label: string
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

function PanelListItem({ name, icon, setActiveTab, activeTab, label }: Props) {
  const isActive = name === activeTab
  return (
    <Container
      className={`${isActive ? "PanelListItem active" : "PanelListItem"}`}
      key={name}
      onClick={() => setActiveTab(name)}
    >
      <i className="material-icons">{icon}</i>
      <div style={{ paddingTop: "0.4rem" }}>{label}</div>
    </Container>
  )
}

export default PanelListItem
