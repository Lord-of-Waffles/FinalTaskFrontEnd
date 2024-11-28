import NavbarSimple from './NavbarSimple'
import HeaderSimple from './HeaderSimple';
import Footer from './Footer'

import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {

    return (
        <>
            <MantineProvider theme={theme}>
                <HeaderSimple />

                <NavbarSimple />
                <Footer />

            </MantineProvider>
        </>
    )
}

export default App
