import {Fab} from "@mui/material";
import styled from "styled-components";
import {CenteredContainer, Images, Title} from "../components";
import {useHistory} from "react-router-dom";
import {Add} from "@mui/icons-material";

const RootContainer = styled(CenteredContainer)`
  position: relative;
  height: 100vh;
  justify-content: start;
`
const StyledFAB = styled(Fab)`
  position: absolute;
  bottom: 30px;
  right: 30px;
`
export const Root = () => {
    const history = useHistory()
    return (
        <RootContainer>
            <Title>Awesome Cats</Title>
            <Images/>
            <StyledFAB onClick={() => history.push("/upload")}>
                <Add/>
            </StyledFAB>
        </RootContainer>
    )
}
