import Storage from './../LocalStorage.js'
import Mouse from './../MouseHandler.js'
import graphics from './../Graphics.js'  //I dont like this because it call helper and that call this

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
    let curve = [initialPosition.x, initialPosition.y, 
        curvePosition.x, curvePosition.y,
        endPosition.x, endPosition.y]
    Storage.setLocal('curve', curve)
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


let editing = false

let mousedown = (e) => {
    editing = true
    let target = e.target
    Mouse.setMoveSubscriber((e) => {
        let coordinates = updateHistory(e, target)
        refreshCurve(coordinates)
    })
    Mouse.setUpSubscriber(()=>{
        editing = false
        Mouse.setMoveSubscriber(null)
        graphics.refresh()
        document.querySelector('[id=canvasTpm]').style.display = 'none'
    })
}

let refreshCurve = (coordinates) => {
    let canvas = document.querySelector('[id=canvasTpm]')
    canvas.style.display = 'block'
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255, 0, 255, 1)'
    ctx.lineWidth = 2
    ctx.beginPath();
    ctx.bezierCurveTo(
        coordinates[0],coordinates[1],
        coordinates[2],coordinates[3],
        coordinates[4],coordinates[5]
        );      
    ctx.stroke();
}

let updateHistory = (e, target) => {
    console.log(e)
    if(!editing){
        return
    }
    let historyId = target.getAttribute('historyId')
    target.style.left = e.clientX+'px'
    target.style.top = e.clientY+'px'
    let object = Storage.getLocal('history')
    let coordinates = JSON.parse(object[historyId].content)
    let subIndex = target.id.replace('p','')*1-1
    coordinates[subIndex*2] = e.clientX
    coordinates[subIndex*2+1] = e.clientY
    object[historyId].content = JSON.stringify(coordinates)
    Storage.setLocal('history',object)
    return coordinates
}

let pList = []
for (let index = 1; index <= 3; index++) {
    pList[index] = document.createElement('div')
    pList[index].id = 'p'+index
    pList[index].style.margin = '-.25em'
    pList[index].style.backgroundColor = '#00FF00'
    pList[index].style.borderRadius = '50%'
    pList[index].style.width = '.5em'
    pList[index].style.height = '.5em'
    pList[index].style.position = 'fixed'
    pList[index].style.zIndex = 10
    pList[index].style.left = '1'+index+'0px'
    pList[index].style.top = '1'+index+'0px'
    pList[index].addEventListener('mousedown', mousedown)
}





let canvas = null
let ctx = null


export default class Canvas
{
    constructor(){
        document.body.appendChild(pppointer)
        document.body.appendChild(pList[1])
        document.body.appendChild(pList[2])
        document.body.appendChild(pList[3])
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
        let curve = [initialPosition.x, initialPosition.y, 
            coordinates.x, coordinates.y,
            coordinates.x, coordinates.y]
        Storage.setLocal('curve', curve)
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