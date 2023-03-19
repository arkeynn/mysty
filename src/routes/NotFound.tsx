import { useLocation } from 'react-router-dom'

import Section from '../components/ui/Section'

export default function NotFound() {
  const {state} = useLocation();
  const {error} = state;

  return (
    <>
      <h1 className="text-4xl text-center w-full text-white p-2 bg-red-400 font-eyecatcher">Oops.. :(</h1>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f87171" fill-opacity="1" d="M0,256L144,192L288,160L432,288L576,96L720,224L864,192L1008,160L1152,192L1296,224L1440,96L1440,0L1296,0L1152,0L1008,0L864,0L720,0L576,0L432,0L288,0L144,0L0,0Z"></path></svg>

      <Section>
        <p>An error occured!</p>
        <p>ERROR: { error == null ? "Unknown." : error }</p>
      </Section>
    </>
  );
}