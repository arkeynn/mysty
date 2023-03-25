import { ComponentPropsWithoutRef } from 'react'

interface Props extends ComponentPropsWithoutRef<"button"> {
  text: string;
}

export default function Button({text, ...props}: Props) {
  return (
    <button {...props}>
      {text}
    </button>
  )
}