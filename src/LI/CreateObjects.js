/**
 * Created by LI on 3/6/2016.
 */

function createPoint(position){

    var geometry = new THREE.Geometry();

    geometry.vertices.push(position);

    var point = new THREE.Points(geometry,new THREE.PointsMaterial());

    scene.add(point);

    return point;

}

function createParticle(position){


    if ( position.constructor == Array ) position = new THREE.Vector3(position[0],position[1],position[2]);

    var map = new THREE.TextureLoader().load( "src/nonScript/dot.png" );
    var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );

    var particle = new THREE.Sprite(material);
    particle.position.copy(position);

    particle.setScale = function(val){

        this.scale.x = this.scale.y = val;

    };

    scene.add(particle);

    particle.setScale(5);

    return particle;


}

function createTail(object){

    object.tail = {};
    object.tail.particles = [];

    //object.rainbow = new Rainbow();
    //object.rainbow.setSpectrum('red','blue');

    for( var i = 0; i < 20; i++ ){


        var size = (object.scale.x /20)*(20-i)+1;

        var pt = createParticle([0,0,0]);

        pt.setScale(size);

        //pt.material.color.setHex('0x'+object.rainbow.colorAt(i*5));

        object.tail.particles.push(pt);

    }

    setColorFromAtoB(object.tail.particles,['red','yellow','blue']);

    object.updateTail = function(){


        for ( var i= this.tail.particles.length - 1; i >0 ; i--){

            this.tail.particles[i].position.copy(this.tail.particles[i-1].position);

        }

        this.tail.particles[0].position.copy(this.position);

    }


}

//function createParticleSystem(positions,scene,gui,Index) {
//
//    var particles = [];
//
//
//    var map = new THREE.TextureLoader().load( "src/nonScript/dot.png" );
//    var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
//
//
//    for(var i=0; i< positions.length; i++)
//    {
//        particles[i] = new THREE.Sprite( material );
//        particles[i].position.copy(positions[i]);
//
//        scene.add(particles[i]);
//    }
//
//    // start material - end material
//    var particleSystem ={
//
//        particles : particles, scaleList: [], colorList:[], color1: 0x00ffff,
//
//        setSize: function(size){
//
//            for( var i = 0; i < this.particles.length ; i++){
//
//                this.particles[i].scale.x = this.particles[i].scale.y = size;
//
//            }
//
//        }
//
//    };
//
//    function updateColor(){
//
//        for(var i=0; i< particleSystem.particles.length;i++) {
//
//            particleSystem.particles[i].material.color.setHex(particleSystem.color1);
//
//
//        }
//
//    }
//
//
//    // GUI
//    var folder = gui.addFolder('particleSystem.'+Index);
//    folder.addColor( particleSystem, 'color1').onChange(updateColor);
//
//
//    return particleSystem;
//}

function createLine(pt1,pt2){

    if ( pt1.constructor == Array ) pt1 = new THREE.Vector3(pt1[0],pt1[1],pt1[2]);

    if ( pt2.constructor == Array ) pt2 = new THREE.Vector3(pt2[0],pt2[1],pt2[2]);


    var material = new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 3 } );

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        pt1,
        pt2
    );

    var line = new THREE.Line( geometry, material );

    scene.add(line);


    return line;

}

function createLineList(pt1List,pt2List){

    var lineList = {


        lineList: [],

        addLine: function(pt1,pt2){

            var material = new THREE.LineBasicMaterial({
                color: 0x0000ff
            });

            var geometry = new THREE.Geometry();
            geometry.vertices.push(
                pt1,
                pt2
            );

            var line = new THREE.Line( geometry, material );


            this.lineList.push(line);

            scene.add( line );

        }



    }


    for( var i=0; i < pt1List.length ; i++ ){

        lineList.addLine(pt1List[i],pt2List[i]);
    }


    return lineList;


}

function guiPointsMaterial ( gui, mesh, material, geometry ) {

    var data = {
        color : material.color.getHex(),
        envMaps : envMapKeys,
        map : textureMapKeys,
        specularMap : textureMapKeys,
        alphaMap : textureMapKeys
    };

    var folder = gui.addFolder('THREE.PointsMaterial');

    folder.addColor( data, 'color' ).onChange( handleColorChange( material.color ) );

    folder.add( material, 'vertexColors', constants.colors).onChange( needsUpdate( material, geometry ) );
    folder.add( material, 'fog' );


}

