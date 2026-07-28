"use client"

import Image from 'next/image'
import logo from '../../../../public/logo.png'

type Image3DProps = {
  src?: string
  lightSrc?: string
  darkSrc?: string
  alt?: string
  direction?: 'left' | 'right' | 'center'
  className?: string
}

export function Image3D({
  alt,
  src,
  lightSrc,
  darkSrc,
  direction = 'center',
  className,
}: Image3DProps) {
  const imageSrc = src ?? lightSrc ?? logo
  const darkImageSrc = src ?? darkSrc ?? logo
  const objectPosition =
    direction === 'left' ? 'object-left' : direction === 'right' ? 'object-right' : 'object-center'

  return (
    <div
      className={`
        relative
        transform-gpu
        transition-all
        duration-300
        hover:scale-105
        hover:rotate-1
        ${className}
      `}
    >
      <Image
        src={imageSrc}
        alt={`${alt || 'image'} - Light Mode`}
        width={1200}
        height={800}
        className={`block w-full h-auto rounded-2xl shadow-2xl dark:hidden ${objectPosition}`}
      />
      <Image
        src={darkImageSrc}
        alt={`${alt || 'image'} - Dark Mode`}
        width={1200}
        height={800}
        className={`hidden w-full h-auto rounded-2xl shadow-2xl dark:block ${objectPosition}`}
      />
    </div>
  )
}