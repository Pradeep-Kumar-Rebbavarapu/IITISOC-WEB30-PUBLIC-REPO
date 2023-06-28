import React from 'react'
import { useEffect } from 'react'
import MobileJoinUs from '../../components/MobileJoinUs';
import LaptopJoinUsPage from '../../components/LaptopJoinUs';

export default function JoinUsPage() {
    
    return (
        <div>
            <div className='lg:hidden'><MobileJoinUs/></div>
            <div className='hidden lg:block'><LaptopJoinUsPage/></div>
        </div>
    )
}
