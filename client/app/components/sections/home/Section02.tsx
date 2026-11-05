import React from "react";
import PowerTainMarquee from "./PowerTainMarquee";
import Image from "next/image";
import Link from "next/link";
import Equipment from "../../buttons/Equipment";
import Buyproduct from "../../buttons/Buyproduct";

function Section02() {
    return (
        <section className="relative z-20 flex min-h-dvh flex-col bg-black shadow-[0_-12px_40px_rgba(0,0,0,0.45)]">
            <PowerTainMarquee />

            <div className="container-global py-16">
                <h2 className="subtitle text-right text-white/15">
                    Be the Myth
                </h2>
                <h2 className="hero-title text-right text-white">Who We are</h2>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div>
                    </div>
                    <div className="col-span-5">
                        <div className="flex flex-row gap-4 items-center justify-center">
                            <div className="bg-white/30 w-full h-[1px]"></div>
                            <div>
                                <p className="text-white est">EST.2020</p>
                            </div>
                        </div>
                        <div>
                            <p className="mt-6 flex md:text-end description ">
                                DRAKON is Sri Lanka's No. 1 calisthenics platform, built for every athlete who trains with nothing but bodyweight, discipline, and the will to become something more. We're not just a store, DRAKON is where the entire Sri Lankan calisthenics community comes together, one platform for everything you need to train, grow, and become part of the movement.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-16 mt-16 items-stretch">
                    <div className="col-span-2">
                        <div className="flex flex-row gap-4 items-center justify-between">
                            <div>
                                <p className="text-white text-2xl ">WHAT WE OFFER</p>
                            </div>
                            <div className="">
                                <img
                                    src="/icons/WhiteArrow.svg"
                                    alt=""
                                    width={277}
                                    height={280}
                                    className="h-10 w-auto object-contain select-none  sm:h-16 md:h-18 xl:h-24 mb-4 sm:mb-6 md:mb-3"
                                    aria-hidden={true}
                                />
                            </div>
                        </div>
                        <div className="bg-white/30 w-full h-[0.5px] ">
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-8 lg:mt-16">
                            <div>
                                <p className="text-white text-2xl ">Equipment</p>
                                <p className="small-description mt-4">
                                    Pull up bars, rings, parallettes and more. Everything you need to build your perfect calisthenics setup.
                                </p>
                                <div className="bg-white/30  w-full h-[0.5px] mt-4"></div>
                            </div>
                            <div>
                                <p className="text-white text-2xl ">Workshops</p>
                                <p className="small-description mt-4">
                                    Hands-on training events covering beginner to advanced skills led by Sri Lanka's top calisthenics athletes.
                                </p>
                                <div className="bg-white/30  w-full h-[0.5px] mt-4"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-8 lg:mt-16">
                            <div>
                                <p className="text-white text-2xl ">Coaching</p>
                                <p className="small-description mt-4">
                                    Train under certified coaches who have lived the calisthenics journey. Structured programs built for real results.
                                </p>
                                <div className="bg-white/30  w-full h-[0.5px] mt-4"></div>
                            </div>
                            <div>
                                <p className="text-white text-2xl ">Brand Promotion</p>
                                <p className="small-description mt-4">
                                    Connect your fitness brand with Sri Lanka's fastest growing calisthenics community through powerful campaigns.
                                </p>
                                <div className="bg-white/30 w-full h-[0.5px] mt-4"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-8 lg:mt-16">
                            <div>
                                <p className="text-white text-2xl ">Fitness Models</p>
                                <p className="small-description mt-4">
                                    Book Sri Lanka's top calisthenics physiques for shoots, brand campaigns, and fitness content creation.
                                </p>
                                <div className="bg-white/30  w-full h-[0.5px] mt-4"></div>
                            </div>
                            <div>
                                <p className="text-white text-2xl ">Clothing</p>
                                <p className="small-description mt-4">
                                    Performance meets street style. Wear gear built for athletes who live the calisthenics lifestyle every day.
                                </p>
                                <div className="bg-white/30 w-full h-[0.5px] mt-4"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 flex w-full items-center justify-center mt-8 sm:mt-16 md:mt-0">
                        <div className="group relative h-[320px] w-full overflow-hidden sm:h-[420px] md:h-[720px]">
                            <Image
                                src="/images/apparel/1.png"
                                alt="Hero"
                                width={1200}
                                height={600}
                                sizes="(max-width: 639px) 100vw, (max-width: 767px) 100vw, 33vw"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-0"
                            />
                            <Image
                                src="/images/apparel/2.png"
                                alt="Hero Hover"
                                width={1200}
                                height={600}
                                sizes="(max-width: 639px) 100vw, (max-width: 767px) 100vw, 33vw"
                                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                            />
                            <div className="absolute inset-x-0 bottom-6 flex justify-center items-center px-4">
                                <Link href="/Pages/Products" className="flex justify-center w-full">
                                    <Buyproduct />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section02;
