import History from './HistoryHandler.js'
import Insert from './InsertHandler.js'
import Mouse from './MouseHandler.js'
import Element from './DomElementHandler.js'
import Coder from './CoderHandler.js'
import Key from './KeyHandler.js'
import Font from './FontSize.js'

class InputHandler
{
    constructor(){
        this.current = null
        // <input type="text" id="text">
        let input = document.createElement('input')
        this.input = input
        input.setAttribute('type','text')
        input.id = 'text'
        input.focus()
        input.addEventListener('focus', this.focus )
        input.addEventListener('blur', this.blur )
        document.querySelector('aside').appendChild(input)

        // <button class="export">Exp</button>
        let btn = document.createElement('button')
        btn.innerText = 'Drag'
        document.querySelector('aside').appendChild(btn)
        btn.addEventListener('mousedown', this.float)
        
    }
    
    focus(){
        Key.setActive(false)
    }
    blur(){
        Key.setActive(true)
    }
    float(){
        if(!Insert.isInsertMode()){
            if(!History.isLast()) {
                Insert.notAllowMessage()
                return 
            }
        }
        
        if(Mouse.moveSubscriber == null){
            this.current = document.createElement('span')
            this.current.id = Math.round(new Date().getTime()/100);
            this.current.style.fontSize = Font.getSize()+'px'
            this.current.innerText = Input.input.value
            
            Element.stikOnMouseUp(this.current)
            Input.input.value = ''
        }
        Mouse.setMoveSubscriber(() =>{
            this.current.style.left = Mouse.cursor.x+'px'
            this.current.style.top = Mouse.cursor.y+'px'  
        })
        Mouse.setUpSubscriber(()=>{
            Mouse.setMoveSubscriber(null)
            Coder.start(this.current)
            Element.addClickListener(this.current)
            History.keepGoing()
        })
        this.current.style.left = Mouse.cursor.x+'px'
        this.current.style.top = Mouse.cursor.y+'px'
        document.body.appendChild(this.current)
    }
}

const Input = new InputHandler();
export default Input;