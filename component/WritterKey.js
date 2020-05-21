import Mouse from './MouseHandler.js'
import Key from './KeyHandler.js'
import Coder from './CoderHandler.js'
import Storage from './LocalStorage.js'
import History from './HistoryHandler.js'
import Insert from './InsertHandler.js'

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
        Key.addListener(48,()=> this.stick('0'))
        Key.addListener(49,()=> this.stick('1'))
        Key.addListener(50,()=> this.stick('2'))
        Key.addListener(51,()=> this.stick('3'))
        Key.addListener(52,()=> this.stick('4'))
        Key.addListener(53,()=> this.stick('5'))
        Key.addListener(54,()=> this.stick('6'))
        Key.addListener(55,()=> this.stick('7'))
        Key.addListener(56,()=> this.stick('8'))
        Key.addListener(57,()=> this.stick('9'))
    }

    getUnixTime(){
        return Math.round(new Date().getTime()/100);
    }

    stick(content){
        if(!Insert.isInsertMode()){
            if(!History.isLast()) {
                alert('Press [Right Key] "→", there are more content into the history')
                return 
            }
        }
        
        if(Mouse.moveSubscriber == null){
            this.current = document.createElement('span')
            this.current.id = this.getUnixTime()
            this.elementHandler.addClickListener(this.current)
        }
        this.current.innerText = content
        Mouse.setMoveSubscriber(() =>{
            this.current.style.left = Mouse.cursor.x+'px'
            this.current.style.top = Mouse.cursor.y+'px'  
        })
        Mouse.setDownSubscriber(()=>{
            if(Mouse.moveSubscriber == null){
                return
            }

            Coder.start(this.current)

            Mouse.setMoveSubscriber(null)
            this.curren = null
            Mouse.setDownSubscriber(null)
            
            History.keepGoing()
        })
        this.current.style.left = Mouse.cursor.x+'px'
        this.current.style.top = Mouse.cursor.y+'px'
        document.body.appendChild(this.current)
    }
}

const Writter = new WritterKey();
export default Writter;