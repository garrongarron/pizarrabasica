
import Import from './ImportFile.js'
import Export from './ExportFile.js'
// import Storage from './LocalStorage.js'
import Key from './KeyHandler.js'
import History from './HistoryHandler.js'
import Mouse from './MouseHandler.js'
import Writter from './WritterKey.js'
import Element from './DomElementHandler.js'
import Storage from './LocalStorage.js'
import Input from './InputHandler.js' // do not delete this line
import Font from './FontSize.js' // do not delete this line
import Clone from './CloneButtons.js' // do not delete this line
import Console from './ConsoleMonitor.js' // do not delete this line


class Main
{
    run(){

        Key.addListener(27, ()=>console.log('ESC'))
        Mouse.start()
        Writter.start()//teclado por defecto
        History.start()
        Export.onClick('.export', () => {
            return JSON.stringify(Storage.getLocal('history'))
        })
        Font.start()

        
        
        let callback = content => {
            History.cleanScreen()
            Storage.setLocal('history',JSON.parse(content) )
            History.printAll()
        }
        Import.onChange('[id=up]', callback)

    }
}

const main = new Main()
main.run()