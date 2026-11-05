import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import CircularText from '@/components/common/Circle'
function Section01() {
  return (
    <div className='relative z-10 bg-black pt-10 lg:pt-26'>
      <div className='grid grid-cols-1 lg:grid-cols-4 '>
        <div className='col-span-1 lg:col-span-3 bg-white p-4 sm:p-8 lg:p-12 xl:p-16 2xl:p-24 relative overflow-hidden'>
          <div>
            <div className=' container-global'>
              <h1 className='title  text-black'>
                Let’s Talk — We’re Here to Help You
              </h1>
              <p className='description text-black  mb-8 lg:mb-12 xl:mb-16 2xl:mb-16'>
                We’re here to answer your questions and help you whenever you need
              </p>
              <div className='grid lg:grid-cols-3 gap-4 mt-4'>
                <div>
                  <p className='description text-black '>
                    REACH THE DRAKON. LET'S BUILD YOUR MYTH TOGETHER
                  </p>
                </div>
                <div>
                  <h2 className='subtitle-2 font-semibold text-black '>
                    Phone Number
                  </h2>
                  <p className='description text-black '>
                    +94 75 494 7171
                  </p>
                  <div className='mt-12'>
                    <h2 className='subtitle-2 font-semibold text-black '>
                      Office Location
                    </h2>
                    <p className='description text-black '>
                      270/F, Kadawatha Road, Ganemulla
                    </p>
                  </div>

                </div>
                <div>
                  <h2 className='subtitle-2 font-semibold text-black '>
                    Email Address
                  </h2>
                  <p className='description text-black '>
                    kavindamanoharak@gmail.com
                  </p>
                  <div>
                    <div className='mt-12'>
                      <h2 className='subtitle-2 font-semibold text-black '>
                        Social Media
                      </h2>
                      <div className='mt-3 space-y-2 text-black'>
                        <div className='flex items-center gap-2'>
                          <FaFacebookF className='text-black' />
                          <Link
                            href='https://www.facebook.com/vertex.academy'
                            className='text-black transition-opacity hover:opacity-80'
                          >
                            Facebook
                          </Link>
                        </div>
                        <div className='flex items-center gap-2'>
                          <FaInstagram className='text-black' />
                          <Link
                            href='https://www.instagram.com/vertex.academy'
                            className='text-black transition-opacity hover:opacity-80'
                          >
                            Instagram
                          </Link>
                        </div>
                        <div className='flex items-center gap-2'>
                          <FaLinkedinIn className='text-black' />
                          <Link
                            href='https://www.linkedin.com/company/vertex-academy'
                            className='text-black transition-opacity hover:opacity-80'
                          >
                            LinkedIn
                          </Link>
                        </div>
                        <div className='flex items-center gap-2'>
                          <FaXTwitter className='text-black' />
                          <Link
                            href='https://x.com/vertex_academy'
                            className='text-black transition-opacity hover:opacity-80'
                          >
                            X (Twitter)
                          </Link>
                        </div>
                        <div className='flex items-center gap-2'>
                          <FaYoutube className='text-black' />
                          <Link
                            href='https://www.youtube.com/@vertex-academy'
                            className='text-black transition-opacity hover:opacity-80'
                          >
                            YouTube
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <form>
                {/* contact form content can go here */}
              </form>
            </div>
            {/* Circular text badge */}
            <div className='absolute bottom-6 right-6 lg:left-6 lg:right-auto'>
              <CircularText text=' VertexAcademy' />
            </div>
          </div>

        </div>
        <div className='container-global flex justify-end'>
          <img
            src="/icons/WhiteArrow.svg"
            alt=""
            width={277}
            height={280}
            className="h-10 w-auto rotate-90 object-contain select-none items-end sm:h-16 md:h-18 xl:h-24 mb-4 sm:mb-6 md:mb-3"
            aria-hidden={true}
          />
        </div>
        {/* <div className='hidden lg:block col-span-1 lg:col-span-1 rounded-br-[40px] rounded-tr-[40px] overflow-hidden'>
          <Image
            src='/images/contact/Contact.jpg'
            alt='Contact'
            width={1000}
            height={1000}
            className='w-full h-full object-cover'
          />
        </div> */}
        {/* test */}
        {/* test2 */}

      </div>

    </div>
  )
}

export default Section01