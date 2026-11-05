import React from 'react'
import ImageTrail from './WorkshopHero'
import Section02 from '@/app/components/Workshops/Section02'
import WorkshopPageSections from '@/app/components/Workshops/WorkshopPageSections'
import Footer from '@/app/components/Footer'

function page() {
  return (
    <div className="relative z-10 bg-black">
      <div className="w-full">
        <div className="relative h-dvh w-full overflow-hidden">
          <div className="relative  h-full w-full">
            <ImageTrail
              backgroundVideoSrc="/videos/home/Hero.mp4"
              
              items={[
                "https://picsum.photos/id/287/300/300",
                "https://picsum.photos/id/1001/300/300",
                "https://picsum.photos/id/1025/300/300",
                "https://picsum.photos/id/1026/300/300",
                "https://picsum.photos/id/1027/300/300",
                "https://picsum.photos/id/1028/300/300",
                "https://picsum.photos/id/1029/300/300",
                "https://picsum.photos/id/1030/300/300",
              ]}
              variant={1}
            />
          </div>
          {/* Above ImageTrail (z-100); pointer-events-none keeps cursor trail interactive underneath */}
          <div className="pointer-events-none absolute inset-0 z-110 pt-16">
            <div className="container-global flex h-full flex-col justify-between pt-10 pb-8 md:pt-14 lg:pt-16">
              <header>
                <p className="subtitle mb-2 text-white/60">
                  DRAKON · Movement &amp; skill
                </p>
                <p className="description mt-4 max-w-2xl text-white/85">
                  We offer professional calisthenics workshops designed for all levels —
                  from beginners to advanced athletes. Learn strength, control, and
                  movement the right way.
                </p>
              </header>
              <div className="mt-auto flex w-full flex-col items-end gap-2 md:gap-3">
                <footer className="text-right">
                  <p className="subtitle mb-2 max-w-xl text-white/70 md:ml-auto">
                    Bring the power of bodyweight training to your gym, school, or
                    community.
                  </p>
                  <h1 className="heroo-title text-white">Calisthenics workshops</h1>
                  
                </footer>
                <img
                  src="/icons/WhiteArrow.svg"
                  alt=""
                  width={277}
                  height={280}
                  className="h-12 w-auto object-contain select-none sm:h-16 md:h-20"
                  aria-hidden
                />
                <div className="h-px w-full bg-white/30" />
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <WorkshopPageSections />
      <Section02 />
      <Footer />
    </div>
  );
}

export default page