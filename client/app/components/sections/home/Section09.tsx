import React from 'react'

const brands = [
  "Nike",
  "Puma",
  "MyProtein",
  "Red Bull",
  "Under Armour",
  "Gymshark",
];

function Section09() {
  return (
    <section className='relative z-20 bg-black'>
      <div className='container-global py-10 md:py-16'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div>
            <h2 className='subtitle text-white uppercase'>Collaborations</h2>
            <h3 className='title text-white uppercase'>Brands We Work With</h3>
          </div>
          <p className='description max-w-2xl text-white/80 md:text-right'>
            We collaborate with fitness, wellness, and lifestyle brands to
            create campaigns, events, and athlete partnerships that bring real
            value to Sri Lanka&apos;s calisthenics community.
          </p>
        </div>

        <div className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
          {brands.map((brand) => (
            <div
              key={brand}
              className='flex h-20 items-center justify-center border border-white/25 bg-white/5 text-center text-sm font-semibold uppercase tracking-wide text-white sm:h-24'
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section09