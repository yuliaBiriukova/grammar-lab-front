import React from 'react';
import './App.css';
import {theme} from "./utils/theme";
import {ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {AppRouter} from "./router/AppRouter";
import {store} from "./app/store";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </ThemeProvider>
    );
}

export default App;