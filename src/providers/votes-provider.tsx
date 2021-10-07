import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from "react";
import {VoteModel} from "../data/models";
import {useUser} from "./user.provider";
import {useApiCall} from "./api-provider";
import {ErrorComponent, LoadingComponent} from "../components";

const VotesContext = createContext({
    votes: [] as VoteModel[],
    update: () => {
    }
})


export const VotesProvider = (props: PropsWithChildren<{}>) => {
    const {execute, error, data} = useApiCall<VoteModel[]>()
    const [votes, setVotes] = useState<VoteModel[] | undefined>(undefined)
    const update = useCallback(() => {
        execute(`https://api.thecatapi.com/v1/votes`)
    }, [execute])
    useEffect(() => {
        setVotes(data)
    }, [data])
    useEffect(() => {
        if (!votes)
            update()
    }, [votes, update])
    return (
        <VotesContext.Provider value={{votes: votes ?? [], update}}>
            {error ? <ErrorComponent message={error.message}/> : votes ? props.children : <LoadingComponent/>}
        </VotesContext.Provider>
    )
}
export const useVotes = () => useContext(VotesContext)

export const useMyVotes = () => {
    const {votes} = useVotes()
    const user = useUser()
    const [myVotes, setMyVotes] = useState<VoteModel[]>([])
    useEffect(() => {
        if (user?.visitorId) {
            const userVotes = votes.filter(value => value.sub_id === user.visitorId)
            setMyVotes(userVotes)
        }

    }, [votes, user?.visitorId])
    return myVotes
}
