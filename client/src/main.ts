import { io, Socket } from "socket.io-client"

document.getElementById('form')?.addEventListener('submit', conectarServidor)
let socket: Socket

function conectarServidor(e: Event) {
  e.preventDefault()
  const $ip = document.getElementById('ip') as HTMLInputElement
  const $port = document.getElementById('port') as HTMLInputElement

  socket = io(`http://${$ip.value}:${$port.value}`)


  socket.on('hanDibujado', (info) => {

    if (!ctx) return
   /* if(lastX ==null || lastY == null){
      lastX =info.x
      lastY=info.y
      return
    }*/
    ctx?.beginPath()
    //ctx?.arc(info.x, info.y, 4, 0, 2 * Math.PI) //2*Math.PI es igual a 360 grados
    ctx.moveTo(info.lastX,info.lastY)
    ctx.lineTo(info.x,info.y)
    ctx.strokeStyle = info.c
   // ctx.fillStyle = info.c
    ctx?.stroke()
    ctx.closePath()
   // ctx?.fill()
    lastX =info.x
    lastY= info.y
  })

}


const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 600
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.style.border = '1px solid black'
let estaPulsando=false
let lastX: 0
let lastY: 0





canvas.addEventListener('mouseup', dejaDePulsar)
function dejaDePulsar(){
  estaPulsando= false
}

canvas.addEventListener('mousedown', pulsa)
function pulsa(e:MouseEvent){
  estaPulsando= true
const bounding =canvas.getBoundingClientRect()
lastX = e.clientX - bounding.left
lastY = e.clientY - bounding.top
}


canvas.addEventListener('mousemove', dibujar)

function dibujar(e: MouseEvent) {

  if (!socket || !estaPulsando) return

  const bounding =canvas.getBoundingClientRect()
  const $color = document.getElementById('color') as HTMLSelectElement
  const info = {
  lastX: lastX,
  lastY: lastY,
  x: e.clientX - bounding.left,
  y: e.clientY - bounding.top,
  c: $color.value
}

  socket.emit('dibujar', info)

}



