
let all = document.querySelectorAll('.button')
let current = null
let cursor = {clientX:0,clientY:0}
let generalIndex = -1
let create = (text) => {
    if(text.length == 0) return;
    let copy = document.createElement('span')
    copy.innerText = text
    copy.id = ++generalIndex
    copy.classList.add('current')
    console.log('start')
    current = copy
    current.style.left = cursor.x+'px'
    current.style.top = cursor.y+'px'
    document.body.appendChild(copy);
    let layer = document.createElement('li')
    layer.innerText = `${cursor.x}:${cursor.y} ${text}`
    layer.setAttribute('span-id', copy.id)
    document.querySelector('ul').prepend(layer)
    copy.addEventListener('mousedown', edit)
}
let edit = (e) => {
    console.log('edit')
    current = e.target
}
let start = (e) => {
    create(e.target.innerText)
}
let move = (e) => {
    unit = 10
    let y = Math.round(e.clientY/unit)*unit -15
    let x = Math.round(e.clientX/unit)*unit -10
    cursor.x = x
    cursor.y = y
    if(current==null)
    return
    
    // console.log(e.target.innerText)
    
    let layer = document.querySelector('li[span-id="'+current.id+'"]')
    layer.innerText = `${cursor.x}:${cursor.y} ${current.innerText}`
    current.style.left = cursor.x+'px'
    current.style.top = cursor.y+'px'
   
    // console.log(current)
}
let stop = () => {
    if(current == null){
        return
    }
    let data = {
        id:current.id,
        x:cursor.x,
        y:cursor.y,
        text:current.innerText
    }
    socket.emit('new message', data);
    current = null
    console.log('stop')
}
all.forEach(function(userItem) {
    userItem.addEventListener('mousedown', start)
})
let keyup = (e) => {
    if( e.keyCode == 27 ){
        let layer = document.querySelector('li[span-id="'+current.id+'"]')
        current.remove()
        layer.remove()
        current = null
    }
    let text = e.keyCode-48;
    
    if(text <-1 || text >10){
        return
    }
    
    
    if(current==null){
        create(text)
    } else {
        current.innerText = text
    }
    

}
document.addEventListener('mouseup', stop)
document.addEventListener('mousemove', move)
document.addEventListener('keydown', keyup)
let startValue = (e) => {
    create(e.target.value)
}
document.querySelector('input').addEventListener('mousedown', startValue)
