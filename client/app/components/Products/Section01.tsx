import React from 'react'
import Cards from './Cards'

function Section01() {
  return (
    <div className='relative z-10 bg-white '>
      <div className='relative lg:h-[100vh]'>
        <div className='relative'>
          <img
            src='/images/hero/Heria.webp'
            alt='Contact'
            width={1000}
            height={1000}
            className='w-full h-[100vh] lg:h-[700px] object-cover'
          />
          <div className='absolute inset-0 bg-black/45'>
            <div className='container-global flex h-full flex-col pt-30 xl:pt-40 pb-10 xl:pb-20 '>
              <h2 className='subtitle text-white xl:max-w-[500px]'>A sample description provides specific demographic details and characteristics of participants</h2>
              <div className='mt-auto flex justify-end items-end'>
                <div>
                  <img
                    src="/icons/WhiteArrow.svg"
                    alt=""
                    width={277}
                    height={280}
                    className="h-12 w-auto object-contain select-none sm:h-16 md:h-20 mb-4 sm:mb-6 md:mb-3"
                    aria-hidden={true}
                  />
                  <h1 className='heroo-title text-white text-right'>Products</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container-global lg:absolute bottom-4 right-0 z-20 w-full'>
          <div className='flex items-end justify-end'>
            <div className='w-full py-10 lg:py-0'>
              <div className='flex items-end justify-end hidden lg:block'>
                <img
                  src="/icons/BlackArrow.svg"
                  alt=""
                  width={277}
                  height={280}
                  className="h-12 w-auto object-contain select-none sm:h-16 md:h-20 mb-4 sm:mb-6 md:mb-3"
                  aria-hidden={true}
                />
              </div>
              <div className=' mt-5  lg:mt-10 h-px w-full bg-black/70 '></div>
              <h1 className='description mt-5 lg:mt-10 ml-auto lg:max-w-[60%] text-right text-black'>A sample description provides specific demographic details and characteristics of participantsA sample description provides specific demographic details and characteristics</h1>
            </div>
          </div>
        </div>
      </div>
      <Cards />
    </div>
  )
}

export default Section01
