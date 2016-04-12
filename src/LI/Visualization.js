/**
 * Created by Li on 3/5/2016.
 */



var container, stats, raycaster;
var camera, scene, renderer, controls, gui;

var mouse = new THREE.Vector2();

var frameCount = 0;

var Kill = 0.05;
var Feed = 0.05;



function init() {


    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(400,0,0);




    //add default light
    var light = new THREE.PointLight( white, 1 );
    light.position.set( 10,10,0 );
    camera.add(light);
    scene.add( camera );

    var skylight = new THREE.HemisphereLight( yellow, 0xffffff, 1.0 );
    //scene.add( skylight );
   // scene.fog = new THREE.Fog( white, 200, 400 );


    //add renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( black );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    container.appendChild( renderer.domElement );


    //add view control
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0, 0 );
    controls.addEventListener( 'change', render );
    controls.enableDamping = true;


    //add stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );




    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );



    raycaster = new THREE.Raycaster();


    setup();



}



function onWindowResize() {


    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}



function onDocumentMouseMove( event ) {

    //event.preventDefault();





    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    Kill = 0.065 + mouse.x*0.02;
    //console.log(Kill);
    myUniforms.Kill.value = Kill;

    Feed = 0.05 + mouse.y*0.02;
    //console.log(Kill);
    myUniforms.Feed.value = Feed;

    camera.position.y = mouse.x *100;
    camera.position.z = mouse.y *100;

    //raycaster.setFromCamera( mouse, camera );
    //var intersects = raycaster.intersectObjects( group.children );
    //if ( intersects.length > 0 ) {
    //
    //    if ( INTERSECTED != intersects[ 0 ].object ) {
    //        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    //        INTERSECTED = intersects[ 0 ].object;
    //        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    //        INTERSECTED.material.emissive.setHex( 0xffff00 );
    //    }
    //} else {
    //    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    //    INTERSECTED = null;
    //}

}


var showLocalMenu = false;

function onDocumentMouseDown( event ) {

    frameCount = 0;


}




function animate() {





    requestAnimationFrame( animate );
    controls.update();



    stats.update();


    update();

    render();

    frameCount++;
}

function render() {


    renderer.render( scene, camera);

    //renderer.render( myScene, myCamera);

}