import React from 'react'
import DrakonMarquee from './PowerTainMarquee'

function Section07() {
  return (
    <div className='relative z-20 bg-white'>
        <div className='container-global'>
          <DrakonMarquee />
        <video
                className=" w-full h-[80vh] object-cover"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/home/Hero.mp4" type="video/mp4" />
            </video>
            <div className='mb-8 xl:mb-16'>
            <DrakonMarquee />
            </div>
        </div>
    </div>
  )
}

export default Section07