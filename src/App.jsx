import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactereAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useref hook
  const passwordref = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charactereAllowed) {
      str += "!@#$%^&*()+=-_[]{}~";


    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)

    }
    setPassword(pass);

  }, [length, numberAllowed, charactereAllowed, setPassword])
  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 10)
    console.log(password.length)
    if (password.length > 10) {
      let pa = password.substring(0, 10);
      window.navigator.clipboard.writeText(pa);
    }
    else {
      window.navigator.clipboard.writeText(password);
    }


  }, [password])
  useEffect(() => { passwordGenerator(); }, [length, numberAllowed, charactereAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-96 shadow-md rounded-lg px-4 py-3 my-8 text-orange-400 bg-gray-500'>
        <h1 className="text-white text-center my-3 text-2xl">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordref} />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 '>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setlength(e.target.value)
                console.log(e)
              }} />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charactereAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
