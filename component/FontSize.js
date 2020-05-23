import Key from './KeyHandler.js'

class FontSize
{
    constructor(){
        this.sizes = [10, 15, 22, 33, 50, 75, 112 ,168]
        this.fontSize = 1
        this.buttons = {}

        let smaller = document.createElement('button')
        smaller.innerText = 'A-'
        document.querySelector('aside').appendChild(smaller)
        smaller.addEventListener('mousedown', this.smaller)
        

        let bigger = document.createElement('button')
        bigger.innerText = 'A+'
        document.querySelector('aside').appendChild(bigger)
        bigger.addEventListener('mousedown', this.bigger)
    }

    getSize(){
        return Font.sizes[Font.fontSize]
    }

    setSize(size){
        size
        let n = 0
        Font.sizes.forEach(element => {
            if(size==element){
                Font.fontSize = n
            }
            n++
        });
        Font.select()
    }

    bigger(){
        if(Font.sizes.length-1>Font.fontSize){
            Font.fontSize++ 
        }
        Font.select()
    }

    smaller(){
        if(Font.fontSize>0){
            Font.fontSize-- 
        }
        Font.select()
    }

    select(){
        let btns = Font.buttons
        for (const key in btns) {
            if (btns.hasOwnProperty(key)) {
                btns[key].style.color = 'red'
                btns[key].style.display = 'none'
            }
        }
        Font.buttons[Font.sizes[Font.fontSize]].style.color = 'yellow'
        Font.buttons[Font.sizes[Font.fontSize]].style.display = 'inline'
    }

    start(){
        Font.sizes.forEach(element => {
            Font.buttons[element] = document.createElement('i')
            Font.buttons[element].innerText = ' '+element
            // Font.buttons[element].style.fontSize = element+'px'
            document.querySelector('aside').appendChild(Font.buttons[element])
        });
        // console.log(Font.buttons[Font.sizes[1]].style.color = 'red') 
        Font.select()
        Key.addListener(187, Font.bigger)
        Key.addListener(189, Font.smaller)  
    }
}

const Font = new FontSize()
export default Font