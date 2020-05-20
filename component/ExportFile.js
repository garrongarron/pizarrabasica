/*
<button class="export">Exp</button>

Export.onClick('.export', () => 'Test')
*/
class ExportFile {
    download(fileContent) {
        var fileName = prompt("File name", "Demo");
        if (fileName != null) {
            const blob = new Blob([fileContent], { type: 'application/json' });
            const a = document.createElement('a');
            a.setAttribute('download', fileName);
            a.setAttribute('href', window.URL.createObjectURL(blob));
            a.click(); 
        }
    }
    onClick(selector, fileContentFuction){
        this.setContent(fileContentFuction)
        document.querySelector(selector).addEventListener('click',this.process)
    }
    setContent(fileContent){
        Export.fileContent = fileContent || function(){return 'No catched content'}
    }
    process(){
        let string = Export.fileContent()
        if(typeof string == 'string'){
            Export.download(Export.fileContent())
        } else {
            alert("Te paramenter 'callback' mush return a string on Export.onClick(cssSelector, callback)")
        }
        
    }
}
const Export = new ExportFile();
export default Export;