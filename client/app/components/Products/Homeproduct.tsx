import React from 'react'
import Cards from './Cards'

function Homeproduct() {
    return (
        <div className='relative z-10 bg-white pb-16 md:pb-24'>
            <div className='container-global z-20 w-full py-8 lg:py-12'>
                <div className='flex items-end justify-end'>
                    <div className='w-full'>
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
                        <div className='mt-5 lg:mt-10 h-px w-full bg-black/70'></div>
                        <h1 className='description mt-5 lg:mt-10 ml-auto lg:max-w-[60%] text-right text-black'>
                            Every DRAKON product, from equipment to apparel to nutrition, is built with one standard: no shortcuts, just quality that fuels your journey from potential to myth.
                        </h1>
                    </div>
                </div>
            </div>
            <Cards />
        </div>
    )
}

export default Homeproduct