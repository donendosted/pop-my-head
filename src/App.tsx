import { useEffect, useState } from "react"

export default function App() {
  const [score, setScore] = useState(0)
  const [table, setTable] = useState(Array(15).fill(null))
  var timeout = 1000
  if (score > 10) {
    timeout = 500
  } else
    if (score > 20) {
      timeout = 350
    } else
    if (score > 30) {
      timeout = 250
    }

  function RandInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  function mechanics () {
    var temp = Array(15).fill(null)
    for (let i = 0; i < RandInt(9); i++) {
      temp[RandInt(15)] = true
    }
    setTable(temp)
  }

  function handleClick (val: boolean, id: number) {
    if (val) {
      setScore((s)=>s+1)
      const temp = table.slice()
      temp[id] = false

      setTable(temp)
    }
  }

  useEffect(() => {
    const id = setInterval(mechanics, timeout)
    return () => clearInterval(id)
  }, [timeout])

  const buttonClass = "p-2 bg-white/20 rounded-lg border-b-6 border-r-8 border-blue-300 border-r-blue-300/50 m-1 flex justify-center items-center boxsize hover:bg-white/5 active:bg-pink-300/10 shadow-md active:shadow-none"
  return (
    <>
    {score < 100 ? (
    <div className="h-screen w-full p-2 bg-blue-200">
      <div className="flex justify-between bg-amber-100/20 text-gray-800">
        <h1 className="text-2xl md:text-6xl md:font-bold">THE POPING GAME</h1>
        <h2 className="font-bold text-2xl md:text-6xl">{score}</h2>
      </div>
      <div className="w-full grid grid-cols-3 sm:grid-cols-5">
        {table.map((val, i)=>  (
          <div className="flex">
          <button className={buttonClass} key={i} onClick={()=> handleClick(val, i)}>
            {
              val ? (
                <img src="/face.png" />
              ) : val === false ? (
                <img src="/hit.png" />
              ) : null
            }
            </button>
          </div>
        ))}
      </div>
    </div>
    ):(
      <div className="inset-0 h-screen w-full flex flex-col justify-center items-center backdrop-blur-lg bg-amber-400/5">
        <h1 className="text-lg mb-4">WOW you scored 100! 🎉</h1>
        <button className="p-3 bg-amber-400/60 rounded-lg hover:bg-amber-400/80 transition" onClick={()=>location.reload()}>
          RESTART <span className="animate-spin inline-block ml-1">  ↻  </span>
        </button>
      </div>
    )}
    </>
  )
}