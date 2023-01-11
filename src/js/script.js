import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import { MeshToonMaterial } from 'three';

const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const sense = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);
// for update every moment
orbit.update();
const axesHelper = new THREE.AxesHelper(5);
sense.add(axesHelper);
camera.position.set(-10, 30, 30);
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
sense.add(box);

//create plan geometry 

const planGeometry = new THREE.PlaneGeometry(30, 30);

//create plane metrial

const planMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, slide: THREE.DoubleSide });

const plane = new THREE.Mesh(planGeometry, planMaterial);

sense.add(plane);

plane.rotation.x = -0.5 * Math.PI;

plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
sense.add(gridHelper);

// sphergeometry 

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);

const spherMaterial = new THREE.MeshStandardMaterial({ color: 0x0000FF, wireframe: true });

const sphere = new THREE.Mesh(sphereGeometry, spherMaterial);
sense.add(sphere);

sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

// DAT gui start here
const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01
};

gui.addColor(options, 'sphereColor').onChange((e) => {

    sphere.material.color.set(e);

});

gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

// abiant light 


const ambientLight = new THREE.AmbientLight(0x333333);

sense.add(ambientLight);

// directonalLight 

const directonalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);

sense.add(directonalLight);

directonalLight.position.set(-30, 50, 0)

directonalLight.castShadow = true;

// directionalLightHelper 

const dLightHelper = new THREE.DirectionalLightHelper(directonalLight, 5);
sense.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directonalLight.shadow.camera);

sense.add.apply(dLightShadowHelper);


let step = 0;

// function animate the box 
function animate() {
    box.rotation.x += 0.01;
    box.rotation.y += 0.01;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    renderer.render(sense, camera);
}

renderer.setAnimationLoop(animate);
// esdasd

