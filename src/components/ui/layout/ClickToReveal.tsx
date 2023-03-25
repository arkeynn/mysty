import { useState, ReactNode, ComponentPropsWithoutRef } from 'react'

import Button from './Button'

interface Props extends ComponentPropsWithoutRef<"div"> {
  text: string;
  hiddenComponent: ReactNode;
}

/**
 * Single use button, `onClick` reveals `hiddenComponent` and hides the button.
 */
export default function ClickToReveal({text, hiddenComponent, ...props}: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <div {...props}>
      <Button text={text} onClick={ () => setHidden(!hidden) } hidden={!hidden} />

      <div hidden={hidden}>
        {hiddenComponent}
      </div>
    </div>
  )
}