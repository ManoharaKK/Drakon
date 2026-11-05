import React from 'react'

function section05() {
    return (
        <div className='relative z-20 bg-black '>
            <div className='container-global py-8 md:py-16'>
                <div className='flex flex-row items-end justify-between'>
                    <h1 className='text-white hero-title'>
                        WHY DRAKON EQUIPMENT
                    </h1>
                    <img
                        src="/icons/WhiteArrow.svg"
                        alt=""
                        width={277}
                        height={280}
                        className="h-12 w-auto object-contain select-none sm:h-16 md:h-20"
                        aria-hidden={true}
                    />
                </div>
                <div className='bg-white/30 w-full h-[1px] my-8'></div>

                {/* Mobile + small: paired image/content order */}
                <div className='grid grid-cols-1 gap-4 md:hidden'>
                    <div>
                        <img
                            src="/images/hero/kavinda1.webp"
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-full h-[300px] sm:h-[400px] object-cover"
                            aria-hidden={true}
                        />
                    </div>
                    <div className='p-6 sm:p-8 flex justify-end flex-col'>
                        <h2 className='text-white subtitle uppercase'>World&apos;s Best Beech Wood</h2>
                        <p className='text-white/80 description mt-4'>
                            Crafted from premium beech wood sourced globally, built for durability, strength, and a natural grip that lasts through every session.
                        </p>
                    </div>
                    <div>
                        <img
                            src="/images/hero/kavinda3.webp"
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-full h-[300px] sm:h-[400px] object-cover"
                            aria-hidden={true}
                        />
                    </div>
                    <div className='p-6 sm:p-8 flex justify-end flex-col'>
                        <h2 className='text-white subtitle uppercase'>Powder-Coated Steel</h2>
                        <p className='text-white/80 description mt-4'>
                            Reinforced with powder-coated steel for maximum strength, rust resistance, and long-term durability, built to handle serious training loads.
                        </p>
                    </div>
                    <div>
                        <img
                            src="/images/hero/kavinda2.webp"
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-full h-[300px] sm:h-[400px] object-cover"
                            aria-hidden={true}
                        />
                    </div>
                    <div className='p-6 sm:p-8 flex justify-end flex-col'>
                        <h2 className='text-white subtitle uppercase'>Easy Assembly</h2>
                        <p className='text-white/80 description mt-4'>
                            Designed for quick, hassle-free assembly, so you spend less time building and more time training.
                        </p>
                    </div>
                </div>

                {/* md+ : keep original desktop design */}
                <div className='relative hidden grid-cols-1 md:grid md:grid-cols-3 gap-4'>
                    <div>
                        <img
                            src="/images/product/beechwood.webp"
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-full h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[600px] object-cover"
                            aria-hidden={true}
                        />
                    </div>
                    <div className='p-8 flex justify-end flex-col'>
                        <div>
                            <h2 className='text-white subtitle uppercase'>
                                World's Best Beech Wood
                            </h2>

                            <p className='text-white/80 description mt-4'>
                                Crafted from premium beech wood sourced globally, built for durability, strength, and a natural grip that lasts through every session.
                            </p>
                        </div>
                    </div>
                    <div className='pointer-events-none absolute bottom-0 left-2/3 top-0 hidden w-px -translate-x-1/2 bg-white/30 md:block' />
                    <div className='p-8'>
                        <h2 className='text-white subtitle uppercase'>
                            Powder-Coated Steel
                        </h2>

                        <p className='text-white/80 description mt-4'>
                            Reinforced with powder-coated steel for maximum strength, rust resistance, and long-term durability, built to handle serious training loads.
                        </p>
                    </div>
                </div>

                <div className='relative hidden grid-cols-1 md:grid md:grid-cols-3 gap-4 mt-8'>
                    <div className='pointer-events-none absolute bottom-0 left-0/3 top-0 hidden w-px -translate-x-1/2 bg-white/30 md:block'>
                    </div>
                    <div className='p-8 flex items- justify-end flex-col'>
                        <h2 className='text-white subtitle uppercase'>
                            Easy Assembly
                        </h2>

                        <p className='text-white/80 description mt-4'>
                            Designed for quick, hassle-free assembly, so you spend less time building and more time training.
                        </p>
                    </div>
                    <div>
                        <img
                            src="/images/hero/kavinda2.webp"
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-full h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[600px] object-cover"
                            aria-hidden={true}
                        />
                    </div>
                    <div>
                        <img
                            src="/images/product/powdercoating.png"
                            alt=""
                            width={1000}
                            height={1000}
                            className="w-full h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[600px] object-cover"
                            aria-hidden={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default section05