import {Route, Switch} from "react-router-dom";
import {Root, Upload} from "./pages";

export const Routes = () => {
    return(
        <Switch>
            <Route exact path="/upload" component={Upload} />
            <Route path="/" component={Root} />
        </Switch>
    )
}
