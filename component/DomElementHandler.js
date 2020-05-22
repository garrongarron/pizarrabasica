import Mouse from './MouseHandler.js'
import Coder from './CoderHandler.js'
import Key from './KeyHandler.js'
import History from './HistoryHandler.js'
import Font from './FontSize.js'


class DomElementHandler
{
    constructor(){
        document.addEventListener('mouseup', this.stop)
        Mouse.current = null
        Key.addListener(8, ()=>this.delete())
    }

    delete(){
        if(Mouse.current !== null){
            History.delete(Mouse.current)
            History.cursor--
            Mouse.current.remove()
            Mouse.current = null
        }
    }

    addClickListener(element){
        element.addEventListener('mousedown', (e)=>{
            Element.move(e.target)
        })
    }
    stikOnMouseUp(element){
        Mouse.setMoveSubscriber(null)
    }
    stikOnMouseDown(element){
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
        Font.setSize(Mouse.current.style.fontSize.replace('px',''))
        Mouse.setMoveSubscriber(() => {
            current.style.left = Mouse.cursor.x+'px'
            current.style.top = Mouse.cursor.y+'px'  
        })
    }
}

const Element = new DomElementHandler();
export default Element;