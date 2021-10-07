import styled from "styled-components";
import {Container, Typography} from "@mui/material";
import {PropsWithChildren} from "react";

const ErrorText = styled(Typography)`
  color: red;
`
const ErrorContainer = styled(Container)`
  border: red solid 1px;
  border-radius: 5px;
  width: 50%;
  text-align: center;
  margin-top: 10px;
  padding: 5px;
`

export const ErrorComponent = (props: PropsWithChildren<{ message?: string }>) => {
    const {children, message} = props
    if(children) return <ErrorContainer>{children}</ErrorContainer>
    return <ErrorContainer><ErrorText>{message ?? ""}</ErrorText></ErrorContainer>
}
