import { useCallback, useEffect, useState,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

 const passwordRef =  useRef(null)

  let passwordGenerator = useCallback( () => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+-={}[]:;<>,.?/|~"

    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed])

  const  copyPasswordToClickboard = useCallback( ()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(() =>
  {
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
  <>
  <div className="w-full h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center">
    <button className="text-4xl font-bold bg-white text-green-500 px-6 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
      PASSWORD GENERATOR
    </button>
    
    <div className="mt-10 w-full flex justify-center">
      <div className="bg-white shadow-xl p-6 rounded-xl w-96 space-y-4">
        <input 
          type="text" 
          value={password}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Generated Password" readOnly
          ref={passwordRef}
        />
        
        <div className="flex justify-between items-center">
          <input 
          type="range" 
          min={6}
          max={100}
          name="password-length"
          id="password-length"
          className="w-2/3" 
          value={length}
          onChange={(e) => {setLength(parseInt(e.target.value))}}
          />
          <span className="text-black font-semibold">Length: {length}</span>
        </div>

        <div className="flex items-center space-x-3">
          <input type="checkbox" name="numbers" id="numberInput" 
          className="w-4 h-4 text-green-500  focus:ring-green-300"
          defaultChecked = {numberAllowed}
          onChange={() => setNumberAllowed(prev => !prev)}
          />
          <label className="text-gray-700 font-semibold" htmlFor="numbers">Numbers</label>
        </div>

        <div className="flex items-center space-x-3">
          <input type="checkbox" name="characters" id="characterInput" className="w-4 h-4 text-green-500  focus:ring-green-500"
          defaultChecked = {charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label className="text-gray-700 font-semibold" htmlFor="characters">Characters</label>
        </div>

        <div className="flex justify-center">
          <button className="bg-green-500 text-white font-bold py-3 px-12 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 transition-transform duration-300"
          onClick={copyPasswordToClickboard}>
           copy
          </button>
        </div>
      </div>
    </div>
  </div>
</>


  )
}

export default App
