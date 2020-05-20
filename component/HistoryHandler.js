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
        this.setHistory()
    }
    setHistory(){
        this.elements = Storage.getLocal('history');
    }
    back(){
        if(History.cursor<0){
            return
        }
        let element = document.querySelector(`[id='${History.cursor--}']`)
        element.remove();
    }
    ahead(){
        if(History.cursor > Object.size(History.elements) -2){
            return
        }
        console.log(Object.entries(History.elements))
        let arr = Object.entries(History.elements)
        let element = document.createElement('span')
        element.innerHTML = arr[++History.cursor][1].content
        element.id = arr[History.cursor][0]
        element.style.left = arr[History.cursor][1].x+'px'
        element.style.top = arr[History.cursor][1].y+'px' 
        document.body.appendChild(element)

        Element.addClickListener(element)
    }

    start(){
        Key.addListener(39, this.ahead)
        Key.addListener(37, this.back)
    }
}
const History = new HistoryHandler();
export default History;