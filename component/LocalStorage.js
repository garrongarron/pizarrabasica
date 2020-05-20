class LocalStorage
{
    getLocal(key){
        return JSON.parse(localStorage.getItem(key))  || {}
    }

    setLocal(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }
}
const Storage = new LocalStorage();
export default Storage;