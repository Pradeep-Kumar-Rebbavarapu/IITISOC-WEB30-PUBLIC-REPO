import React from 'react'
import { useEffect } from 'react'
import MobileJoinUs from '../../components/MobileJoinUs';
import LaptopJoinUsPage from '../../components/LaptopJoinUs';
import { NextSeo } from 'next-seo';
export default function JoinUsPage() {
    
    return (
        <div>
            <NextSeo
      title="ConferoLive - Join Us"
      description="Best One Stop Solution for Video Conferencing Apps"
    />
            <div className='lg:hidden'><MobileJoinUs/></div>
            <div className='hidden lg:block'><LaptopJoinUsPage/></div>
        </div>
    )
}
