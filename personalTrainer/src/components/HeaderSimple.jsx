
import classes from './HeaderSimple.module.css';
import { IconRun } from '@tabler/icons-react';
import { Group, Container, Title } from '@mantine/core';



function HeaderSimple() {


    return (
        <header className={classes.header}>
            <Container size="xl" className={classes.inner}>
                <Group gap={100} visibleFrom="xs">
                    <IconRun className={classes.headerIcon} size={40} />
                    <Title order={1}>Personal Trainer Front-End</Title>
                </Group>
            </Container>
        </header>
    );
}
export default HeaderSimple;