import Storage from './LocalStorage.js'
import History from './HistoryHandler.js'
import Insert from './InsertHandler.js'
import Console from './ConsoleMonitor.js'

class CoderHandler
{
    constructor(){
        this.json = null
        this.jsonType = {
            x:'n',
            y:'n',
            content:'any',
            id:'n',
            size:'n'
        }
    }

    validator(element, type){
        if(type === 'n'){
            if(Number.isInteger(element*1)){
                return true
            }
            return false
        }
        if(type === 'any'){
            return typeof element == 'string'
        }
        
    }
    start(current){
        if(current.tagName.toLowerCase() !== 'canvas'){
            this.json = {
                x:current.style.left.replace('px',''),
                y:current.style.top.replace('px',''),
                content:current.innerText,
                id:current.id,
                size:current.style.fontSize.replace('px','')
            }
        } else {
            let coordinates = JSON.parse(current.getAttribute('coordinates'))
            this.json = {
                x:coordinates[0],
                y:coordinates[1],
                content:current.getAttribute('coordinates'),
                id:current.id,
                size:'gr'
            }
            current.remove()
        }

        
        let elements = Insert.start(this.json)
        Console.setData(this.json)
        // console.log(elements)
    }
}
const Coder = new CoderHandler();
export default Coder;