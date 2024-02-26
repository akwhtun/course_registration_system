import React from 'react'
import { Typography } from '@material-tailwind/react'
function Footer() {
    return (
        <footer style={{ background: '#212121' }}>
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center py-4">
                    <Typography color="white" className="text-lg">
                        © {new Date().getFullYear()} Computer University Course Registration System
                    </Typography>
                </div>
            </div>
        </footer>
    )
}

export default Footer