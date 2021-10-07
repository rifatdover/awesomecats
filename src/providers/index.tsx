import {ThemeProvider} from "styled-components";
import {PropsWithChildren} from "react";
import {AppTheme} from "../theme/theme";
import {ApiProvider} from "./api-provider";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./user.provider";
import {MyFavoritesProvider} from "./my-favorites-provider";
import {VotesProvider} from "./votes-provider";
import {FullPageDiv} from "../components";

interface ProvidersProps {
    apiKey: string
}

export const Providers = (props: PropsWithChildren<ProvidersProps>) => {
    return (
        <FullPageDiv>
            <UserProvider>
                <BrowserRouter>
                    <ThemeProvider theme={AppTheme}>
                        <ApiProvider apiKey={props.apiKey}>
                            <MyFavoritesProvider>
                                <VotesProvider>
                                    {props.children}
                                </VotesProvider>
                            </MyFavoritesProvider>
                        </ApiProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </UserProvider>
        </FullPageDiv>
    )
}

export * from "./api-provider"

