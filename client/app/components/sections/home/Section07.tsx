import React from 'react'
import PowerTainMarquee from './PowerTainMarquee'

function Section07() {
  return (
    <div className='relative z-20 bg-white'>
        <div className='container-global'>
          <PowerTainMarquee />
        <video
                className=" w-full h-[80vh] object-cover"
                src="/videos/home/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className='mb-8 xl:mb-16'>
            <PowerTainMarquee />
            </div>
        </div>
    </div>
  )
}

export default Section07