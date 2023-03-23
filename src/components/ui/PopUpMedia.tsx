import { useState } from 'react'

type PopUpMediaProps = {
  src: string;
}

export default function PopUpMedia( {src}: PopUpMediaProps ) {
  const [opened, setOpened] = useState(false);

  const openPopUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    setOpened(!opened);
  };
  const closePopUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    
    setOpened(!opened);
  };

  if (opened) {
    return (
      <div onClick={(e) => openPopUp(e)} className="flex flex-col items-center text-black border-2 border-black gap-4 p-2 bg-amber-400 rounded">
          <div className="flex flex-row gap-4">
            <p>▲</p>
            <p>Media available!</p>
          </div>

          <img className="max-h-xs max-w-md rounded border-2 border-black" src={src} />
      </div>
    )
  } else {
    return (
      <div onClick={(e) => closePopUp(e)} className="flex flex-row text-black border-2 border-black gap-4 p-2 bg-amber-400 rounded">
        <p>▼</p>
        <p>Media available!</p>
      </div>
    )
  }
}