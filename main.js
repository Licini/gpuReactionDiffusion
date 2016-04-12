/**
 * Created by Li on 3/6/2016.
 */


var objects = [];
var myStart;


function setup() {


    //defultEnvironment();

    //myStart = createSphere();
    //myStart.update = function(){
    //
    //    myStart.rotation.y = frameCount*0.01;
    //
    //};


    gpuRDComputing();


    //var geo = new THREE.PlaneBufferGeometry(200,200,400,400);


    var geo = new THREE.SphereBufferGeometry(200,200,200);


    var lambertShader = THREE.ShaderLib['phong'];
    var uniforms = THREE.UniformsUtils.clone(lambertShader.uniforms);

    uniforms.RDtexture = {type: "t", value: gpuTexture2};
    uniforms.diffuse = {type: "v3", value: new THREE.Vector3(0.0,0.0,0.1)};
    uniforms.specular = {type: "v3", value: new THREE.Vector3(0.8,0.8,0.99)};
    uniforms.emissive = {type: "v3", value: new THREE.Vector3(1,1,1)};
    uniforms.shininess = {type: "f", value: 100};
    uniforms.reflectivity = {type: "f", value: 1};

    //var path = "MilkyWay/";
    var path = "skybox/";
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];

    var reflectionCube = new THREE.CubeTextureLoader().load( urls );
    reflectionCube.format = THREE.RGBFormat;


    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById( 'phone' ).textContent,
        fragmentShader: lambertShader.fragmentShader,
        lights:true,
        fog: true,
        wireframe: false,
        shading: THREE.FlatShading,

    });

    material.envMap = reflectionCube;





    var Mesh = new THREE.Mesh( geo, material);
    scene.add( Mesh );



    var shader = THREE.ShaderLib[ "cube" ];
    shader.uniforms[ "tCube" ].value = reflectionCube;
    var material = new THREE.ShaderMaterial( {
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: shader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        } ),
        mesh = new THREE.Mesh( new THREE.BoxGeometry( 2000, 2000, 2000 ), material );
    camera.add( mesh );




}




function update() {


    gpuRDLoop (10);

    //camera.rotateAround(,)

    //
    //myStart.update();
    //posInfo.update();


}