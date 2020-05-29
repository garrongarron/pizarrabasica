import Scroll from './ScrollHandler.js' 
import Font from './FontSize.js'

class MouseHandler
{
    constructor(){
        this.cursor = {x:0,y:0}
        this.moveSubscriber = null
        this.grid = 5
        
    }

    setGrid(size){
        this.grid = size
    }

    start(size){
        document.addEventListener('mousemove', Mouse.move)
        document.addEventListener('mousedown', Mouse.down)
        document.addEventListener('mouseup', Mouse.up)//
    }

    setMoveSubscriber(subscriber){
        Mouse.moveSubscriber = subscriber
    }

    setUpSubscriber(subscriber){
        Mouse.upSubscriber = subscriber
    }

    setDownSubscriber(subscriber){
        Mouse.downSubscriber = subscriber
    }

    up(e){
        if (Mouse.upSubscriber== null) {
            return
        } else {
            Mouse.upSubscriber(e)
        }
    }

    down(e){
        if (Mouse.downSubscriber== null) {
            return
        } else {
            Mouse.downSubscriber(e)
        }
    }

    scroll(){
        let scroll = Scroll.getScroll()
        Mouse.cursor.x += scroll.x 
        Mouse.cursor.y += scroll.y 
    }
    
    move(e){
        let unit = Mouse.grid        
        Mouse.cursor.x = Math.round((e.clientX - Font.getSize()/4)/unit)*unit -10 
        Mouse.cursor.y = Math.round((e.clientY - Font.getSize()*.75)/unit)*unit 
        Mouse.scroll()
        if (Mouse.moveSubscriber== null) {
            return
        } else {
            Mouse.moveSubscriber(e)
        }
        
        // console.log(e.target.innerText)
        
        // let layer = document.querySelector('li[span-id="'+current.id+'"]')
        // layer.innerText = `${cursor.x}:${cursor.y} ${current.innerText}`
        // this.current.style.left = cursor.x+'px'
        // this.current.style.top = cursor.y+'px'
       
        // console.log(current)
    }
}

const Mouse = new MouseHandler();
export default Mouse;