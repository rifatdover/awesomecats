import {FavoriteModel, ImageModel} from "../data/models";
import styled from "styled-components";
import {Delete, Favorite, FavoriteBorder} from '@mui/icons-material';
import {useEffect, useState} from "react";
import {useDelete, useFavorite, useUnFavorite} from "../providers";
import {IconWithProgress} from "./icon-with-progress";
import {useMyFavorites} from "../providers/my-favorites-provider";
import {Paper} from "@mui/material";
import {ScoreWidget} from "./score-widget";

const ImageContainer = styled(Paper)`
  height: 160px;
  width: 160px;
  position: relative;
  border-radius: 6px;
`
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: .2s ease;
  opacity: 1;
  border-radius: 6px;
`
const Hud = styled.div`
  transition: .2s ease;
  opacity: 0;
  text-align: center;
  top: 0;
  left: 0;
  position: absolute;
  background: #FFFFFFDD;
  height: 100%;
  width: 100%;
  border-radius: 6px;

  .image-item:hover & {
    opacity: 1;
  }
`
const ActionButtonsContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`
const StyledIconWithProgress = styled(IconWithProgress)`
  position: absolute;
  top: 0;
  right: 0;
`


interface ImageItemProps {
    model: ImageModel
    forceRefresh: () => void
}

export const ImageItem = (props: ImageItemProps) => {
    const {model, forceRefresh} = props
    const {favorites, update} = useMyFavorites()
    const [favorite, setFavorite] = useState<FavoriteModel>()
    const [isFavorite, setIsFavorite] = useState<boolean | undefined>()
    const {fav, loading: favProgress} = useFavorite((result) => {
        setIsFavorite(!(result instanceof Error));
        update()
    })
    const {unFav, loading: unFavProgress} = useUnFavorite((result) => {
        setIsFavorite((result instanceof Error));
        update()
    })
    const {deleteImage, loading: deleting} = useDelete(forceRefresh)
    useEffect(() => {
        const favorite = favorites?.find((value: FavoriteModel) => value.image_id === model.id);
        setIsFavorite(favorite !== undefined)
        setFavorite(favorite)
    }, [favorites, model.id])
    return (
        <ImageContainer className={"image-item"}>
            <StyledImage
                src={`${model.url}`}
                alt={model.original_filename}
                loading="lazy"
            />
            <Hud>
                <StyledIconWithProgress progress={deleting} icon={Delete} onClick={() => deleteImage(model.id)}/>
                <ScoreWidget image={model}/>
                <ActionButtonsContainer>
                    <IconWithProgress icon={isFavorite ? Favorite : FavoriteBorder}
                                      progress={favProgress || unFavProgress}
                                      onClick={
                                          () => favorite ? unFav(favorite?.id) : fav(model.id)
                                      }/>
                </ActionButtonsContainer>
            </Hud>
        </ImageContainer>
    )
}
