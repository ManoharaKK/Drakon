import Section01 from '@/app/components/Contact/Section01'
import Section02 from '@/app/components/Contact/Section02'
import Section03 from '@/app/components/Contact/Section03'
import Footer from '@/app/components/Footer'
import React from 'react'

function page() {
  return (
    <div>
        <Section02 />
        <Section01 />
        <Section03 />
        <Footer />
    </div>
  )
}

export default page