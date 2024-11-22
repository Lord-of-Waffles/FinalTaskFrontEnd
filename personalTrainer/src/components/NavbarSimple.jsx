import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    IconUserFilled,
    IconHomeFilled,
    IconBarbellFilled,
    IconCalendarFilled,
    IconChartDotsFilled,
} from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';

const data = [
    { link: '/', label: 'Home', icon: IconHomeFilled },
    { link: '/customers', label: 'Customers', icon: IconUserFilled },
    { link: '/training-sessions', label: 'Training Sessions', icon: IconBarbellFilled },
    { link: '/calendar', label: 'Calendar', icon: IconCalendarFilled },
    { link: '/statistics', label: 'Statistics', icon: IconChartDotsFilled },
];

function NavbarSimple() {
    const [active, setActive] = useState('Home');

    const links = data.map((item) => (
        <Link
            to={item.link}
            className={classes.link}
            data-active={item.label === active || undefined}
            key={item.label}
            onClick={() => setActive(item.label)}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                {links}
            </div>
        </nav>
    );
}

export default NavbarSimple;
