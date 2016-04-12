/**
 * Created by Li on 3/20/2016.
 */

var myScene,myCamera;

var myUniforms;
var myTextureMesh;
var renderTargetParams;

var gpuTexture1,gpuTexture2;


var myImage;

var imageWidth = 200;
var imageHeight = 200;



function gpuRDComputing(){

    // new render-to-texture scene
    myScene = new THREE.Scene();

    // you may need to modify these parameters
    renderTargetParams = {
        minFilter:THREE.LinearFilter,
        stencilBuffer:false,
        depthBuffer:false
    };

    THREE.TextureLoader.prototype.crossOrigin = '';


    var loader1 = new THREE.TextureLoader();
    loader1 = loader1.load( "test4.jpg" );

    myImage = loader1;
    myImage.wrapS = THREE.RepeatWrapping;
    myImage.wrapT = THREE.RepeatWrapping;
    myImage.repeat.set( 1, 1);



    gpuTexture1 = new THREE.WebGLRenderTarget( imageWidth, imageHeight, {
        //wrapS: THREE.RepeatWrapping,
        //wrapT: THREE.RepeatWrapping,
        //minFilter: THREE.NearestFilter,
        //magFilter: THREE.NearestFilter,
        //format: THREE.RGBAFormat,
        type: THREE.FloatType,
        stencilBuffer: false
    } );

    gpuTexture2 = gpuTexture1.clone();


// custom RTT materials
    myUniforms = {
        stepX: {type: "f", value: undefined},
        stepY: {type: "f", value: undefined},
        texture: {type: "t", value: undefined},
        originMap: {type: "t", value: undefined},
        Kill: {type: "f", value: 0.065},
        Feed: {type: "f", value: 0.05}


    };

    myUniforms.stepX.value = 1.0/imageWidth;
    myUniforms.stepY.value = 1.0/imageHeight;

    var loader2 = new THREE.TextureLoader();
    loader2 = loader2.load( "test4.jpg" );

    myUniforms.originMap.value = loader2;

    //myUniforms.originMap.value = new THREE.TextureLoader().load( "test4.jpg" );



    var myTextureMat = new THREE.ShaderMaterial({
        uniforms: myUniforms,
        vertexShader:   document.getElementById( 'myvs' ).textContent,
        fragmentShader: document.getElementById( 'myfs' ).textContent
    });



// Setup render-to-texture scene
    myCamera = new THREE.OrthographicCamera( imageWidth / - 2, imageWidth / 2, imageHeight / 2, imageHeight / - 2, -10000, 10000 );


    var myTextureGeo = new THREE.PlaneBufferGeometry( imageWidth, imageHeight );
    myTextureMesh = new THREE.Mesh( myTextureGeo, myTextureMat );
    myTextureMesh.position.z = -100;
    myScene.add( myTextureMesh );



}


function gpuRDLoop (iteration){


    if(frameCount<=20) myTextureMesh.material.uniforms.texture.value = myImage; // need to somehow wait until the image loaded


    for(var i = 0; i< iteration; i ++){

        renderer.render( myScene, myCamera, gpuTexture1, true );
        myTextureMesh.material.uniforms.texture.value = gpuTexture1;

        renderer.render( myScene, myCamera, gpuTexture2, true );
        myTextureMesh.material.uniforms.texture.value = gpuTexture2;


    }

}

