import NavbarSimple from './NavbarSimple';
import TrainingTable from './TrainingTable';
import Footer from './Footer';
import HeaderSimple from './HeaderSimple';

import '@mantine/core/styles.css';
import { createTheme, MantineProvider, Group, Container } from '@mantine/core';

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {
    return (
        <MantineProvider theme={theme}>
            <HeaderSimple />
            <Group>
                <NavbarSimple />
                <Container size="s">
                    <TrainingTable />
                </Container>
            </Group>
            <Footer />
        </MantineProvider>
    );
}

export default App;
