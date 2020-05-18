var socket = io('https://aucklandcomputerscience-test.herokuapp.com/');


let synth = window.speechSynthesis;
let say = (msg) => {
    console.log(msg)
    var utterThis = new SpeechSynthesisUtterance(msg);
    utterThis.voice = synth.getVoices().filter((value)=> {return (value.lang=='es-US')})[0]
    utterThis.voice.localService = true
    utterThis.voice.default = true
    synth.speak(utterThis);
}

console.warn('check 1', socket.connected);
socket.on('connect', function() {
    console.warn('check 2', socket.connected);
});
socket.on('new message', function (data) {
    console.log(data);
    if(data.username == 'profe'){
        console.log(data.message);
        let copy = document.getElementById(data.message.id);
        if(copy==null){
            copy = document.createElement('span')
            copy.id = data.message.id
        }
        copy.style.left = data.message.x+'px'
        copy.style.top = data.message.y+'px'
        copy.innerText = data.message.text
        say( data.message.text)
        document.body.appendChild(copy);
    }
});


  
  
const urlParams = new URLSearchParams(window.location.search)

if(urlParams.get('teacher') == 1){
    socket.emit('add user', 'profe');
    socket.emit('new message', 'silenciooo');
    
} else {
    let black = document.createElement('div')
    black.classList.add('black')
    black.innerText = 'Clic para empesar'
    document.body.appendChild(black);
    black.addEventListener('click',(e)=>{
        e.target.remove()
        console.log('asd')
    })
}












