import React from 'react'
import Explor from '../../buttons/Explor'
import Buyproduct from '../../buttons/Buyproduct'

function section01() {
    return (
        <section className="sticky top-0 z-10 flex h-dvh min-h-dvh w-full shrink-0 flex-col overflow-hidden container-global">

            {/* ---- VIDEO BACKGROUND ---- */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/videos/home/Hero.mp4" type="video/mp4" />
            </video>

            {/* ---- DARK OVERLAY ---- */}
            <div className="absolute inset-0 bg-black/60" />

            {/* ---- CONTENT (on top) ---- */}
            <div className="relative z-10  h-full text-center px-4">
                <div className='absolute  bottom-0 right-0 z-20'>
                    <div className='flex items-end justify-end'>
                        <img
                            src="/icons/WhiteArrow.svg"
                            alt=""
                            width={277}
                            height={280}
                            className="h-12 w-auto object-contain select-none sm:h-16 md:h-20 mb-4 sm:mb-6 md:mb-3"
                            aria-hidden={true}
                        />
                    </div>
                    <h1 className="subtitle text-right ">
                        Sri Lanka
                    </h1>

                    <h1 className="heroo-title uppercase italic text-right mt-2">
                        Become the Myth
                    </h1>
                    <h1 className="subtitlehero hidden text-right md:block xl:pl-[400px] py-4">
                        D15C1PL1N3 15 7H3 D1FF3R3NC3 B37W33N P07EN714L 4ND MY7H<br /> DRAKON exists to build that difference, one rep at a time.
                    </h1>
                    <div className='md:flex md:flex-row gap-4 items-end justify-end  mt-4 xl:mt-8'>
                        <Explor />
                        <Buyproduct />
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-center mb-16 mt-2 sm:mt-2 lg:mt-2">
                        <div className="bg-white w-full h-[1px]"></div>
                        <div>
                            <p className="est">EST.2026</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default section01