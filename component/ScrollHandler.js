class ScrollHandler
{
    start(){
        console.log('aaaaaaaaaaaaa')
    }
    getScroll() {
        if (window.pageYOffset != undefined) {
            // return [pageXOffset, pageYOffset];
            return {x:pageXOffset,y:pageYOffset};
        } else {
            var sx, sy, d = document,
                r = d.documentElement,
                b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            return {x:sx,y:sy};
        }
    }
}

const Scroll = new ScrollHandler()
export default Scroll