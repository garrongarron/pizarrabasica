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

        // <button class="export">Drag</button>
        let btn = document.createElement('button')
        this.btn = btn
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
            this.current.style.lineHeight = Font.getSize()+'px'
            this.current.style.color = 'white'
          
            
        }

        Mouse.setMoveSubscriber(() =>{
            this.current.style.left = Mouse.cursor.x+'px'
            this.current.style.top = Mouse.cursor.y+'px'  
        })

        Mouse.setUpSubscriber(()=>{

            if(Mouse.moveSubscriber == null){
                return
            }

            Coder.start(this.current)//-2
            Element.addClickListener(this.current)//-1


            Mouse.setMoveSubscriber(null)//2
            Mouse.setDownSubscriber(null)//3
            History.keepGoing()//4
        })
        
        this.current.innerText = Input.input.value
        Input.input.value = ''
        this.current.style.left = Mouse.cursor.x+'px'
        this.current.style.top = Mouse.cursor.y+'px'
        document.body.appendChild(this.current)
        
    }
}

const Input = new InputHandler();
export default Input;