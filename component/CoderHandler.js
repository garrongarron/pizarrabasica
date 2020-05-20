import Storage from './LocalStorage.js'
import History from './HistoryHandler.js'

class CoderHandler
{
    start(current){
        let element = {
            x:current.style.left.replace('px',''),
            y:current.style.top.replace('px',''),
            content:current.innerText,
            id:current.id
        }
        let elements = Storage.getLocal('history');
        elements[current.id] = element
        Storage.setLocal('history',elements);
        History.setHistory()
        console.log(elements)
    }
}
const Coder = new CoderHandler();
export default Coder;