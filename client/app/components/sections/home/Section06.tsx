import React from 'react'

const faq = [
    {
        question: 'What is DRAKON?',
        answer: 'DRAKON is Sri Lanka\'s one and only dedicated calisthenics platform, built for athletes, beginners, and everyone ready to unlock their true strength. From coaching to gear, workshops to fitness models we are the island\'s calisthenics culture.'
    },
    {
        question: 'Who can join DRAKON programs?',
        answer: 'Anyone can join, from complete beginners to advanced athletes. We tailor guidance based on your current level and goals.'
    },
    {
        question: 'Do you provide coaching plans?',
        answer: 'Yes. We offer structured coaching plans focused on strength, skill progression, mobility, and consistency.'
    },
    {
        question: 'What services do you offer?',
        answer: 'We offer coaching, workshops, equipment support, fitness model services, and brand promotion opportunities.'
    },
    {
        question: 'Can I join if I have no equipment?',
        answer: 'Yes. Many programs include bodyweight-focused progressions and recommendations for minimal starter equipment.'
    },
    {
        question: 'How do I contact DRAKON?',
        answer: 'You can contact us through our social channels or the contact page to inquire about training, workshops, and collaborations.'
    }
]
function Section06() {
  return (
    <div className='relative z-20 bg-white'>
        <div className='container-global py-8 md:py-16'>
            <div className='flex flex-row items-end justify-end'>
        <img
                                src="/icons/BlackArrow.svg"
                                alt=""
                                width={277}
                                height={280}
                                className="h-12 w-auto object-contain select-none sm:h-16 md:h-20 mb-4 sm:mb-6 md:mb-3"
                                aria-hidden={true}
                            />
                            </div>
            <div className='h-[1px] bg-black/30 w-full mb-8'>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                <div className='col-span-2'>
                    <h2 className='title text-black uppercase'>
                    Support FAQs
                    </h2>
                    <p className='description text-black mt-4 md:pr-[100px] xl:pr-[200px] mt-8'>
                    DRAKON answers everything you need to know—from training to gear, helping you unlock your full potential.
                    </p>
                </div>
                <div className='col-span-3'>
                   
                    <div className='mt-6 space-y-3'>
                        {faq.map((item, index) => (
                            <details
                                key={`${item.question}-${index}`}
                                className='group border-b border-black/30 pb-3'
                            >
                                <summary className='cursor-pointer list-none pt-1 text-black subtitle uppercase'>
                                    <span className='flex items-center justify-between gap-3 font-bold'>
                                        {item.question}
                                        <span className='text-black/70 transition-transform group-open:rotate-45'>+</span>
                                    </span>
                                </summary>
                                <p className='description mt-3 text-black/85'>
                                    {item.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Section06