/**
 * Created by Li on 4/3/2016.
 */
var posInfo;

function createLocalMenu(){

    //var localMenu = createContainer([100,100]);

    var localMenu = document.getElementById('menu');

    posInfo = createTextarea('positionInfo','pos');

    localMenu.appendChild(posInfo);

    posInfo.editing = false;

    posInfo.update = function(){

        if ( !this.editing ) this.value = myStart.rotation.y.toFixed(2);

    };




    posInfo.onkeydown=function(){

        var keycode;
        if (window.event) keycode = window.event.keyCode;
        if (keycode == 13) {
            //alert('enter');
            frameCount = this.value;


            this.editing = false;

        }

    };

    localMenu.onclick = function(e) {
        if(e.target != document.getElementById('pos')) {
            posInfo.editing = false;
        } else {
            posInfo.editing = true;

        }
    }

    var posInfo2 = createTextarea('positionInfo','pos2');

    localMenu.appendChild(posInfo2);




}

function submitenter(e,value) {

    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;

    if (keycode == 13) {
        myStart.rotation.y = value;
        return true;
    }

    return true;
}




function createContainer(position){

    var container = document.createElement('div');
    document.body.appendChild(container);
    container.style.position = 'absolute';

    if(position.constructor == Array ){

        container.style.left = position[0]+'px';
        container.style.top = position[1]+'px';

    }

    return container;

}

function createDiv(text,id){

    var div = document.createElement('div');
    div.className = 'myContent';

    if(text != null) div.textContent = text;

    if(id) div.id = id;
    else div.id = div.textContent;

    return div;

}

function createTextarea(text,id){

    var textarea = document.createElement('textarea');

textarea.style.resize = 'none';

    textarea.className = 'myContent';

    if(text != null) textarea.textContent = text;

    if(id) textarea.id = id;
    else textarea.id = textarea.textContent;



    return textarea;

}