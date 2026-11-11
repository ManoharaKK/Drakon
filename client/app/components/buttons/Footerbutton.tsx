import React from 'react'
import Link from 'next/link'

type FooterbuttonProps = {
  label?: string
  href?: string
}

function Footerbutton({ label = 'Explore Now', href }: FooterbuttonProps) {
  const className =
    'footer-button block w-full text-center transition-colors duration-300 hover:bg-white hover:text-black'

  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    )
  }

  return <div className={className}>{label}</div>
}

export default Footerbutton
