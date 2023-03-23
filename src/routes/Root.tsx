import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

import Username from '../components/ui/forms/Username'
import Login from '../components/ui/forms/Login'
import SignUp from '../components/ui/forms/SignUp'

export default function Root() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Check if user is already logged in their account.
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) { setIsAlreadyLoggedIn(true); } 
      else { setIsAlreadyLoggedIn(false); }
    });
  }, []);

  return (
    <>
      <section className="text-center font-eyecatcher">
        <h1 className="mb-2 text-4xl" >mysty ;)</h1>
        <p className="text-lg" >Send anonymous letters..</p>
        <p className="mb-4 text-lg" >Receive anonymous letters..</p>

        <button hidden={isLoggingIn || isAlreadyLoggedIn}  onClick={() => setIsLoggingIn(!isLoggingIn)} className="p-1 px-4 bg-transparent border-2 border-white rounded">Log In</button>
        <button hidden={!isAlreadyLoggedIn}  onClick={() => navigate("/home")} className="p-1 px-4 bg-transparent border-2 border-white rounded">Open</button>
        <Login hidden={!isLoggingIn}  />
      </section>

      <svg className="block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#7c3aed" fill-opacity="1" d="M0,160L18.5,149.3C36.9,139,74,117,111,101.3C147.7,85,185,75,222,96C258.5,117,295,171,332,202.7C369.2,235,406,245,443,229.3C480,213,517,171,554,160C590.8,149,628,171,665,160C701.5,149,738,107,775,106.7C812.3,107,849,149,886,160C923.1,171,960,149,997,149.3C1033.8,149,1071,171,1108,197.3C1144.6,224,1182,256,1218,224C1255.4,192,1292,96,1329,69.3C1366.2,43,1403,85,1422,106.7L1440,128L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path></svg>
      <section className="text-center bg-violet-600 font-eyecatcher">
        <h1 className="mb-2 text-4xl" >Want to receive?</h1>
        <p className="text-lg" >You'll need to create an account.</p>
        <p className="mb-4 text-lg" >You can share invite links for your fans to send letters.</p>

        <button hidden={isSigningUp} onClick={() => setIsSigningUp(!isSigningUp)} className="p-1 px-4 bg-transparent border-2 border-white rounded">Sign Up</button>
        <SignUp hidden={!isSigningUp} /> 
      </section>
      <svg className="block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#7c3aed" fill-opacity="1" d="M0,160L18.5,149.3C36.9,139,74,117,111,101.3C147.7,85,185,75,222,96C258.5,117,295,171,332,202.7C369.2,235,406,245,443,229.3C480,213,517,171,554,160C590.8,149,628,171,665,160C701.5,149,738,107,775,106.7C812.3,107,849,149,886,160C923.1,171,960,149,997,149.3C1033.8,149,1071,171,1108,197.3C1144.6,224,1182,256,1218,224C1255.4,192,1292,96,1329,69.3C1366.2,43,1403,85,1422,106.7L1440,128L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"></path></svg>
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ec4899" fill-opacity="1" d="M0,160L12.6,160C25.3,160,51,160,76,176C101.1,192,126,224,152,202.7C176.8,181,202,107,227,69.3C252.6,32,278,32,303,74.7C328.4,117,354,203,379,234.7C404.2,267,429,245,455,240C480,235,505,245,531,224C555.8,203,581,149,606,117.3C631.6,85,657,75,682,74.7C707.4,75,733,85,758,112C783.2,139,808,181,834,197.3C858.9,213,884,203,909,181.3C934.7,160,960,128,985,128C1010.5,128,1036,160,1061,165.3C1086.3,171,1112,149,1137,149.3C1162.1,149,1187,171,1213,165.3C1237.9,160,1263,128,1288,133.3C1313.7,139,1339,181,1364,181.3C1389.5,181,1415,139,1427,117.3L1440,96L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"></path></svg>
      <section className="text-center bg-pink-500 font-eyecatcher">
        <h1 className="mb-2 text-4xl" >Want to send?</h1>
        <p className="text-lg" >You don't need an account to send letters.</p>
        <p className="mb-4 text-lg" >You will need their username, or an invite link.</p>

        <button hidden={isSending} onClick={() => setIsSending(!isSending)} type="submit" className="p-1 px-4 bg-transparent border-2 border-white rounded">Send a Letter!</button>
        <Username className="flex flex-col items-center justify-center" hidden={!isSending} />
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ec4899" fill-opacity="1" d="M0,32L12.6,42.7C25.3,53,51,75,76,80C101.1,85,126,75,152,96C176.8,117,202,171,227,165.3C252.6,160,278,96,303,74.7C328.4,53,354,75,379,101.3C404.2,128,429,160,455,181.3C480,203,505,213,531,197.3C555.8,181,581,139,606,106.7C631.6,75,657,53,682,64C707.4,75,733,117,758,154.7C783.2,192,808,224,834,218.7C858.9,213,884,171,909,154.7C934.7,139,960,149,985,133.3C1010.5,117,1036,75,1061,85.3C1086.3,96,1112,160,1137,197.3C1162.1,235,1187,245,1213,213.3C1237.9,181,1263,107,1288,69.3C1313.7,32,1339,32,1364,42.7C1389.5,53,1415,75,1427,85.3L1440,96L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z"></path></svg>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fbbf24" fill-opacity="1" d="M0,128L240,288L480,32L720,160L960,32L1200,288L1440,224L1440,320L1200,320L960,320L720,320L480,320L240,320L0,320Z"></path></svg>
      <section className="text-center bg-amber-400 font-eyecatcher">
        <h1 className="mb-2 text-4xl" >CAUTION</h1>
        <p className="text-lg" >Do NOT share sensitive information.</p>
        <p className="text-lg" >Follow common sense, and practice internet safety!</p>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fbbf24" fill-opacity="1" d="M0,128L240,288L480,32L720,160L960,32L1200,288L1440,224L1440,0L1200,0L960,0L720,0L480,0L240,0L0,0Z"></path></svg>
    </>
  )
}