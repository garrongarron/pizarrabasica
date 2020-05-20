import Storage from './LocalStorage.js'
import Key from './KeyHandler.js'

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
    
    start(){
        Storage.setLocal('elements',['Federico','b','c','d']);
        let elements = Storage.getLocal('history');//Object.size(elements)
        // let elements = Storage.getLocal('elements');
        

        let ahead = () => {
            
            if(this.cursor>Object.size(elements)-2){
                return
            }
            console.log(Object.entries(elements))
            let arr = Object.entries(elements)
            let element = document.createElement('span')
            element.innerHTML = arr[++this.cursor][1].content
            element.id = arr[this.cursor][0]
            console.log(arr[this.cursor][1].x)
            element.style.left = arr[this.cursor][1].x+'px'
            element.style.top = arr[this.cursor][1].y+'px' 
            document.body.appendChild(element)

        }
        let back = () => {
            if(this.cursor<0){
                return
            }
            let element = document.querySelector(`[id='${this.cursor--}']`)
            element.remove();
        }

        // let ahead = () => {
            
        //     if(this.cursor>elements.length-2){
        //         return
        //     }
        //     let element = document.createElement('span')
        //     element.innerHTML = elements[++this.cursor]
        //     element.id = this.cursor
        //     document.body.appendChild(element)

        // }
        // let back = () => {
        //     if(this.cursor<0){
        //         return
        //     }
        //     let element = document.querySelector(`[id='${this.cursor--}']`)
        //     element.remove();

        // }
        Key.addListener(39, ahead)
        Key.addListener(37, back)
    }
}
const History = new HistoryHandler();
export default History;