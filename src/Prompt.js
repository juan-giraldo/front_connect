import React, { useEffect } from 'react'
import { useState } from 'react';

function Prompt({socket}) {
  let flag1 = 0;
  const [command, setCommand] = useState("");
  const [commandRes, setCommandRes] = useState([]);
  const [pcommand, setPcommand] = useState([])
  const sendCommand = async() => {
    setPcommand((list) => [...list, command]);
    const commandData = {message: command+"\r"}; 
    await socket.emit("send_command", commandData);
  }
  const endConection = () => {
    socket.emit("end_conection","disconect")
  }
  useEffect (() => {
    socket.on("receive_res", (data) => {
        if (flag1 === 0) {
            if(!(data[data.length-1]==="#" || data[data.length-1]===">")) {
              console.log("aqui no fue")
              setPcommand((list) => [...list, "s"]);
            }
            setCommandRes((list) => [...list, data]);
            flag1 = 1;
        }
        else {
            flag1 = 0;
        }
    });
  }, [socket]);
  return (
    <div>
        <div className='promp-body'>
            <div className='response'>
              {commandRes.map((responseCon,index) => {
                let com=pcommand.map((responseCon,index) => {
                  if (index>=0)
                    return responseCon
              })
                if (index>=0)
                   console.log(com) 
                  return <p key={index}>{responseCon}</p>
              })}
            </div>
        
        </div>
        <div className="prompt-footer">
            <input type="text" placeholder="Write your command here" onChange={(event) => {
                    setCommand(event.target.value);
                }}
            />
            <button onClick={sendCommand}>Send</button>
            <br></br>
            <br></br>
            <button  onClick={endConection}>Desnocectarse</button>
        </div>
    </div>
  )
}

export default Prompt

