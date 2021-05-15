import styled from "styled-components"

interface ContainerProps {
  isActive: boolean
}
const Container = styled.div<ContainerProps>`
  cursor: pointer;
  color: ${(props) =>
    props.isActive ? "#ffffff" : "rgba(255, 255, 255, 0.64)"};
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.8rem;
  transition: "all 0.5s";
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
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
      isActive={isActive}
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
