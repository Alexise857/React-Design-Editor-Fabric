import styled from "styled-components"

const Container = styled.div`
  color: #ffffff;
  display: flex;
  flex: 1;
`

function ScrollContainer({ children }: any) {
  return (
    <Container>
      <div style={{ position: "relative", flex: 1 }}>
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </Container>
  )
}

export default ScrollContainer
