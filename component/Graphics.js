import Helper from './Graphics/GraphicHelper.js'
import Storage from './LocalStorage.js'
import Coder from './CoderHandler.js'
import History from './HistoryHandler.js'
import Key from './KeyHandler.js'

class Graphics
{
    start(){
    console.log('staaart graphics')
        // <input type="text" id="text">
        let input = document.createElement('button')
        input.innerText = 'Graph'
        input.id = 'graph'
        document.querySelector('aside').appendChild(input)
        input.addEventListener('click', this.click)

        let save = document.createElement('button')
        save.innerText = 'Save'
        save.id = 'save'
        save.style.display = 'none'
        document.querySelector('aside').appendChild(save)
        save.addEventListener('click', this.save)
        graphics.pixelOnMouseOver()
    }

    click(e){
        let n = e.target.style
        n.backgroundColor = (n.backgroundColor == 'green')?'buttonface':'green';
        (n.backgroundColor == 'green')?Helper.start():Helper.stop()
    }

    save(e){
        //@todo add listener to edit

        console.log('oksad')
        e.target.style.display = 'none'
        
        // let n = document.querySelector('[id=graph]').style.backgroundColor = 'buttonface';
        // Helper.stop()
        let coordinates = Storage.getLocal('curve')
        graphics.add(coordinates)
        Coder.start(graphics.createDataTransfer(coordinates))

    }

    createDataTransfer(coordinates){
        let canvasElement = document.createElement('canvas')
        canvasElement.setAttribute('coordinates', JSON.stringify(coordinates) )
        canvasElement.id = Math.round(new Date().getTime()/100)
        return canvasElement
    }
    remove(historyId){
        let canvas = graphics.getCanvas()
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let object = Storage.getLocal('history')
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                if(element.size == 'gr'){
                    if(element.id == historyId){
                        break;
                    } else {
                        graphics.add(JSON.parse(element.content))
                    }
                }
            }
        }
    }
    refresh(){
        let arr = Object.entries(Storage.getLocal('history'))
        let cursor = History.cursor
        let historyId = arr[cursor][0]
        let canvas = graphics.getCanvas()
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let object = Storage.getLocal('history')
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                if(element.size == 'gr'){
                    if(element.id == historyId){
                        graphics.add(JSON.parse(element.content))
                        break;
                    } else {
                        graphics.add(JSON.parse(element.content))
                    }
                }
            }
        }
    }
    pixelOnMouseOver(){
        let canvas = graphics.getCanvas()
        canvas.addEventListener('mousedown',function(e){
            let ctx = canvas.getContext("2d");
            let data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
            let idx = (e.offsetY*canvas.width + e.offsetX)*4;
            let parts = Array.prototype.slice.call(data,idx,idx+4);
            if(parts[0]>10){
                let object = Storage.getLocal('history')
                let historyId = graphics.getHistoryId(idx)
                if(Key.keyPressed[8]== true){//control
                    History.delete({id:historyId})
                    History.cursor--
                    graphics.refresh()
                    return
                }
                
                graphics.setPointers(JSON.parse(object[historyId].content), historyId)
                
            }
        },false);
    }

    setPointers(coordinates, historyId){
        let pList = []
        for (let index = 1; index <= 3; index++) {
            pList[index] = document.querySelector('[id=p'+index+']')
            pList[index].style.left = coordinates[(index-1)*2]+'px'
            pList[index].style.top = coordinates[(index-1)*2+1]+'px'
            pList[index].setAttribute('historyId', historyId)
        }
        graphics.addTmp(coordinates)
    }
    addTmp(coordinates){
        let canvas = document.querySelector('[id=canvasTpm]')
        canvas.style.display = 'block'
        setTimeout(()=>{
            canvas.style.display = 'none'
        },500)
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
    getHistoryId(idx){
        let canvas = document.querySelector('[id=canvasTpm]')
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
        ctx.lineWidth = 2

        let object = Storage.getLocal('history')
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const element = object[key];
                if(element.size == 'gr'){
                   if(graphics.findId(JSON.parse(element.content), idx, ctx, canvas.width, canvas.height )){
                       return element.id
                    }
                }
            }
        }
    }
    findId(coordinates, idx, ctx, w, h){
        ctx.beginPath();
        ctx.bezierCurveTo(
            coordinates[0],coordinates[1],
            coordinates[2],coordinates[3],
            coordinates[4],coordinates[5]
            );      
        ctx.stroke();
        let data = ctx.getImageData(0,0,w,h).data;
        let parts = Array.prototype.slice.call(data,idx,idx+4);
        if(parts[0]>10){
            return true
        }
        return false
    }
    
    add(coordinates){
        let canvas = graphics.getCanvas()
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
        ctx.lineWidth = 2
        ctx.beginPath();
        ctx.bezierCurveTo(
            coordinates[0],coordinates[1],
            coordinates[2],coordinates[3],
            coordinates[4],coordinates[5]
            );      
        ctx.stroke();
    }
    getCanvas(){
        let board = document.querySelector('[id=board]')
        if(board !== null){
            return board
        }
        let canvas = document.createElement('canvas')
        canvas.id = 'board'
        canvas.style.position = 'fixed'
        // canvas.style.backgroundColor = 'gray'
        // canvas.style.zIndex = 1
        canvas.width = 2000  
        canvas.height = 2000
        document.body.appendChild(canvas)
        return canvas
    }

}

const graphics = new Graphics()
export default graphics