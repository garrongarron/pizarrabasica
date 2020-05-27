import Canvas from './Canvas.js'


class GraphicHelper
{
    constructor(){
        this.canvas = document.createElement('canvas')
        this.canvas.style.backgroundColor = 'transparent'
        this.canvas.style.position = 'fixed'
        this.canvas.style.display = 'none'
        this.canvas.style.zIndex = 1
        this.canvas.id = 'canvasTpm'
        this.canvas.width = 2000
        this.canvas.height = 2000
        document.body.appendChild(this.canvas)
        this.geometricfigures = [ new Canvas()]
        this.geometricfigure = null
    }

    stop(){
        console.log('stop')
        let obj = this.geometricfigures[this.geometricfigure]
        obj.destructor()
        this.canvas.style.display = 'none'
    }

    start(){
        this.canvas.style.display = 'block'
        this.down()
        this.up()
        this.move()
        this.drawline()
        this.drawing = false
    }

    drawline(){
        this.geometricfigure = 0
    }

    down(){
        this.canvas.addEventListener('mousedown',  (e)=>{
            this.draw(e, this)
        })
    }

    up(){
        this.canvas.addEventListener('mouseup', (e)=>{
            this.draw(e, this)
        })
    }

    move(){
        this.canvas.addEventListener('mousemove', (e)=>{
            this.draw(e, this)
        })
    }

    draw(e, helper){
        console.log(e.type, helper.geometricfigures, helper.geometricfigure)//mousedown||mouseup||mousemove
        let obj = helper.geometricfigures[helper.geometricfigure]
        if(obj == null){
            return
        }
        let coordinates = {
            x:e.clientX,
            y:e.clientY
        }
        switch (e.type) {
            case 'mousedown':
                obj.down(coordinates)
                this.drawing = true
                break;
            case 'mouseup':
                obj.up(coordinates)
                this.drawing = false
                break;
    
            case 'mousemove':
                if(this.drawing){
                    obj.move(coordinates)
                }
                break;
        
            default:
                console.error('WTF')
                break;
        }
    }
}
const Helper = new GraphicHelper()
export default Helper