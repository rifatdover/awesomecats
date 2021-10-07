import {CircularProgress, IconButton} from "@mui/material";
import {SvgIconComponent} from "@mui/icons-material";

interface IconWithProgressProps {
    icon: SvgIconComponent,
    progress: boolean,
    onClick?: () => any,
    className?: string,
    disabled?: boolean,
    hidden?: boolean
}

export const IconWithProgress = (props: IconWithProgressProps) => {
    const {icon: Icon, progress, onClick} = props
    return (
        <IconButton disabled={progress || props.disabled} onClick={onClick} className={props.className} hidden={props.hidden}>
            {progress ? <CircularProgress size={20}/> : <Icon fontSize={"small"}/>}
        </IconButton>
    )
}
