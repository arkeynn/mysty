import { PropsWithChildren } from 'react'

export interface SectionProps {
  className?: string
}

export default function Section( {className, children}: PropsWithChildren<SectionProps> ) {
  return (
    <section className={`${className} relative flex flex-col items-center p-20`}>
      {children}
    </section>  
  )
}