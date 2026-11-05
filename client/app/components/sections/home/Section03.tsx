import React from 'react'
import Image from 'next/image'
import Equipment from '../../buttons/Equipment'

function Section03() {
    return (
        <div className='relative z-20 bg-white'>
            <div className='container-global py-8 md:py-16'>
                <div className=''>
                    <div className='flex flex-col sm:flex-row gap-2 items-start sm:items-end justify-between'>
                        <div className='order-2 sm:order-1'>
                            <h1 className='title text-black'>
                                WHAT WE CAN DO FOR <br /> YOU CALISTHENICS
                            </h1>
                        </div>
                        <div className='order-1 sm:order-2 w-full sm:w-auto flex justify-end'>
                            <img
                                src="/icons/BlackArrow.svg"
                                alt=""
                                width={277}
                                height={280}
                                className="h-12 w-auto object-contain select-none sm:h-16 md:h-20 mb-4 sm:mb-6 md:mb-3"
                                aria-hidden={true}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 items-center justify-center my-3">
                        <div>
                            <p className="text-black est">EST.2020</p>
                        </div>
                        <div className="bg-black/30 w-full h-[1px]"></div>

                    </div>
                    <p className='description !text-black  md:pr-[100px] xl:pr-[200px]'>
                        Ware a team of dedicated professionals who are passionate about helping you achieve your goals.Performance meets street style. Wear gear built for athletes who live the calisthenics lifestyle every day.
                    </p>
                </div>
                <div className='mt-5'>
                    <div className='relative'>
                        <div className='relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[520px]'>
                            <Image
                                src="/images/hero/Heria.jpg"
                                alt="Responsive image"
                                fill
                                sizes="100vw"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className='absolute inset-0 bg-black/45'></div>
                            <div className='absolute inset-x-0 bottom-14 z-10 p-4 sm:p-5'>
                                <h3 className='text-lg font-bold text-white sm:text-xl'>DRAKON Community</h3>
                                <p className='text-white/90 text-sm sm:text-base mt-1'>Stronger Together</p>
                                <p className='small-description text-white mt-2'>
                                    We bring athletes and beginners together through structured
                                    training, practical coaching, and real community support.
                                </p>
                            </div>
                        </div>
                        <div className='absolute inset-x-0 bottom-0 flex items-end '>
                            <Equipment />
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                        <div className='relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[520px]'>
                            <Image
                                src="/images/hero/Heria.webp"
                                alt="Responsive image"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className='absolute inset-0 bg-black/45'></div>
                            <div className='absolute inset-x-0 bottom-14 z-10 p-4 sm:p-5'>
                                <h3 className='text-lg font-bold text-white sm:text-xl'>Equipment</h3>
                                <p className='text-white/90 text-sm sm:text-base mt-1'>Built for Performance</p>
                                <p className='small-description text-white mt-2'>
                                    From pull-up bars to rings and parallettes, we provide
                                    reliable equipment for consistent progress.
                                </p>
                            </div>
                            <div className='absolute inset-x-0 bottom-0 flex items-end'>
                                <Equipment />
                            </div>
                        </div>
                        <div className='relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[520px]'>
                            <Image
                                src="/images/hero/Heria.webp"
                                alt="Responsive image"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className='absolute inset-0 bg-black/45'></div>
                            <div className='absolute inset-x-0 bottom-14 z-10 p-4 sm:p-5'>
                                <h3 className='text-lg font-bold text-white sm:text-xl'>Coaching</h3>
                                <p className='text-white/90 text-sm sm:text-base mt-1'>Guidance That Works</p>
                                <p className='small-description text-white mt-2'>
                                    Train with expert coaches using clear programs designed for
                                    sustainable strength and skill development.
                                </p>
                            </div>
                            <div className='absolute inset-x-0 bottom-0 flex items-end'>
                                <Equipment />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-3'>
                        <div className='relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[520px] md:col-span-2'>
                            <Image
                                src="/images/hero/Heria.webp"
                                alt="Responsive image"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className='absolute inset-0 bg-black/45'></div>
                            <div className='absolute inset-x-0 bottom-14 z-10 p-4 sm:p-5'>
                                <h3 className='text-lg font-bold text-white sm:text-xl'>Workshops</h3>
                                <p className='text-white/90 text-sm sm:text-base mt-1'>Learn by Doing</p>
                                <p className='small-description text-white mt-2'>
                                    Hands-on sessions help you master techniques faster with
                                    practical corrections and athlete-led demonstrations.
                                </p>
                            </div>
                            <div className='absolute inset-x-0 bottom-0 flex items-end'>
                                <Equipment />
                            </div>
                        </div>
                        <div className='relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[520px]'>
                            <Image
                                src="/images/hero/Heria.webp"
                                alt="Responsive image"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className='absolute inset-0 bg-black/45'></div>
                            <div className='absolute inset-x-0 bottom-14 z-10 p-4 sm:p-5'>
                                <h3 className='text-lg font-bold text-white sm:text-xl'>Brand Promotion</h3>
                                <p className='text-white/90 text-sm sm:text-base mt-1'>Visibility with Impact</p>
                                <p className='small-description text-white mt-2'>
                                    Connect your fitness brand with a focused calisthenics
                                    audience through campaigns and content collaborations.
                                </p>
                            </div>
                            <div className='absolute inset-x-0 bottom-0 flex items-end'>
                                <Equipment />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                        <div className='relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[520px]'>
                            <Image
                                src="/images/hero/Heria.webp"
                                alt="Responsive image"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className='absolute inset-0 bg-black/45'></div>
                            <div className='absolute inset-x-0 bottom-14 z-10 p-4 sm:p-5'>
                                <h3 className='text-lg font-bold text-white sm:text-xl'>Fitness Models</h3>
                                <p className='text-white/90 text-sm sm:text-base mt-1'>Elite Athlete Profiles</p>
                                <p className='small-description text-white mt-2'>
                                    Work with top physiques for shoots, campaigns, and
                                    authentic fitness storytelling that performs.
                                </p>
                            </div>
                            <div className='absolute inset-x-0 bottom-0 flex items-end'>
                                <Equipment />
                            </div>
                        </div>
                        <div className='relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[520px]'>
                            <Image
                                src="/images/hero/Heria.webp"
                                alt="Responsive image"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className='absolute inset-0 bg-black/45'></div>
                            <div className='absolute inset-x-0 bottom-14 z-10 p-4 sm:p-5'>
                                <h3 className='text-lg font-bold text-white sm:text-xl'>Clothing</h3>
                                <p className='text-white/90 text-sm sm:text-base mt-1'>Performance Streetwear</p>
                                <p className='small-description text-white mt-2'>
                                    Comfortable, durable apparel made for training intensity
                                    and everyday movement in the calisthenics lifestyle.
                                </p>
                            </div>
                            <div className='absolute inset-x-0 bottom-0 flex items-end'>
                                <Equipment />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section03