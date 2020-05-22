import History from './HistoryHandler.js'
import Storage from './LocalStorage.js'
import Key from './KeyHandler.js'

class InsertHandler
{

    constructor(){
        document.querySelector('[id="insert"]').addEventListener('change', function() {
            let color = (this.checked)?'red':'black'
            document.querySelector('[for="insert"]').style.color = color
        })
        Key.addListener(45, ()=>{
            document.querySelector('[id="insert"]').click()
        })
    }
    isInsertMode(){
        return document.querySelector('[id="insert"]').checked 
    }

    notAllowMessage(){
        alert('Press [Ctrl]+[Right Key] CTRL+"→", there are more content into the history')
    }

    start(element){
        if(!document.querySelector('[id="insert"]').checked ){
            this.insertAtLast(element)
        } else {
            this.insertInMiddle(element)
        }
    }
    insertInMiddle(element){
        let elements = Storage.getLocal('history');
        let n = 0
        let out = {}
        let object = Object.entries(elements)
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                out[object[key][0]] = object[key][1]
                if(History.cursor == n++){
                    out[element.id] = element
                    n = null
                }
            }
        }
        History.cursor++
        Storage.setLocal('history',out);
    }

    insertAtLast(element){
        let elements = Storage.getLocal('history');
        elements[element.id] = element
        Storage.setLocal('history',elements);
    }
}
const Insert = new InsertHandler();
export default Insert;