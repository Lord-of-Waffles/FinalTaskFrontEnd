import NavbarSimple from './NavbarSimple'

import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {

    return (
        <>
            <MantineProvider theme={theme}>
                <NavbarSimple />
            </MantineProvider>
        </>
    )
}

export default App
