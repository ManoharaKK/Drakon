import React from 'react'
import DrakonMarquee from './PowerTainMarquee'


function Section04() {
    return (
        <div className='relative z-20 bg-black'>
            <div className='container-global  py-8 md:py-16'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='relative pb-20 sm:pb-24 md:pb-28'>
                        <div>
                            <h2 className='subtitle text-white uppercase'>
                                SRI LANKA
                            </h2>
                            <h1 className='title text-white uppercase'>
                                DRAKON APPAREL
                            </h1>
                            <p className='description text-white mt-4 md:pr-[100px] xl:pr-[200px]'>
                                Built to move with you. DRAKON apparel is made for athletes who train hard, every pull, every rep, every session.
                            </p>
                            <p className='description text-white mt-4 md:pr-[100px] xl:pr-[200px]'>
                                Premium, breathable fabric built to handle intense training and daily wear. Flexible stitching for full range of motion, sweat-wicking material to keep you cool, and durable construction that lasts session after session. This isn't ordinary activewear, it's DRAKON-tested gear made for real calisthenics athletes.
                            </p>
                            <div className="bg-white/30 w-full h-[1px] my-8"></div>
                        </div>
                        <div className='absolute right-0'>
                            <img
                                src="/icons/WhiteArrow.svg"
                                alt=""
                                width={277}
                                height={280}
                                className="h-12 w-auto object-contain select-none sm:h-16 md:h-20"
                                aria-hidden={true}
                            />
                        </div>
                    </div>
                    <div>
                        <img
                            src="/images/apparel/apparel.jpg"
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] object-cover"
                            aria-hidden={true}
                        />

                    </div>
                </div>
                <div className="bg-white/30 w-full h-[1px] my-8"></div>



                <div className='relative grid grid-cols-1 md:grid-cols-3'>
                    <div className='pointer-events-none absolute bottom-0 left-1/3 top-0 hidden w-px -translate-x-1/2 bg-white/30 md:block' />
                    <div className='col-span-1'>
                        <h2 className='text-white subtitle uppercase'>WHAT WE OFFER</h2>
                        <div className="bg-white/30 w-3/4 h-[1px] my-8"></div>
                    </div>

                    <div className='col-span-2'>
                        <div>
                            <div className='relative grid grid-cols-1 md:grid-cols-2  py-8 lg:py-16'>
                                <div className='pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-white/30 md:block' />
                                <div className='px-8'>
                                    <h3 className='text-white subtitle uppercase'>
                                        Coaching
                                    </h3>
                                    <p className='text-white mt-4'>
                                        Train with expert coaches using clear programs designed for sustainable strength and skill development.
                                    </p>
                                </div>

                                <div className='px-8 mt-8 md:mt-0'>
                                    <h3 className='text-white subtitle uppercase'>
                                        Workshops
                                    </h3>
                                    <p className='text-white mt-4'>
                                        Hands-on sessions help you master techniques faster with practical corrections and athlete-led demonstrations.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='relative grid grid-cols-1 md:grid-cols-2  md:py-8 lg:py-16 '>
                                <div className='pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-white/30 md:block' />
                                <div className='px-8'>
                                    <h3 className='text-white subtitle uppercase'>
                                        Coaching
                                    </h3>
                                    <p className='text-white mt-4'>
                                        Train with expert coaches using clear programs designed for sustainable strength and skill development.
                                    </p>
                                </div>

                                <div className='px-8 mt-8 md:mt-0'>
                                    <h3 className='text-white subtitle uppercase'>
                                        Workshops
                                    </h3>
                                    <p className='text-white mt-4'>
                                        Hands-on sessions help you master techniques faster with practical corrections and athlete-led demonstrations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Section04