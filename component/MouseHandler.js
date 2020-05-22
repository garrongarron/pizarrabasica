class MouseHandler
{
    constructor(){
        this.cursor = {x:0,y:0}
        this.moveSubscriber = null
        this.fontSize = 15
        
    }

    setFontSize(size){
        this.fontSize = size
    }

    start(size){
        Mouse.setFontSize(size)
        document.addEventListener('mousemove', Mouse.move)
        document.addEventListener('mousedown', Mouse.down)
        document.addEventListener('mouseup', Mouse.up)
    }

    setMoveSubscriber(subscriber){
        Mouse.moveSubscriber = subscriber
    }

    setUpSubscriber(subscriber){
        Mouse.upSubscriber = subscriber
    }

    setDownSubscriber(subscriber){
        Mouse.downSubscriber = subscriber
    }

    up(e){
        if (Mouse.upSubscriber== null) {
            return
        } else {
            Mouse.upSubscriber()
        }
    }

    down(e){
        if (Mouse.downSubscriber== null) {
            return
        } else {
            Mouse.downSubscriber()
        }
    }
    
    move(e){
        let unit = Mouse.fontSize
        Mouse.cursor.y = Math.round(e.clientY/unit)*unit -15
        Mouse.cursor.x = Math.round(e.clientX/unit)*unit -10
        // console.log(Mouse.moveSubscriber)
        if (Mouse.moveSubscriber== null) {
            return
        } else {
            Mouse.moveSubscriber()
        }
        
        // console.log(e.target.innerText)
        
        // let layer = document.querySelector('li[span-id="'+current.id+'"]')
        // layer.innerText = `${cursor.x}:${cursor.y} ${current.innerText}`
        // this.current.style.left = cursor.x+'px'
        // this.current.style.top = cursor.y+'px'
       
        // console.log(current)
    }
}

const Mouse = new MouseHandler();
export default Mouse;