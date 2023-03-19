type ClosedLetterProps = {
  letter: Letter
}

type Letter = {
  title: string,
  content: string,
  hint: string,
  timestamp: number
}

export default function ClosedLetter({ letter }: ClosedLetterProps) {
  return (
    <div className="flex flex-row w-full gap-4 bg-neutral-600 overflow-hidden">
      <p>{letter.title}</p>
      <p>{letter.content}</p>
      <p>{letter.timestamp}</p>
    </div>
  );
}