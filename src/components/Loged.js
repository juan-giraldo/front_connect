import React, { useEffect } from 'react'
import { useState } from 'react';
import io from "socket.io-client"
import Prompt from '../Prompt';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Spinner} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import swal from "sweetalert";
let node="http://localhost:5002"
const socket =io.connect(node);
let conect =false

const Loged = () =>{
    const [nodesel,setNodesel] = useState("desconectado")
    let flag1 = 0;
    const [dropdown,setDropdown]=useState(false);
    const openList = () =>{
        setDropdown(!dropdown);
    } 
    useEffect (() => {
        socket.on("status_soc", (status) => {
            if (flag1 === 0) {
                    console.log(status)
                    if (status === "ocupado") {
                        swal("Equipo en uso","Actualmente otro usuario esta gestionando este equipo por favor intentelo mas tarde")
                        flag1 = 1
                    } else setNodesel(status);
            } else flag1 = 0;
        });
    },[socket]);
    const send_dev = (dev) =>{
        console.log("enviado",dev)
        socket.emit("send_dev",dev)
    }

    if (nodesel==="conectado"){
        return(<div className='App'>
        <Prompt socket={socket}/>
    </div>);
    }
    else if(nodesel==="conectando"){
        return( 
            <div>
                <h1>Conectando</h1>
                <Spinner color='primary'/>
            </div>
                );
            }
    else return(
        <div>
            <h3>Loged</h3>
            <Dropdown isOpen = {dropdown} toggle={openList} size = "large" className='drop'>
                <DropdownToggle caret>
                    Seleccionar el equipo que desea gestionar
                </DropdownToggle>

                <DropdownMenu className='items'>
                    <DropdownItem onClick={() => send_dev("NJa-CCast")}>Cisco Catalyst - Nodo Jardin</DropdownItem>
                    <DropdownItem onClick={() => send_dev("NDa-CASR")}>Cisco ASR - Nodo Darien</DropdownItem>
                    <DropdownItem onClick={() => send_dev("NTu-R2948")}>Raisecom 2948 - Nodo Tulua</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        
        </div>
        
    ) 
}

export default Loged