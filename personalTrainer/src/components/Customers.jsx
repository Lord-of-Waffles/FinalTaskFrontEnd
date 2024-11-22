import NavbarSimple from './NavbarSimple'
import HeaderSimple from './HeaderSimple';
import CustomersTable from './CustomersTable'
import '@mantine/core/styles.css';

import { createTheme, MantineProvider, Group } from '@mantine/core';

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
                    <CustomersTable />
                </Group>
            </MantineProvider>
        </>
    )
}

export default App
