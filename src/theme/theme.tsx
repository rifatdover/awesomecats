import {createTheme, responsiveFontSizes} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#888",
            contrastText: "#000000",
        },
        secondary: {
            main: "#666666",
            contrastText: "#ffffff",
        },
    },
    shape: {
        borderRadius: 0,
    },
    typography: {
        fontFamily: [
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});
export const AppTheme = responsiveFontSizes(theme);
