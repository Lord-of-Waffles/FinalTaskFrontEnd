import NavbarSimple from './NavbarSimple'
import HeaderSimple from './HeaderSimple';
import CustomerTable from './CustomerTable'
import Footer from './Footer'
import '@mantine/core/styles.css';

import { createTheme, MantineProvider, Group, Container } from '@mantine/core';

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {

    return (
        <>
            <MantineProvider theme={theme}>
                <HeaderSimple />
                <Group>
                    <NavbarSimple />
                    <Container size={'s'}>
                        <CustomerTable />
                    </Container>
                </Group>
                <Footer />
            </MantineProvider>
        </>
    )
}

export default App
