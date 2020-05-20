/*
<button class="import">
    <label htmlFor="up" className="btn btn-primary btn-block btn-outlined">
        Imp<input id="up" type='file' style="display: none;" accept='text/plain' onChange=''/>
    </label>
</button>

Import.onChange('[id=up]', console.log)
*/

class ImportFile {
    upload(e, callback) {
        var file = e.target.files[0];
        var textType = 'application/json'    ;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                callback(reader.result)
            }

            reader.readAsText(file);    
        } else {
            console.error('error', e)
        }
    }

    selector(selector){
        document.querySelector(selector).addEventListener('change',this.setCallBack)
    }

    setCallBack(e){
        Import.upload(e, Import.callback)
    }

    setInnerCallBack(callback){
        this.callback = callback || function(json){console.error(`Callback not defined on Import.onChange(cssSelector, callback) method. Result is ${json}`)}
    }

    onChange(cssSelector, callback){
        this.setInnerCallBack(callback)
        this.selector(cssSelector)
    }
}
const Import = new ImportFile();
export default Import