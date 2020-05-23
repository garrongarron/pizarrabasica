import Css from './CssLoader.js'
import Coder from './CoderHandler.js'
import Key from './KeyHandler.js'

class ConsoleMonitor
{
    constructor(){
        let monitor = document.createElement('div')
        this.monitor = monitor
        this.currentJson = null
        monitor.id = 'console-monitor'
        this.vars = ['id', 'content', 'x', 'y', 'size']
        this.vars.forEach(element => {
            this[element] = document.createElement('div')
            this[element].classList.add(element)
            this[element].setAttribute('contenteditable','true')
            monitor.appendChild(this[element])
            this[element].addEventListener('focus', this.focus )
            this[element].addEventListener('blur', this.blur )
            this[element].addEventListener('keyup', (e)=>{
                // console.log(e.target.innerText)
                // console.log(e.key)
                let type = Coder.jsonType[element]
                let content = e.target.innerText
                if(Coder.validator(content, type)){
                    this[element].classList.remove('red')
                } else {
                    this[element].classList.add('red')
                }
                e.preventDefault()
            })
        });
        let btn = document.createElement('button')
        btn.innerText = 'Save'
        monitor.appendChild(btn)
        btn.addEventListener('click',()=>{
            let data = Console.currentJson
            let element = document.querySelector(`[id='${data.id}']`)
            if(element == null){
                return
            }
            element.innerText = this.content.innerText
            element.style.left = this.x.innerText+'px'
            element.style.top = this.y.innerText+'px'
            element.style.fontSize = this.size.innerText+'px'
            Coder.start(element)
        })


        document.querySelector('aside').appendChild(monitor)
        this.load()
    }

    focus(){
        Key.setActive(false)
    }
    blur(){
        Key.setActive(true)
    }
    load(){
        let css = './component/ConsoleMonitor/console-monitor.css'
        let link = Css.load(css)
    }
    setData(data){
        Console.currentJson = data
        Console.vars.forEach(element => {
            Console[element].innerText = data[element]
        });
    }
}

const Console = new ConsoleMonitor()
export default Console