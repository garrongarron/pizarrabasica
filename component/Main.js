
import Import from './ImportFile.js'
import Export from './ExportFile.js'
// import Storage from './LocalStorage.js'
import Key from './KeyHandler.js'
import History from './HistoryHandler.js'
import Mouse from './MouseHandler.js'
import Writter from './WritterKey.js'
import Element from './DomElementHandler.js'


class Main
{
    run(){

        Key.addListener(27, ()=>console.log('ESC'))

        Writter.start()//teclado por defecto
        Writter.setElementHandler(Element)
        History.start()
        Export.onClick('.export', () => JSON.stringify(name))
        let callback = content => console.log(JSON.parse(content))
        Import.onChange('[id=up]', callback)

    }
}

const main = new Main()
main.run()