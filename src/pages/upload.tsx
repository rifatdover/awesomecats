import {CatsDropzone, CenteredDiv, Title} from "../components";
import styled from "styled-components";

const RootContainer = styled(CenteredDiv)`
  height: 100vh;
`
export const Upload = () => {
    return (
        <RootContainer>
            <Title>Upload</Title>
            <CatsDropzone/>
        </RootContainer>
    )
}
