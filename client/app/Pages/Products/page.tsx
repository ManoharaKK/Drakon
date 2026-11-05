import React from 'react'
import Section01 from '@/app/components/Products/Section01'
import Section06 from '@/app/components/sections/home/Section06'
import Footer from '@/app/components/Footer'
import Section08 from '@/app/components/sections/home/Section08'
import Section09 from '@/app/components/sections/home/Section09'
import Section07 from '@/app/components/sections/home/Section07'

function page() {
  return (
    <div className='flex min-h-0 flex-1 flex-col'>
        <Section01 />
        <Section06 />
        <Section07 />
        <Section08 />
        <Section09 />
        <Footer/>
    </div>
  )
}

export default page