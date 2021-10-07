import styled from "styled-components";
import {Container, Typography} from "@mui/material";
import {center} from "../theme/css";
import {PropsWithChildren} from "react";

export * from "./cats-dropzone"
export * from "./error-component"
export * from "./icon-with-progress"
export * from "./image-item"
export * from "./images"
export * from "./loading-component"
export * from "./score-widget"

export const CenteredContainer = styled(Container)`
  ${center}
`;
export const CenteredDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FullPageDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const CenteredTypography = styled(Typography)`
  ${center};
  text-align: center;
`

export const Title = (props: PropsWithChildren<{}>) => (<CenteredTypography variant={"h2"}>{props.children}</CenteredTypography>)
