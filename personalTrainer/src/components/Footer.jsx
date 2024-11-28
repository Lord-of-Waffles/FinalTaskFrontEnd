import { Container, Title } from '@mantine/core';
import classes from './FooterSimple.module.css';


export default function FooterSimple() {


    return (
        <div className={classes.footer}>
            <Container className={classes.inner} size={'xl'}>
                <Title order={3} align='center'>Made by Benjamin Worton, 2024</Title>
            </Container>
        </div>
    );
}