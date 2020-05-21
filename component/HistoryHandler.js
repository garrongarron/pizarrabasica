import Storage from './LocalStorage.js'
import Key from './KeyHandler.js'
import Coder from './CoderHandler.js'
import Element from './DomElementHandler.js'

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
    }
    delete(element){
        let history = Storage.getLocal('history')
        delete history[element.id]
        Storage.setLocal('history',history);
    }
   
    back(){
        if(History.cursor<0){
            return
        }
        let arr = Object.entries(Storage.getLocal('history'))
        let element = document.querySelector(`[id='${arr[History.cursor--][0]}']`)
        element.remove();
    }
    ahead(){
        let HISTORY = Storage.getLocal('history')
        if(History.cursor > Object.size(HISTORY) -2){
            return
        }
        let arr = Object.entries(HISTORY)
        let element = document.createElement('span')
        element.innerHTML = arr[++History.cursor][1].content
        element.id = arr[History.cursor][0]
        element.style.left = arr[History.cursor][1].x+'px'
        element.style.top = arr[History.cursor][1].y+'px' 
        element.style.color = 'blue' 
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