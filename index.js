var scene = new THREE.Scene();

var renderer = generateRenderer();
var camera = generateCamera();
var spotLight = generateSpotlight();

// const cubeWidth = 5;
// const boardLength = 8;

// var chessBoard = generateBoard(-10, 0, -25);
// scene.add(chessBoard);


$("#WebGL-output").append(renderer.domElement);

// call the render function
var step = 0;

// the points group
var spGroup;
// the mesh
var hullMesh;

generatePoints();

function generatePoints() {
    // add 10 random spheres
    var points = [];
    for (var i = 0; i < 20; i++) {
        var randomX = -15 + Math.round(Math.random() * 30);
        var randomY = -15 + Math.round(Math.random() * 30);
        var randomZ = -15 + Math.round(Math.random() * 30);

        points.push(new THREE.Vector3(randomX, randomY, randomZ));
    }

    spGroup = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: false });
    points.forEach(function (point) {

        var spGeom = new THREE.SphereGeometry(0.2);
        var spMesh = new THREE.Mesh(spGeom, material);
        spMesh.position = point;
        spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    scene.add(spGroup);

    // use the same points to create a convexgeometry
    var hullGeometry = new THREE.ConvexGeometry(points);
    hullMesh = createMesh(hullGeometry);
    scene.add(hullMesh);
}

function createMesh(geom) {

    // assign two materials
    var meshMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.2 });
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
}


var cameraRotationControls = new THREE.TrackballControls(camera, renderer.domElement);

animate();

function animate() {

    requestAnimationFrame(animate);

    cameraRotationControls.update();

    renderer.render(scene, camera);
}


function generateRenderer() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x996515, 0.7);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    return renderer;
}

function generateCamera() {
    var camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.x = -40;
    camera.position.y = 50;
    camera.position.z = 40;
    camera.lookAt(scene.position);
    return camera;
}

function generateSpotlight() {

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-30, 50, -8);
    spotLight.castShadow = false;
    scene.add(spotLight);
    return spotLight;
}
