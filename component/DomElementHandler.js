import Mouse from './MouseHandler.js'
import Coder from './CoderHandler.js'
import Key from './KeyHandler.js'
import History from './HistoryHandler.js'
import Font from './FontSize.js'


class DomElementHandler
{
    constructor(){
        Mouse.current = null
        Key.addListener(8, ()=>this.delete())
    }

    delete(){
        if(Mouse.current !== null){
            History.delete(Mouse.current)
            History.cursor--
            Mouse.current.remove()
            Mouse.setUpSubscriber(null)
            Mouse.current = null
        }
    }

    addClickListener(element){
        element.addEventListener('mousedown', (e)=>{
            Element.move(e.target)
            Mouse.setUpSubscriber(()=>{
                Element.stikOnMouseUp()
            })
            Font.setSize(Mouse.current.style.fontSize.replace('px',''))
        })
        
    }
    stikOnMouseUp(){
        if(Mouse.current !== null){
            Mouse.setMoveSubscriber(null)
            Coder.start(Mouse.current)
            Mouse.current = null
        }
    }
    stikOnMouseDown(element){
        element.addEventListener('mousedown', (e)=>{
            Element.move(e.target)
        })
    }

    


    move(current){
        Mouse.current = current
        Mouse.setMoveSubscriber(() => {//###4
            Mouse.current.style.left = Mouse.cursor.x+'px'
            Mouse.current.style.top = Mouse.cursor.y+'px'  
        })
    }
}

const Element = new DomElementHandler();
export default Element;