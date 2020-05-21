import Storage from './LocalStorage.js'
import History from './HistoryHandler.js'
import Insert from './InsertHandler.js'


class CoderHandler
{
    start(current){
        let element = {
            x:current.style.left.replace('px',''),
            y:current.style.top.replace('px',''),
            content:current.innerText,
            id:current.id
        }
        let elements = Insert.start(element)
        // console.log(elements)
    }
}
const Coder = new CoderHandler();
export default Coder;