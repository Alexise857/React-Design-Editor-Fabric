import { useState } from "react"
import Panel from "./Panel"
import PanelsList from "./PanelsList"

function Panels() {
  const [activeTab, setActiveTab] = useState("images")
  return (
    <>
      <PanelsList setActiveTab={setActiveTab} activeTab={activeTab} />
      <Panel activeTab={activeTab} />
    </>
  )
}

export default Panels
