"use client"

import React from 'react'

const WHATSAPP_NUMBER = '94754947171'

function Buyproduct() {
  const handleClick = () => {
    const message = encodeURIComponent(
      `Hi DRAKON! 👋\nI'm interested in purchasing your products.\nCould you please help me? 🛒`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className='bg-white text-black border border-white py-2.5 px-6 w-full md:w-[300px] text-center transition-colors duration-300 hover:bg-black hover:text-white cursor-pointer font-medium uppercase'
    >
      Buy Now
    </button>
  )
}

export default Buyproduct