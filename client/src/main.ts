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
    ctx?.beginPath()
    ctx?.arc(info.x, info.y, 4, 0, 2 * Math.PI) //2*Math.PI es igual a 360 grados
    ctx.strokeStyle = info.c
    ctx.fillStyle = info.c
    ctx?.stroke()
    ctx?.fill()
  })

}


const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 600
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)
canvas.style.border = '1px solid black'

canvas.addEventListener('mousemove', dibujar)

function dibujar(e: MouseEvent) {

  if (!socket) return

  const $color = document.getElementById('color') as HTMLSelectElement
  const info = {
    x: e.clientX,
    y: e.clientY,
    c: $color.value
  }
  socket.emit('dibujar', info)
}



