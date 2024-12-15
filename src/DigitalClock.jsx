import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState, useRef, useEffect } from 'react'


function Stopwatch(){


    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(0);
    const startTimeRef = useRef(0);

    useEffect(()=> {

        if(isRunning){
            intervalIdRef.current = setInterval(()=>{
                setElapsedTime(Date.now() - startTimeRef.current)
            },10)
        }
        return ()=> {
            clearInterval(intervalIdRef.current)
        }

    }
        
    ,[isRunning])
    
    function start(){

        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime
        
    }
    function stop(){
        setIsRunning(false)
    }
    function reset(){
        setElapsedTime(0)
        setIsRunning(false)

    }

    function formateTime(){

        let hours = Math.floor(elapsedTime /(1000 * 60 * 60))
        let minutes = Math.floor(elapsedTime /(1000 * 60) % 60 )
        let seconds = Math.floor(elapsedTime /(1000) % 60)
        let milliseconds = Math.floor(elapsedTime % (1000) / 10)

        hours = String(hours).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")


        return `${hours}:${minutes}:${seconds}:${milliseconds}`;

    }

    
    return(
        <>
            <div className="container">
                <div className="card mt-4">
                    <div className="card-header text-center fw-bold">
                        Stop Watch
                    </div>
                    <div className="card-body d-flex flex-column align-items-center">
                        <div className="timer text-center fw-bold fs-3 mb-3">
                            {formateTime()}
                        </div>
                        <div className="func-buttons d-flex gap-2">
                            <button className="btn btn-success" onClick={start}>Start</button>
                            <button className="btn btn-danger" onClick={stop}>Stop</button>
                            <button className="btn btn-primary" onClick={reset}>Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </>    
    )
}

export default Stopwatch