import { MantineProvider, Group, Title, Stack, Container, List, Paper, Divider } from '@mantine/core';
import NavbarSimple from './NavbarSimple';
import HeaderSimple from './HeaderSimple';
import Footer from './Footer';

const theme = {
    colorScheme: 'light',
};

function App() {
    return (
        <MantineProvider theme={theme}>
            <HeaderSimple />
            <Group>
                <NavbarSimple />
                <Container size='xl' p="xl">
                    <Paper shadow='md' radius='lg' withBorder='true' p="md" style={{ height: 450, width: 900 }}>
                        <Stack justify='center' spacing="xl">
                            <Title order={1}>Welcome!</Title>
                            <Divider />
                            <Title order={2}>This site is my final task for a front-end programming course.</Title>
                            <Title order={2}>It functions as the front-end for a fictional company&apos;s customer database.</Title>
                            <Title order={2}>The site is built using ReactJS and Mantine UI, and lets a user:</Title>
                            <List spacing="lg">
                                <Title order={3}><List.Item>View a list of customers</List.Item></Title>
                                <Title order={3}><List.Item>View different types of training the company offers</List.Item></Title>
                                <Title order={3}><List.Item>View a calendar of scheduled training sessions</List.Item></Title>
                                <Title order={3}><List.Item>View statistics about the booked training sessions</List.Item></Title>
                            </List>
                        </Stack>
                    </Paper>
                </Container>
            </Group>
            <Footer />
        </MantineProvider>
    );
}

export default App;
