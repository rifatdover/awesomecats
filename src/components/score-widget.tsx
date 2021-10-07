import styled from "styled-components";
import {ImageModel} from "../data/models";
import {useVotes} from "../providers/votes-provider";
import {useDownVote, useUpVote} from "../providers";
import {IconWithProgress} from "./icon-with-progress";
import {ThumbDown, ThumbUp} from "@mui/icons-material";
import {Typography} from "@mui/material";

const ScoreContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ScoreWidget = (props: { image: ImageModel }) => {
    const {votes, update} = useVotes()
    const {upVote, loading: upVoteProgress} = useUpVote(update)
    const {downVote, loading: downVoteProgress} = useDownVote(update)
    let score = 0
    const imageVotes = votes.filter(value => value.image_id === props.image.id);
    imageVotes.forEach(votes => votes.value === 0 ? score-- : score++)
    return (
        <ScoreContainer>
            <IconWithProgress
                data-testid={"upvote"}
                icon={ThumbUp}
                disabled={downVoteProgress}
                progress={upVoteProgress}
                onClick={() => upVote(props.image.id)}
            />
            <Typography fontSize={16}>{score} / {imageVotes.length}</Typography>
            <IconWithProgress
                icon={ThumbDown}
                disabled={upVoteProgress}
                progress={downVoteProgress}
                onClick={() => downVote(props.image.id)}
            />
        </ScoreContainer>
    )
}
