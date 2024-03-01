import React from 'react'
import { Typography } from '@material-tailwind/react'
function Footer() {
    return (
        <footer style={{background:'black'}}>
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center py-3">
                    <Typography color="white" className="text-base">
                        © {new Date().getFullYear()} Computer University Course Registration System
                    </Typography>
                </div>
            </div>
        </footer>
    )
}

export default Footer