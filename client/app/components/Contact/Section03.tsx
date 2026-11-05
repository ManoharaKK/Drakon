import React from 'react'

function Section03() {
  return (
    <div className='relative z-10 bg-black '>
        <div className='container-global'>
        <div className='mt-16 text-white'>
            <h1 className='title uppercase  text-white'>
            Find Us On The <span className='text-secondary'>Map</span>
            </h1>
            <p className='description mt-4 max-w-[600px] text-white'>
              Locate our office easily and get in touch with us for any inquiries or support.
            </p>
            <div className='bg-white/50 h-[1px] w-full my-10'></div>
            <div className='mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch'>
              {/* Address card */}
              <div className='col-span-1 lg:col-span-1  p-6 sm:p-8 flex flex-col justify-between text-white'>
                <div>
                  <h2 className='subtitle-2  mb-3'>
                    DRAKON HQ
                  </h2>
                  <p className='description text-white'>
                    270/F, Kadawatha Road<br />
                    Ganemulla<br />
                    Sri Lanka
                  </p>
                </div>
                <div className='mt-6 space-y-1 text-sm'>
                  <p className='font-medium'>Phone: <span className='font-normal'>+94 75 494 7171</span></p>
                  <p className='font-medium'>Email: <span className='font-normal'>kavindamanoharak@gmail.com</span></p>
                </div>
              </div>

              {/* Map / View location */}
              <div className='col-span-1 lg:col-span-2  overflow-hidden'>
                <div className='relative w-full h-[260px] sm:h-[320px] lg:h-[360px] bg-white/10 flex flex-col'>
                  <iframe
                    title='DRAKON Location'
                    src='https://maps.google.com/maps?q=270/F%20Kadawatha%20Road,%20Ganemulla,%20Sri%20Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed'
                    className='w-full h-full border-0'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  />
                  <a
                    href='https://www.google.com/maps/search/?api=1&query=270/F,+Kadawatha+Road,+Ganemulla,+Sri+Lanka'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white text-black px-8 py-2 text-sm font-semibold shadow-md hover:bg-black hover:text-white transition-all duration-300'
                  >
                    View Location
                  </a>
                </div>
              </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Section03