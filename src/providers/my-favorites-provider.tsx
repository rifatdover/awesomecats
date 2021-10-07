import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import {FavoriteModel} from "../data/models";
import {useUser} from "./user.provider";
import {useApiCall} from "./api-provider";
import {ErrorComponent, LoadingComponent} from "../components";

const MyFavoritesContext = createContext({
    favorites: [] as FavoriteModel[],
    update: () => {
    }
})


export const MyFavoritesProvider = (props: PropsWithChildren<{}>) => {
    const {execute, error, data} = useApiCall<FavoriteModel[]>()
    const user = useUser()
    const [favorites, setFavorites] = useState<FavoriteModel[] | undefined>(undefined)
    const update = useCallback(() => {
        if (user?.visitorId !== undefined) {
            execute(`https://api.thecatapi.com/v1/favourites?sub_id=${user?.visitorId}`)
        }
    }, [execute, user?.visitorId])
    useEffect(() => {
        setFavorites(data)
    }, [data])
    useEffect(() => {
        if (!favorites)
            update()
    }, [favorites, update])
    return (
        <MyFavoritesContext.Provider value={{favorites: favorites ?? [], update}}>
            {error ? <ErrorComponent message={error.message}/> : favorites ? props.children : <LoadingComponent/>}
        </MyFavoritesContext.Provider>
    )
}
export const useMyFavorites = () => useContext(MyFavoritesContext)
