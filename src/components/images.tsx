import {ImageItem} from "./image-item";
import styled from "styled-components";
import {useListImages} from "../providers";
import {useCallback, useEffect} from "react";
import {center} from "../theme/css";
import {ErrorComponent} from "./error-component";
import {LoadingComponent} from "./loading-component";

const ImageGrid = styled.div`
  ${center};
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(min(160px, 100%), 1fr));
  grid-template-rows: repeat(auto-fill, 160px);
  column-gap: 2px;
  row-gap: 4px;
  min-width: 340px;
  max-width: 656px;
  overflow-y: auto;
  height: 90vh;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Images = () => {
    const {list, loading, error, data} = useListImages()
    const forceRefresh = useCallback(() => {
        list(100, 0).then().catch()
    }, [list])
    useEffect(() => {
        if (!data && !loading && !error)
            list(100, 0)
    }, [data, list, loading, error])
    if (loading) return <LoadingComponent/>
    if (error) return <ErrorComponent message={error.message}/>
    return (
        <ImageGrid>
            {data?.map((item) => (
                <ImageItem
                    key={item.url}
                    model={item}
                    forceRefresh={forceRefresh}
                />
            ))}
        </ImageGrid>

    )
}
