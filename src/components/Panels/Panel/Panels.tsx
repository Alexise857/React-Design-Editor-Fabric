import PanelDocument from "./PanelDocument"
import PanelFolder from "./PanelFolder"
import PanelGraphic from "./PanelGraphic"
import PanelHelp from "./PanelHelp"
import PanelImage from "./PanelImage"
import PanelLayer from "./PanelLayer"
import PanelMusic from "./PanelMusic"
import PanelObject from "./PanelObject"
import PanelTemplate from "./PanelTemplate"
import PanelText from "./PanelText"
import PanelVideo from "./PanelVideo"
import PanelFormat from "./PanelFormat"

const Panels = {
  formats: <PanelFormat />,
  templates: <PanelTemplate />,
  images: <PanelImage />,
  text: <PanelText />,
  documents: <PanelDocument />,
  objects: <PanelObject />,
  musics: <PanelMusic />,
  videos: <PanelVideo />,
  graphics: <PanelGraphic />,
  layers: <PanelLayer />,
  folders: <PanelFolder />,
  help: <PanelHelp />,
}

export default Panels
