import React from 'react'
import Link from 'next/link'
import Equipment from './buttons/Equipment'
import Footerbutton from './buttons/Footerbutton'

//dad
function Footer() {
  return (
    <footer className='relative z-20 bg-black pt-16  '>

      <div className='container-global'>
        <div className='bg-white/30 h-[1px] w-full'></div>
        <div className='relative overflow-hidden  bg-black px-6 pb-25  sm:px-10 sm:pb-30 lg:px-14 lg:pb-36 pt-5 sm:pt-5 lg:pt-20 xl:pt-30 2xl:pt-30 text-white'>
          {/* Large background word */}
          <div className='pointer-events-none absolute inset-x-[-70px]  bottom-[-60px] sm:bottom-[-40px] md:bottom-[-100px] lg:bottom-[-100px] text-[140px] sm:text-[160px] md:text-[200px] lg:text-[220px] font-bold leading-none text-white select-none'>
            DRAKON
          </div>

          {/* Top content */}
          <div className='flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between'>
            {/* Logo + CTA */}
            <div className='flex-1 space-y-4'>
              <div className='relative w-full max-w-sm overflow-hidden rounded-[40px]  py-10  sm:py-12'>
                <div className='text-[64px] sm:text-[80px] lg:text-[96px] font-bold leading-none'>
                  DRAKON
                </div>
              </div>
              <div>
                <h2 className='subtitle-2 text-white'>
                  Be the 1%
                </h2>
                <p className='description mt-2 text-sm sm:text-base text-white/90'>
                  Become part of the 1% who train with purpose. Drakon brings Sri Lanka&apos;s
                  calisthenics athletes together to learn, compete, and rise as one community.
                  Your strongest self starts here.
                </p>
                <div className='mt-4 flex flex-wrap items-center gap-3'>
                  <Footerbutton />
                  <Footerbutton label='Products' href='/Pages/Products' />
                </div>
              </div>
            </div>

            {/* Link columns */}
            <div className='flex-1 grid grid-cols-1 gap-8 sm:grid-cols-2 text-sm'>
              <div>
                <h3 className='font-semibold text-white'>Pages</h3>
                <ul className='mt-3 space-y-2 text-white/80'>
                  <li>
                    <Link href='/' className='hover:underline'>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href='/Pages/Products' className='hover:underline'>
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href='/Pages/Workshop' className='hover:underline'>
                      Workshop
                    </Link>
                  </li>
                  <li>
                    <Link href='/Pages/Contacts' className='hover:underline'>
                      Contacts
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='font-semibold text-white'>Connect</h3>
                <ul className='mt-3 space-y-2 text-white/80'>
                  <li>kavindamanoharak@gmail.com</li>
                  <li>+94 75 494 7171</li>
                  <li className='flex gap-3 pt-1'>
                    <span className='h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs'>
                      in
                    </span>
                    <span className='h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs'>
                      X
                    </span>
                    <span className='h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs'>
                      IG
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className='mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/20 pt-4 text-xs text-white/70 sm:flex-row sm:text-sm'>
            <p>© 2026 drakon calisthenics. All rights reserved.</p>
            <div className='flex items-center gap-4'>
              <Link href='#' className='hover:underline'>
                Privacy Policy
              </Link>
              <Link href='#' className='hover:underline'>
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer