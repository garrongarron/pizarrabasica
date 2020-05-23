class CssLoader
{
    load(href){
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = href;
            link.media = 'all';
            head.appendChild(link);
            return link
            const promise = new Promise((resolve, reject)=>{
                
                link.onload = ()=>{
                    // console.log('oooooooooooook')
                    resolve()
                }
            })

            promise.then(()=>{
                console.log('okkkkkkkkkkkkk')
            })

            promise.catch(()=>{
                console.error('reject')
            })

            return
            
    }
}
const Css = new CssLoader()
export default Css