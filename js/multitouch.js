define([], function (ALX_magictouch) {
    
    /*
    1 doigt = drag
2 doigt = rotate + zoom
1) S'abonner à touchstart sur chaque élément modifiable
val L = document.suerySelector("svg .déplaçable");
for(var i = 0; i < L.length; i++){...}
Enregistrer lors du touchstart, la correspondance entre l'identifiant du touch et l'élément touché, ainsi que des infos complémentaires.
var ElementDeTouchid={};
ElemendDeTouchid[touch.identifier] = ElementSVG;
                                    = {Element : ElementSVG
                                        svgPaintParRapportàElément : ...
                                        }
    */
    //touchend uniquement sur le document
    document.addEventListener("touchend", function (event){
        console.log("touchend");
    }, false);

    var StockPointElem = {};
    var ElementDeTouchId = {};
    
    SVGRoot = document.querySelector("svg");
    var E = document.querySelectorAll("svg .déplaçable");
    for(var k = 0; k < E.length; k++){
        E.item(k).addEventListener("touchmove", function (event){
             onMove(event);
        }, false);
        E.item(k).addEventListener("touchstart", function (event){
            onStart(event, this);
        }, false);
    }
                                   
    function onStart(e, elem){
        var L = e.changedTouches;
        for(var i = 0; i < L.length; i++){
            var touch = L.item(i); 
            var id = touch.identifier;
            var newP = SVGRoot.createSVGPoint();
            newP.x = touch.pageX;
            newP.y = touch.pageY;
            newP = newP.matrixTransform(elem.getCTM().inverse());
            StockPointElem[id] = {coordonnees : newP, elemAsso : elem};                        
        }
            
    } 
    function onMove(e){
            var L = e.changedTouches;
            for(var i = 0; i < L.length; i++){
                var pts = L.item(i);   
                var obj = StockPointElem[L.item(i).identifier].elemAsso;
                console.log("touchmove");
                var point = SVGRoot.createSVGPoint();
                point.x = pts.pageX; 
                point.y = pts.pageY;
                var m2 = point.matrixTransform(obj.getCTM().inverse());
                var pointRoot = StockPointElem[L.item(i).identifier].coordonnees;
                // console.log(m2);
                obj.setAttribute('transform', 'translate('+(m2.x-pointRoot.x)+','+(m2.y-pointRoot.y)+')');
            }
    }
	
});