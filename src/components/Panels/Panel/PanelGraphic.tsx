import { useState, useEffect } from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { Input, Select } from "@chakra-ui/react"
import PanelContainer from "../../ScrollContainer/ScrollContainer"
import useCoreHandler from "@/components/Canvas/handlers/useCoreHandler"
import { useSelector } from "react-redux"
import {
  selectWordArtCategories,
  selectWordArts,
  selectWordArtSubcategories,
} from "@/store/reducers/wordarts/selectors"
import { fabric } from "fabric"
import { useCanvasContext } from "@/components/Canvas/hooks"
function PanelGraphic() {
  const [wordArts, setWordArts] = useState([])
  const { canvas } = useCanvasContext()
  const wordArtsState = useSelector(selectWordArts)
  const wordArtCategories = useSelector(selectWordArtCategories)
  const wordArtSubcategories = useSelector(selectWordArtSubcategories)

  function handleChange(e: any) {
    onSelectWordArts(parseInt(e.target.value))
  }
  useEffect(() => {
    if (wordArtCategories.length !== 0) {
      const selectedCategory = wordArtCategories[0]
      onSelectWordArts(selectedCategory.id)
    }
  }, [wordArtCategories])

  const onSelectWordArts = (id: number) => {
    const catsubcats = wordArtSubcategories.filter((wordartsubcat) => {
      return wordartsubcat.wordartcategory === id
    })

    let filteredwordarts: any = []
    catsubcats.forEach(function (catsubcat) {
      filteredwordarts = wordArtsState.filter((wordArt) => {
        return (
          wordArt.wordartsubcategory &&
          wordArt.wordartsubcategory.id === catsubcat.id
        )
      })
    })
    setWordArts(filteredwordarts)
  }

  const addObjectToCanvas = (url: string) => {
    if (!url) return false
    let imageURL = "http://165.227.50.244:1337/" + url

    fabric.loadSVGFromURL(imageURL, (objects, options) => {
      if (canvas) {
        const obj = fabric.util.groupSVGElements(objects, options)
        //@ts-ignore
        obj.set("groupType", "path")

        obj.scaleToHeight(180)
        canvas.add(obj)
        obj.center()
      }
    })
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
            <Select
              onChange={handleChange}
              defaultValue={
                wordArtCategories && wordArtCategories[0].name
                  ? wordArtCategories[0].name
                  : "select one"
              }
              background="#fff"
              color="#333"
              placeholder="Select category"
            >
              {wordArtCategories.map((wordArtCategory) => {
                return (
                  <option key={wordArtCategory.id} value={wordArtCategory.id}>
                    {wordArtCategory.name}
                  </option>
                )
              })}
            </Select>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          {wordArts.map((wordArt: any) => {
            return (
              <div
                key={wordArt.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 0 1rem 0",
                }}
              >
                <img
                  onClick={() => {
                    addObjectToCanvas(wordArt.svgart.url)
                  }}
                  style={{ maxHeight: "90px", maxWidth: "100px" }}
                  src={"http://165.227.50.244:1337/" + wordArt.svgart.url}
                />
              </div>
            )
          })}
        </div>
      </Scrollbars>
    </PanelContainer>
  )
}

export default PanelGraphic
