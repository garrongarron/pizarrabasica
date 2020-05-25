import Helper from './Graphics/GraphicHelper.js'
class Graphics
{
    start(){
    console.log('staaart graphics')
        // <input type="text" id="text">
        let input = document.createElement('button')
        input.innerText = 'Graph'
        document.querySelector('aside').appendChild(input)
        input.addEventListener('click', this.click)

        let save = document.createElement('button')
        save.innerText = 'Save'
        save.id = 'save'
        save.style.display = 'none'
        document.querySelector('aside').appendChild(save)
         
    }

    click(e){
        let n = e.target.style
        n.backgroundColor = (n.backgroundColor == 'green')?'buttonface':'green';
        (n.backgroundColor == 'green')?Helper.start():Helper.stop()
    }

    save(){
        //@todo insert into history
        //@todo add listener to edit
        //@todo print graph into screen
    }
}

const graphics = new Graphics()
export default graphics