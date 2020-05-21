
import Import from './ImportFile.js'
import Export from './ExportFile.js'
// import Storage from './LocalStorage.js'
import Key from './KeyHandler.js'
import History from './HistoryHandler.js'
import Mouse from './MouseHandler.js'
import Writter from './WritterKey.js'
import Element from './DomElementHandler.js'
import Storage from './LocalStorage.js'


class Main
{
    run(){

        Key.addListener(27, ()=>console.log('ESC'))
        Mouse.start()
        Writter.start()//teclado por defecto
        Writter.setElementHandler(Element)
        History.start()
        Export.onClick('.export', () => {
            return JSON.stringify(Storage.getLocal('history'))
        })
        
        let callback = content => {
            Storage.setLocal('history',JSON.parse(content) )
        }
        Import.onChange('[id=up]', callback)

    }
}

const main = new Main()
main.run()