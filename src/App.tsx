import React from 'react';
import {Providers} from "./providers";
import {Routes} from "./routes";
import * as config from "./config.json"

function App() {
    return (
        <Providers apiKey={config.apikey}>
            <Routes/>
        </Providers>
    );
}

export default App;
