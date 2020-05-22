class KeyHandler
{
    constructor() {
        document.addEventListener('keydown', this.trigger)
        document.addEventListener('keyup', this.up)
        this.upListener = {}
        this.active = true
        this.keyPressed = {}
    } 

    up(e){
        Key.keyPressed[e.keyCode] = false
    }

    trigger(e){
        Key.keyPressed[e.keyCode] = true
        if(Key.active){
            if( Key.upListener.hasOwnProperty(e.keyCode) ){
                Key.upListener[e.keyCode]()
            }
        }
        // console.log(e.keyCode)
    }

    setActive(boolean){
        Key.active = boolean
    }
    
    addListener(number, callback){
        this.upListener[number] = callback
    }
    
    
}

const Key = new KeyHandler();
export default Key;