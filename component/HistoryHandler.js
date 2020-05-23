import Storage from './LocalStorage.js'
import Key from './KeyHandler.js'
import Coder from './CoderHandler.js'
import Element from './DomElementHandler.js'
import Input from './InputHandler.js'

class HistoryHandler
{
    constructor(){
        this.cursor = -1
        Object.size = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };


        let back = document.createElement('button')
        back.innerText = '←'
        document.querySelector('aside').appendChild(back)
        back.addEventListener('mousedown', this.prev)

        let ahead = document.createElement('button')
        ahead.innerText = '→'
        document.querySelector('aside').appendChild(ahead)
        ahead.addEventListener('mousedown', this.next)
    }

    cleanScreen(){
        let elements = Storage.getLocal('history')
        for (const key in elements) {
            if (elements.hasOwnProperty(key)) {
                let e = document.querySelector('[id="'+key+'"]')
                if(e !== null){
                    e.remove()
                }
            }
        }
        History.cursor = -1
    }

    printAll(){
        let elements = Storage.getLocal('history')
        for (const key in elements) {
            if (elements.hasOwnProperty(key)) {
                History.next()
            }
        }
        
    }

    delete(element){
        let history = Storage.getLocal('history')
        delete history[element.id]
        Storage.setLocal('history',history);
    }
   
    back(){
        if(Key.keyPressed[17]!== true){//control
            return
        }
        History.prev()
    }
    prev(){

        if(History.cursor<0){
            return
        }
        let arr = Object.entries(Storage.getLocal('history'))
        let id = `[id='${arr[History.cursor--][0]}']`
        let element = document.querySelector(id)
        Input.input.value = ''
        element.remove();
    }

    ahead(){
        if(Key.keyPressed[17]!== true){//control
            return
        }
        History.next()
    }

    next(){
        let HISTORY = Storage.getLocal('history')
        if(History.cursor > Object.size(HISTORY) -2){
            return
        }
        let arr = Object.entries(HISTORY)
        let element = document.createElement('span')
        element.innerText = arr[++History.cursor][1].content
        Input.input.value = element.innerText
        element.id = arr[History.cursor][0]
        element.style.left = arr[History.cursor][1].x+'px'
        element.style.top = arr[History.cursor][1].y+'px' 
        element.style.color = 'white' 
        let size = arr[History.cursor][1].size || 15
        element.style.fontSize = size+'px'  
        document.body.appendChild(element)
        Element.addClickListener(element)
    }

    start(){
        Key.addListener(39, this.ahead)
        Key.addListener(37, this.back)
    }

    keepGoing(){
        if(History.cursor+2 == Object.entries(Storage.getLocal('history')).length){
            History.cursor++
        }
    }
    
    isLast(){
        if(History.cursor+1 == Object.entries(Storage.getLocal('history')).length){
            return true
        }
        return false
    }
}
const History = new HistoryHandler();
export default History;