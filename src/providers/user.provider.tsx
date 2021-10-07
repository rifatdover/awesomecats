import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import FingerprintJS, {GetResult} from '@fingerprintjs/fingerprintjs'
import {ErrorComponent, LoadingComponent} from "../components";

const UserContext = createContext<GetResult | undefined>(undefined)

export const UserProvider = (props: PropsWithChildren<{}>) => {
    const [visitor, setVisitor] = useState<GetResult>()
    const [error, setError] = useState<Error>()
    const fpPromise = FingerprintJS.load()
    const call = useCallback((async () => {
        const fp = await fpPromise
        return await fp.get()

    }), [fpPromise])
    useEffect(() => {
        if (!visitor)
            call().then(setVisitor).catch(setError)
    }, [call, visitor])
    return (
        <UserContext.Provider value={visitor}>
            {error ? <ErrorComponent message={error.message}/> : visitor ? props.children : <LoadingComponent/>}
        </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext)
