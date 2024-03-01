import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ButtonGroup,Button } from '@material-tailwind/react';
function LinkButtons({activeNav}) {
    const [navLinks, setNavLinks] = useState([
        {
            name: 'First Year',
            isActive: false,
            link: '/students/year/First Year',
        },
        {
            name: 'Second Year',
            isActive: false,
            link: '/students/year/Second Year',
        },
        {
            name: 'Third Year',
            isActive: false,
            link: '/students/year/Third Year',
        },

    ]);
    useEffect(() => {
        setNavLinks(preNavLinks => {
            return preNavLinks.map(link => {
                if (link.name.trim() === activeNav) {
                    return { ...link, isActive: true }; // Toggle isActive
                }
                return { ...link, isActive: false }; // Reset isActive for other links
            });
        });
    }, [activeNav]); // Add activeNav as a dependency
    
    return (
        <ButtonGroup className='flex items-center justify-start'>
        {navLinks.map((nav, index) => (
            <NavLink key={index} to={nav.link} className="me-2">
                <Button variant={nav.isActive ? "gradient" : "outlined"} size='sm'>{nav.name}</Button>
            </NavLink>
        ))}
    </ButtonGroup>
    
    );
}

export default LinkButtons;
