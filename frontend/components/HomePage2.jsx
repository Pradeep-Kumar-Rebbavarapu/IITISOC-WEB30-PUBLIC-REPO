import React from 'react'
import HomeCard from './HomeCard'
import Bounce from 'react-reveal/Bounce';
import HomeCard1 from '../public/images/HomeCard1.png'
import HomeCard2 from '../public/images/HomeCard2.png'
import HomeCard3 from '../public/images/HomeCard3.png'
import HomeCard4 from '../public/images/HomeCard4.png'
export default function HomePage2() {
  return (
    <div id="HomePage2" className='w-full h-full md:grid grid-cols-2'>

      <HomeCard image={HomeCard1} powered={"Speech To Text"} height="h-[200px]" title="AI WRITES FOR YOU">
Effortlessly Capture and Organize Ideas: AI-Enhanced Note-Making for Streamlined Collaboration and Productivity.</HomeCard>
      <HomeCard image={HomeCard2} powered={"Web RTC"} height="h-[230px]" title="SHARING FILES">
      Unlocking Limitless Collaboration: Elevate Video Conferencing and Simplify File Sharing with WebRTC's Seamless Connectivity.</HomeCard>
      <HomeCard height={'h-[230px]'} image={HomeCard3} powered={"Chat GPT and Web RTC"} title="DOWNLOAD WRITTEN CONTENT">Seamless Downloads: Transform Ideas into Action with Word Files for Notes and PDF Format for Whiteboard Collaborations.</HomeCard>
      <HomeCard powered={"Web RTC"} image={HomeCard4} height={'h-[230px]'} title="RECORD YOUR MEETING">
Capture and Preserve Meeting Moments: Seamlessly Record and Safely Store Your Meetings in Cloud Services, Empowering Seamless Collaboration and Knowledge Preservation.</HomeCard>

    </div>
  )
}
