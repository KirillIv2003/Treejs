
const div = document.querySelector('.threejs');
let mesh;

document.forms[0].addEventListener('change', (e) => {
    mesh.material.color.set(e.target.value);
})

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

    camera.aspect = div.clientWidth / div.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(div.clientWidth, div.clientHeight);
}

const clock = new THREE.Clock();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, div.clientWidth / div.clientHeight, 0.1, 1000);
camera.position.set(3, 1.2, 3);
cameraTarget = new THREE.Vector3(-1, 0.4, 1);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(div.clientWidth, div.clientHeight);

div.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;


scene.background = new THREE.Color('#A8A8A8');
//scene.fog = new THREE.Fog('gray', 1, 5);

// let vertices = [0, 0, 0, 10, 0, 0, 10, 0, 10, 0, 0, 10];

// let indices = [2, 1, 0, 0, 3, 2];

// let vremenn = new THREE.Vector3(0, 0.4, 0);
// //cameraTarget
// let geometry = new THREE.BufferGeometry();

// geometry.setAttribute(
//     "position",
//     new THREE.BufferAttribute(new Float32Array(vertices), 3)
// );
// geometry.setIndex(indices);
// geometry.computeVertexNormals();

// let material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });

// let plane2 = new THREE.Mesh(geometry, material);
// plane2.position.set(-5, 1, -5);

//ВЕРТИКАЛЬНАЯ ПЛОСКОСТЬ
const plane2Geometry = new THREE.BufferGeometry();
const plane2Width = 10;
const plane2Height = 20;
const plane2Vertices = new Float32Array([
    -plane2Width/2,0,0,
    plane2Width/2,0,0,
    -plane2Width/2, plane2Height, 0,
    plane2Width/2, plane2Height, 0
])
// let indices = [2, 1, 0, 0, 3, 2];
// plane2Geometry.setIndex(indices);
plane2Geometry.computeVertexNormals();
plane2Geometry.setAttribute('position', new THREE.BufferAttribute(plane2Vertices, 3));
const plane2Material = new THREE.MeshBasicMaterial({color: '#F5F5F5'});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
plane2.receiveShadow = true;
plane2.castShadow = true;
//plane2.position.x = -5;
plane2.rotation.y = - Math.PI / 0.15;
plane2.position.z = 3;
scene.add(plane2);


const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

document.getElementById('hemi').addEventListener('change', function(){
    if(this.checked){
        hemiLight.intensity = 1;
    }
    else{
        hemiLight.intensity = 0;
    }
});


// ПИРАМИДА
const geometryPyramid = new THREE.BufferGeometry();
const verticesPyramid = new Float32Array([
    // основание пирамиды
    -0.8, 0, 0.8,
    0.8, 0, 0.8,
    0.8, 0, -0.8,
    -0.8, 0, -0.8,
    // вершина пирамиды
    0, 1, 0
]);
const indicesPyramid = new Uint32Array([
    0, 1, 4, // треугольник основания
    1, 2, 4, // треугольник основания
    2, 3, 4, // треугольник основания
    3, 0, 4 // треугольник основания
]);
geometryPyramid.computeVertexNormals();
geometryPyramid.setAttribute('position', new THREE.BufferAttribute(verticesPyramid, 3));
geometryPyramid.setIndex(new THREE.BufferAttribute(indicesPyramid, 1));

const materialPyramid = new THREE.MeshBasicMaterial({ color: 0xffff00 });

const pyramid = new THREE.Mesh(geometryPyramid, materialPyramid);
pyramid.position.set(-1, 0.2, 1);
scene.add(pyramid);
pyramid.castShadow = true;
document.forms[0].addEventListener('change', (e) => {
    materialPyramid.color.set(e.target.value);
});


const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-20, 10, -5);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 2000; // default
directionalLight.shadow.mapSize.height = 2000; // default
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = - 10;
directionalLight.shadow.camera.left = - 10;
directionalLight.shadow.camera.right = 10;
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);
document.getElementById('direct').addEventListener('change', function(){
    if(this.checked){
        directionalLight.intensity = 1;
    }
    else{
        directionalLight.intensity = 0;
    }
});


const pointerLight = new THREE.PointLight(0xffffff, 1, 100)
pointerLight.position.set(-10, 7, -15);
pointerLight.castShadow = true;

pointerLight.shadow.mapSize.width = 2000; // default
pointerLight.shadow.mapSize.height = 2000; // default
pointerLight.shadow.camera.top = 10;
pointerLight.shadow.camera.bottom = - 10;
pointerLight.shadow.camera.left = - 10;
pointerLight.shadow.camera.right = 10;
scene.add(pointerLight);
const pointerLightHelper = new THREE.PointLightHelper(pointerLight);
scene.add(pointerLightHelper);
document.getElementById('point').addEventListener('change', function(){
    if(this.checked){
        pointerLight.intensity = 1;
    }
    else{
        pointerLight.intensity = 0;
    }
});

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 4000),
    new THREE.MeshPhongMaterial({ color: 0x808080, dithering: true })
);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(1, 0.6, -1);
scene.add(sphere);
sphere.castShadow = true;
document.forms[0].addEventListener('change', (e) => {
    sphereMaterial.color.set(e.target.value);
});

camera.position.z = 5;

function animate() {

    requestAnimationFrame(animate);

    render();

}

function render() {

    const elapsedTime = clock.getElapsedTime()

    camera.position.x = Math.cos(elapsedTime * 0.5) * 4;
    camera.position.z = Math.sin(elapsedTime * 0.5) * 4;

    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);

}

animate();