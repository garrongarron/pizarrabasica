class KeyHandler
{
    constructor() {
        document.addEventListener('keydown', this.trigger)
        this.upListener = {}
    } 

    trigger(e){
        if( Key.upListener.hasOwnProperty(e.keyCode) ){
            Key.upListener[e.keyCode]()
        }
        // console.log(e.keyCode)
    }
    
    addListener(number, callback){
        this.upListener[number] = callback
    }
    
    
}

const Key = new KeyHandler();
export default Key;