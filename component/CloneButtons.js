import Css from './CssLoader.js'
import Input from './InputHandler.js'
import Key from './KeyHandler.js'

class CloneButtons
{
    constructor(){
        let tmp = document.createElement('div')
        let buttons = this.positions()
        this.cliclListeners = {}
        this.palettes = [
            '∠∟°deg′″⊥∥~ΔÆæ£€¥¢$§♥♠♣♦♫♪▼▲►◄☺☻♂♀',
            '≡≜∝→∞←↔↨≪≫⌊⌋⌈⌉∘∑∏e⊗†*…©®™',
            '⋂⋃|⊆⊄⊂⊇⊃⊖∈∉Ø^∨¬⇒⇔∀∃∄Ý∴∵εƒ∫∮∯∰∇',
            '#+-/⋅×÷.,=≠≈≅<>≤≥±%‰!mod?()[]',
            '{}ΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκ',
            'ΛλΜμΝνΞξΟοΠπΡρΣσςΤτΥυΦφΧχΨψΩω',
            '1234567890abcdefghijklmnopqrstuvwxyz'
        ]
        for (let index = 0; index < buttons.length; index++) {
            const element = buttons[index];
            let btn = document.createElement('div')
            btn.id = `btn-${element}`
            btn.innerText = `${element} [${element}]`
            tmp.appendChild(btn)  
        }
        this.load(tmp)
        setTimeout(()=>{
            let sign = Clone.palette()
            Clone.fill(sign)
        },100)

        Key.addListener(38, this.ahead)
        Key.addListener(40, this.back)
    }

    ahead(){
        if(Key.keyPressed[17]!== true){//control
            return
        }
        let sign = Clone.palette(true)
        Clone.fill(sign)
        console.log('ahead')
    }
    back(){
        if(Key.keyPressed[17]!== true){//control
            return
        }
        let sign = Clone.palette(false)
        Clone.fill(sign)
    }

    palette(boolean){
        if(boolean){
            let last = Clone.palettes.pop()
            Clone.palettes.unshift(last)
        } else {
            let last = Clone.palettes.shift()
            Clone.palettes.push(last)
        }
        return Clone.palettes[0].split('')
    }

    positions(){
        return '1234567890abcdefghijklmnopqrstuvwxyz'.split('')//
    }

    fill(sign){
        let buttons = this.positions()
        for (let index = 0; index < buttons.length; index++) {
            const element = buttons[index];
            if(typeof sign[index]=='undefined'){

                sign[index] = '*'
            }
            let btn = document.querySelector(`#btn-${element}`)
            btn.innerHTML = `<b>${sign[index]}</b> [${element}]`

            if(typeof this.cliclListeners[index] !== 'undefined'){
                btn.removeEventListener('mousedown',this.cliclListeners[index])
            }
            this.cliclListeners[index] = (e)=>{
                Input.input.value = e.target.innerText[0]
                Input.float()
            }
            btn.addEventListener('mousedown',this.cliclListeners[index])

        }
    }

    load(tmp){
        let css = './component/CloneButtons/clone-buttons.css'
        let link = Css.load(css)
        link.onload = ()=>{
            let container = document.createElement('div')
            container.append(tmp)
            container.id = 'clone-buttons'
            document.querySelector('aside').appendChild(container)

            // let container2 = document.createElement('div')
            // container2.append(tmp)
            // container2.id = 'clone-buttons2'
            // document.querySelector('aside').appendChild(container2)
            // ahead.addEventListener('mousedown', this.next)
        }
        link.onerror = ()=>{
            console.error(`Resource not found: "${css}"`)
        } 
    }

}

const Clone = new CloneButtons()
export default Clone