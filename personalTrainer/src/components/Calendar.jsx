import NavbarSimple from './NavbarSimple';
import HeaderSimple from './HeaderSimple';
import Footer from './Footer';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, createTheme, Group, MantineProvider } from '@mantine/core';
import CalendarComponent from './CalendarComponent';
import '@mantine/core/styles.css';

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {
    return (
        <MantineProvider theme={theme}>
            <HeaderSimple />
            <Group>
                <NavbarSimple />
                <Container size="xxl">
                    <CalendarComponent />
                </Container>
            </Group>
            <Footer />
        </MantineProvider>
    );
}

export default App;
