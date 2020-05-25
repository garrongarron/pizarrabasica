// import 
let editingCurve = false

let initialPosition = {x:null, y:null}
let curvePosition = {x:null, y:null}
let endPosition = {x:null, y:null}

const pointerDown = (e) => {
    editingCurve = true
    e.preventDefault()
    e.stopPropagation()
}
const pointerMove = (e)=>{
    if(!editingCurve){
        return
    }
    curvePosition.x = e.clientX
    curvePosition.y = e.clientY
    
    pppointer.style.left = e.clientX+'px'
    pppointer.style.top = e.clientY+'px'

    ctx.strokeStyle = 'rgba(255, 0,255, 1)'
    ctx.lineWidth = 2
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.bezierCurveTo(
        initialPosition.x, initialPosition.y, 
        curvePosition.x, curvePosition.y,
        endPosition.x, endPosition.y
        );
    ctx.stroke();
    e.preventDefault()
    e.stopPropagation()
}
const pointerUp = (e)=>{
    editingCurve = false
    e.preventDefault()
    e.stopPropagation()
}

let pppointer = document.createElement('div')
pppointer.classList.add('pointer')
pppointer.style.margin = '-.25em'
pppointer.style.border = '1.5px solid yellow'
pppointer.style.backgroundColor = 'black'
pppointer.style.borderRadius = '50%'
pppointer.style.width = '.5em'
pppointer.style.height = '.5em'
pppointer.style.position = 'fixed'
pppointer.style.zIndex = 10
pppointer.style.display = 'none'

let canvas = null
let ctx = null


export default class Canvas
{
    constructor(){
        document.body.appendChild(pppointer)
        canvas = document.querySelector('canvas')
        ctx = canvas.getContext("2d");
        console.log(canvas)
    }
    destructor(){
        document.querySelector('[id=save]').style.display = 'none'
        pppointer.style.display = 'none'
        pppointer.removeEventListener('mousedown',pointerDown, false)
        canvas.removeEventListener('mousemove',pointerMove, false)
        pppointer.removeEventListener('mouseup',pointerUp, false)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    down(coordinates){
        canvas.style.display = 'block'
        initialPosition.x = coordinates.x
        initialPosition.y = coordinates.y
    }
    move(coordinates){
        endPosition = coordinates
        ctx.strokeStyle = 'rgba(255, 0,255, 1)'
        ctx.lineWidth = 2
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.bezierCurveTo(
            initialPosition.x, initialPosition.y, 
            coordinates.x, coordinates.y,
            coordinates.x, coordinates.y
            );
        ctx.stroke();
    }
    up(coordinates){
        pppointer.style.left = endPosition.x+'px'
        pppointer.style.top = endPosition.y+'px'
        pppointer.style.display = 'block'
        pppointer.addEventListener('mousedown',pointerDown, false)
        canvas.addEventListener('mousemove',pointerMove, false)
        pppointer.addEventListener('mouseup',pointerUp, false)
        document.querySelector('[id=save]').style.display = 'inline'
    }
}