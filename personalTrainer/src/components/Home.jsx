import { MantineProvider, Group, Title, Stack, Container, List } from '@mantine/core';
import NavbarSimple from './NavbarSimple';
import HeaderSimple from './HeaderSimple';

const theme = {};

function App() {
    return (
        <MantineProvider theme={theme}>
            <HeaderSimple />
            <Group>
                <NavbarSimple />
                <Container size='xl'>
                    <Stack justify='center'>
                        <Title order={1}>Welcome!</Title>
                        <Title order={2}>This site is my final task for a front-end programming course.</Title>
                        <Title order={2}>It functions as the front-end for a fictional company's customer database.</Title>
                        <Title order={2}>The site is built using ReactJS and Mantine UI, and lets a user:</Title>
                        <List>
                            <Title order={3}><List.Item>View a list of customers</List.Item></Title>
                            <Title order={3}><List.Item>View different types of training the company offers</List.Item></Title>
                            <Title order={3}><List.Item>View a calendar of scheduled training sessions</List.Item></Title>
                            <Title order={3}><List.Item>View statistics about the booked training sessions</List.Item></Title>
                        </List>
                    </Stack>
                </Container>
            </Group>

        </MantineProvider>
    );
}

export default App;