function smartMaterialGUI ( gui, mesh, geometry,selectedMaterial ) {


    var material;

    switch (selectedMaterial) {

        case "MeshBasicMaterial" :

            material = new THREE.MeshBasicMaterial({color: 0x2194CE});
            guiMaterial( gui, mesh, material, geometry );
            guiMeshBasicMaterial( gui, mesh, material, geometry );

            return material;

            break;

        case "MeshLambertMaterial" :

            material = new THREE.MeshLambertMaterial({color: 0x2194CE});
            guiMaterial( gui, mesh, material, geometry );
            guiMeshLambertMaterial( gui, mesh, material, geometry );

            return material;

            break;

        case "MeshPhongMaterial" :

            material = new THREE.MeshPhongMaterial({color: 0x2194CE});
            guiMaterial( gui, mesh, material, geometry );
            guiMeshPhongMaterial( gui, mesh, material, geometry );

            return material;

            break;

        case "MeshDepthMaterial" :

            material = new THREE.MeshDepthMaterial({color: 0x2194CE});
            guiMaterial( gui, mesh, material, geometry );
            guiMeshDepthMaterial( gui, mesh, material, geometry );

            return material;

            break;

        case "MeshNormalMaterial" :

            material = new THREE.MeshNormalMaterial();
            guiMaterial( gui, mesh, material, geometry );
            guiMeshNormalMaterial( gui, mesh, material, geometry );

            return material;

            break;

        case "LineBasicMaterial" :

            material = new THREE.LineBasicMaterial({color: 0x2194CE});
            guiMaterial( gui, mesh, material, geometry );
            guiLineBasicMaterial( gui, mesh, material, geometry );

            return material;

            break;
    }

}

function createMesh(URL,scene,gui,Index){

    var mesh;

    var loader = new THREE.PLYLoader();
    mesh = loader.load(URL, function ( geometry ) {

        geometry.computeFaceNormals();

        var material = new THREE.MeshPhongMaterial( { color: 0xffffff,  shininess: 200, vertexColors: THREE.VertexColors} );


        mesh = new THREE.Mesh( geometry,material );

        var folder = gui.addFolder('Mesh.'+Index);

        mesh.material = smartMaterialGUI( folder, mesh, geometry, 'MeshPhongMaterial' );

        mesh.position.y = - 0.3;
        mesh.rotation.x = - Math.PI / 2;
        //mesh.scale.multiplyScalar( 0.002 );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add( mesh );

    } );


    return mesh;




}

function createText(textToShow,position,select ){

    if (typeof(select)==='undefined') select = "SpriteText2D";
    if (typeof(position)==='undefined') position = new THREE.Vector3(0,0,0);
    else if ( position.constructor == Array ) position = new THREE.Vector3(position[0],position[1],position[2]);


    var Text2D = THREE_Text.Text2D;
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;

    var text;

    switch (select) {

        case "Text2D" :

            text = new Text2D(textToShow, {
                align: textAlign.right,
                font: '30px Arial',
                fillStyle: '#000000',
                antialias: true
            })
            scene.add(text);
            text.position.copy(position);

            return text;

            break;

        case "SpriteText2D" :

            text = new SpriteText2D(textToShow, {
                align: textAlign.center,
                font: '20px Arial',
                fillStyle: '#ffffff',
                antialias: false
            });
            scene.add(text);
            text.position.copy(position);

            return text;

            break;

    }


    return text;


}

function createCanvasText() {

    var text2 = document.createElement('div');
    text2.style.position = 'absolute';
//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    text2.style.width = 100;
    text2.style.height = 100;
    text2.style.backgroundColor = "blue";
    text2.innerHTML = "hi there!";
    text2.style.top = 200 + 'px';
    text2.style.left = 200 + 'px';
    document.body.appendChild(text2);


}

function addColorControl( object ){

    object.color = 0x000000;

    if ( object.constructor == Array ) {


        object.handlerUpdateColor = function(){

            for( var i = 0; i<object.length; i++){

                object[i].material.color.setHex(object.color);

            }

        };

        object.updateColor = function(color){

            for( var i = 0; i<this.length; i++){

                this[i].material.color.setHex(color);


            }

        };

    } else {

        object.handlerUpdateColor = function(){

            object.material.color.setHex(object.color);

        };

        object.updateColor = function(color){

            this.material.color.setHex(color);


        };


    }

    gui.addColor( object, 'color').onChange(object.handlerUpdateColor);


}

function addSizeControl( object ){

    object.size = 1;

    if ( object.constructor == Array ) {


        object.handlerUpdateSize = function(){

            for( var i = 0; i<object.length; i++){

                object[i].scale.x = object[i].scale.y = object[i].scale.z =  object.size;


            }

        };

        object.updateSize = function(size){

            for( var i = 0; i<this.length; i++){

                this[i].scale.x = this[i].scale.y = this[i].scale.z =  size;

            }

        };



    } else {

        object.handlerUpdateSize = function(){

            object.scale.x = object.scale.y = object.scale.z =  object.size;

        };

        object.updateSize = function(size){


                this.scale.x = this.scale.y = this.scale.z =  size;


        };




    }

    gui.add( object, "size" ,0,20).onChange( object.handlerUpdateSize );


}

function setColorFromAtoB(objects,colors){

    var rainbow = new Rainbow();
    rainbow.setSpectrumByArray(colors);

    for( var i=0; i<objects.length ; i++){

        objects[i].material.color.setHex('0x'+rainbow.colorAt(i*100/objects.length));

    }

}

function createSphere(){

    var geometry = new THREE.OctahedronGeometry(50, 1);
    var material = new THREE.MeshPhongMaterial( { color: red, specular: yellow, shininess: 0,shading: THREE.FlatShading });
    var sphere = new THREE.Mesh( geometry, material );
    group.add( sphere );

    objects.push(sphere);


    return sphere;

}