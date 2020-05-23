import Mouse from './MouseHandler.js'
import Key from './KeyHandler.js'
import Coder from './CoderHandler.js'
import Storage from './LocalStorage.js'
import History from './HistoryHandler.js'
import Insert from './InsertHandler.js'
import Element from './DomElementHandler.js'
import Font from './FontSize.js'

class WritterKey
{
    constructor(){
        this.current = null
        this.elementHandler = null
        let elements = Storage.getLocal('history');//@todo
        Object.size = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        this.idMax = Object.size(elements)//deprecated

    }
    setElementHandler(elementHandler){
        this.elementHandler = elementHandler
    }

    setCurrentElement(element){
        this.current = element
    }

    start(){

        // from 0 to 9
        for (let index = 48; index <= 57; index++) {
            Key.addListener(index,()=> this.stick(index))
        }


        //from a to z
        for (let index = 65; index <= 90; index++) {
            Key.addListener(index,()=> this.stick(index))
        }


    
    }


    stick(keyCode){
        let content =  String.fromCharCode(keyCode)
        let node = document.querySelector(`[id=btn-${content.toLowerCase()}]`)
        if(node == null){
            return
        }
        content = node.innerText[0] 
        if(!Insert.isInsertMode()){
            if(!History.isLast()) {
                Insert.notAllowMessage()
                return 
            }
        }
        
        if(Mouse.moveSubscriber == null){
            this.current = document.createElement('span')
            this.current.id = Math.round(new Date().getTime()/100)
            this.current.style.fontSize = Font.getSize()+'px'
            this.current.style.color = 'white'
            // Element.stikOnMouseUp(this.current)//Mouse.setMoveSubscriber(null)
            // this.elementHandler.addClickListener(this.current)
        }
        
        Mouse.setMoveSubscriber(() =>{
            this.current.style.left = Mouse.cursor.x+'px'
            this.current.style.top = Mouse.cursor.y+'px'  
        })


        Mouse.setDownSubscriber(()=>{

            if(Mouse.moveSubscriber == null){
                return
            }

            Coder.start(this.current)//-2
            Element.addClickListener(this.current)//-1
            

            //clear
            this.curren = null//1
            Mouse.setMoveSubscriber(null)//2
            Mouse.setDownSubscriber(null)//3
            History.keepGoing()//4
        })
        this.current.innerText = content
        
        this.current.style.left = Mouse.cursor.x+'px'
        this.current.style.top = Mouse.cursor.y+'px'
        document.body.appendChild(this.current)
    }
}

const Writter = new WritterKey();
export default Writter;