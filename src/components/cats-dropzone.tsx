import {AttachFile, CloudUpload} from '@mui/icons-material';
import React, {useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import styled, {css} from "styled-components";
import {Button, Typography} from "@mui/material";
import {useUpload} from "../providers";
import {useHistory} from "react-router-dom";
import {ErrorComponent} from "./error-component";
import {LoadingComponent} from './loading-component';


const DropZoneContainer = styled.div`
  border: 1px solid;
  border-radius: 5px;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`
const dropStyle = css`
  min-width: 100px;
  min-height: 100px;
`
const StyledCloudUpload = styled(CloudUpload)`
  ${dropStyle};
`
const StyledAttachFile = styled(AttachFile)`
  ${dropStyle};
`
export const CatsDropzone = () => {
    const history = useHistory();
    const {upload, loading, data, error, setError} = useUpload()
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            upload(acceptedFiles[0])
        } else {
            setError(Error("Invalid File"))
        }
    }, [upload, setError])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop
        , accept: ["image/jpg", "image/jpeg", "image/png"]
    })

    useEffect(() => {
        if (data)
            history.push("/")

    }, [data, history])
    return (
        <>
            <Button>
                <DropZoneContainer {...getRootProps()}>
                    {
                        loading ? (
                            <>
                                <LoadingComponent/>
                                <Typography variant={"caption"} style={{margin: 10}}>Sending Files...</Typography>
                            </>
                        ) : (
                            <>
                                <input {...getInputProps()} />
                                {isDragActive ? <StyledCloudUpload/> : <StyledAttachFile/>}
                                <Typography variant={"caption"} style={{margin: 10}}>Drop Files or Click</Typography>
                            </>)
                    }

                </DropZoneContainer>
            </Button>
            {error && <ErrorComponent message={error.message}/>}
        </>
    )
}
