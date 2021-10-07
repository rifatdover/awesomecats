import {createContext, PropsWithChildren, useCallback, useContext, useState} from "react";
import {FavoriteModel, ImageModel} from "../data/models";
import {useUser} from "./user.provider";

const ApiContext = createContext({
    call: (url: string, init?: RequestInit) => fetch(url, init)
})

interface ApiProviderProps {
    apiKey: string
}

export const ApiProvider = ({apiKey, children}: PropsWithChildren<ApiProviderProps>) => {
    const call = useCallback((url: string, init?: RequestInit): Promise<Response> => {
        const params: RequestInit = {
            ...init,
            headers: {
                "x-api-key": apiKey,
                ...init?.headers,
            }
        }
        return fetch(url, params)
    }, [apiKey])
    return (
        <ApiContext.Provider value={{call}}>
            {children}
        </ApiContext.Provider>
    )
}

const useApiContext = () => useContext(ApiContext)

declare type CompleteType = <T>(result: Error | T) => void

export const useApiCall = <T extends unknown>(onComplete: CompleteType | undefined = undefined) => {
    const {call} = useApiContext()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<T | undefined>(undefined)
    const [error, setError] = useState<Error | undefined>(undefined)

    const execute = useCallback(async (url: string, init?: RequestInit) => {
        setLoading(true)
        try {
            const response = await call(url, init)
            if (response.ok) {
                const result = await response.json() as T
                setData(result)
                if (onComplete)
                    onComplete(result)
            } else {
                const errorInfo = await response.json()
                setError(errorInfo)
            }
        } catch (e: any) {
            setError(e)
            if (onComplete)
                onComplete(e)
        } finally {
            setLoading(false)
        }
    }, [call, onComplete])
    return {execute, loading, data, error, setError}
}


export const useListImages = () => {
    const {execute, ...other} = useApiCall<ImageModel[]>()
    const list = useCallback((limit: number, page: number) => {
        return execute(`https://api.thecatapi.com/v1/images?include_vote=1&include_favourite=1&limit=${limit}&page=${page}`)
    }, [execute])
    return {list, ...other}
}


export const useUpload = () => {
    const {execute, ...other} = useApiCall()
    const [subId] = useState<string>(Math.random().toString())
    const upload = useCallback((file: File) => {
        const data = new FormData()
        data.append('file', file)
        data.append('sub_id', subId)

        return execute("https://api.thecatapi.com/v1/images/upload", {
            method: 'POST',
            body: data
        });
    }, [execute, subId])
    return {upload, ...other}
}

export const useDelete = (onComplete: CompleteType | undefined) => {
    const {execute, ...other} = useApiCall(onComplete)
    const deleteImage = useCallback((imageId: String) => {
        return execute(`https://api.thecatapi.com/v1/images/${imageId}`, {
            method: 'DELETE'
        });
    }, [execute])
    return {deleteImage, ...other}
}

export const useFavorite = (onComplete: CompleteType | undefined) => {
    const {execute, ...other} = useApiCall<FavoriteModel>(onComplete)
    const user = useUser()
    const fav = useCallback((imageId: string) => {
        return execute(`https://api.thecatapi.com/v1/favourites`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: `{"image_id": "${imageId}", "sub_id": "${user?.visitorId}"}`
        })
    }, [user, execute])
    return {fav, ...other}
}
export const useUnFavorite = (onComplete: CompleteType | undefined) => {
    const {execute, ...other} = useApiCall(onComplete)
    const unFav = useCallback((favouriteId: string) => {
        return execute(`https://api.thecatapi.com/v1/favourites/${favouriteId}`, {
            method: 'DELETE'
        });
    }, [execute])
    return {unFav, ...other}
}

const useVote = (onComplete: CompleteType | undefined) => {
    const {execute, ...other} = useApiCall(onComplete)
    const user = useUser()
    const vote = useCallback((imageId: string, upVote: boolean) => {
        return execute(`https://api.thecatapi.com/v1/votes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: `{"image_id": "${imageId}", "sub_id": "${user?.visitorId}", "value": ${ upVote ? 1 : 0}}`
        });
    }, [user, execute])

    return {vote, ...other}
}

export const useUpVote = (onComplete: CompleteType | undefined = undefined) => {
    const {vote, ...other} = useVote(onComplete)
    const upVote = useCallback((imageId: string) => vote(imageId, true), [vote])
    return {upVote, ...other}
}

export const useDownVote = (onComplete: CompleteType | undefined = undefined) => {
    const {vote, ...other} = useVote(onComplete)
    const downVote = useCallback((imageId: string) => vote(imageId, false), [vote])
    return {downVote, ...other}
}
