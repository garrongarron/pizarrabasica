class MouseHandler
{
    constructor(){
        this.cursor = {x:0,y:0}
        this.moveSubscriber = null
        this.downSubscriber = null
    }

    start(){
        document.addEventListener('mousemove', Mouse.move)
        document.addEventListener('mousedown', Mouse.down)
    }

    setMoveSubscriber(subscriber){
        Mouse.moveSubscriber = subscriber
    }
    setDownSubscriber(subscriber){
        Mouse.downSubscriber = subscriber
    }

    down(e){
        e.preventDefault()
        if (Mouse.downSubscriber== null) {
            return
        } else {
            Mouse.downSubscriber()
        }
    }
    
    move(e){
        let unit = 10
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