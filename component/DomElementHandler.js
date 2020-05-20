import Mouse from './MouseHandler.js'
import Coder from './CoderHandler.js'

class DomElementHandler
{
    constructor(){
        document.addEventListener('mouseup', this.stop)
        Mouse.current = null
    }

    addClickListener(element){
        element.addEventListener('mousedown', (e)=>{
            Element.move(e.target)
        })
    }

    stop(){

        if(Mouse.current !== null){
            Mouse.setMoveSubscriber(null)
            Coder.start(Mouse.current)
            
            Mouse.current = null
        }
        
    }

    move(current){
        Mouse.current = current
        Mouse.setMoveSubscriber(() => {
            current.style.left = Mouse.cursor.x+'px'
            current.style.top = Mouse.cursor.y+'px'  
        })
    }
}

const Element = new DomElementHandler();
export default Element;