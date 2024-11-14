import {Server} from 'socket.io'
import express from 'express'
import http from 'http'
import cors from 'cors' //npm i cors

const app = express()
const server = http.createServer(app)
app.use (cors())
const io =new Server(server,
    {


        cors:{
            origin:'*',
            methods:['GET','POST']
        }
    }
)
   


io.on('connection', socket =>{
    console.log ('un nuevo cliente se conecto')
    socket.on('disconnect',()=>{
        console.log('el cliente se desconecto')
    })

    socket.on('dibujar', (info)=> {
        console.log('Me envia datos un cliente:', info)
        io.emit('hanDibujado',info) // mensaje para todo el mundo

    })
})

server.listen(3000,()=>{
    console.log('servidor encendido en el puerto 3000')
})

//10.101.11.30