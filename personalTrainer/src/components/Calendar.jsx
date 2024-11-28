import NavbarSimple from './NavbarSimple'
import HeaderSimple from './HeaderSimple';
import Footer from './Footer'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import '@mantine/core/styles.css';


import { createTheme, Group, MantineProvider } from '@mantine/core';

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {


    const localizer = momentLocalizer(moment) // or globalizeLocalizer

    return (
        <>
            <MantineProvider theme={theme}>
                <HeaderSimple />
                <Group>
                    <NavbarSimple />
                    <Calendar
                        localizer={localizer}
                        events={[]}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </Group>
                <Footer />

            </MantineProvider>
        </>
    )
}

export default App
