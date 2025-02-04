import * as THREE from "three";
import { FBXLoader } from "jsm/loaders/FBXLoader.js";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';
import { OBJLoader } from "jsm/loaders/OBJLoader.js";
import { MTLLoader } from "jsm/loaders/MTLLoader.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.target.set(0, 0, 0);

//  mouse control
controls.enableRotate = true;
controls.enableZoom = true;
controls.enablePan = false;
controls.minDistance = 0; 
controls.maxDistance = 25;
controls.maxPolarAngle = Math.PI / 2; 
controls.minPolarAngle = 0;  

//Loader use with  character
const loader = new FBXLoader();
const loaderGLB = new GLTFLoader();
function loadTable() {
  loader.load(
    "./assets/table.fbx",
    (fbx) => {
     
      fbx.scale.set(0.01, 0.01, 0.01);
      fbx.position.set(0, 0, 0);
      fbx.rotation.y = Math.PI / 2;
      scene.add(fbx);
    },
   
  );
}

//  this function use to appear man characrter
let character;
function loadCharacter() {
  loader.load('./assets/Ch33_nonPBR.fbx', (fbx) => {
    character = initCharacter(fbx);
    scene.add(character);
  });
}

function initCharacter(fbx) {
  const char = fbx;
  char.scale.set(0.01, 0.01, 0.01);
  char.position.set(3, 0, 0);
  const mixer = new THREE.AnimationMixer(char);
  char.userData = { mixer, update: (t) => mixer.update(0.01) };
  return char;
}
///-----------------------------------------------------------------------------

function loadPlate() {
    loader.load(
      "./assets/plate.fbx",
      (fbx) => {
       
        fbx.scale.set(0.0009, 0.0009, 0.0009);
        fbx.position.set(0, 0.5, 0);
     
        scene.add(fbx);
      },
     
    );
  }

  // glf in size is more different than the fbx 
  function loadApple() {
    loaderGLB.load(
      "./assets/realistic_apple.glb",
      (gltf) => {
        const model = gltf.scene;
        console.log("Apple model loaded:", model); // Check if the model is loaded
        model.scale.set(5, 5, 5);  // Adjust scale to make it visible
        model.position.set(0, .5, 0);  // Adjust position to make it visible
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading apple model:', error);
      }
    );
  }


  // create chair

  function loadKitchen(){
    loader.load(
      "./assets/modern chair 11 fbx.FBX"
      ,(fbx) => {
       
        fbx.scale.set(0.02, 0.02, 0.02);
        fbx.position.set(0, -.7, 1.2);
        fbx.rotation.y = Math.PI ;
        scene.add(fbx);
      },
    )
  }

function setupBackground() {
  scene.background = new THREE.Color("black");
}

// Add light sources
const light = new THREE.DirectionalLight(0xffffff, 2); 
light.position.set(10, 10, 10); // to increase light 
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);
  
  renderer.render(scene, camera);
}

setupBackground();
loadTable();
animate();
loadCharacter();
loadPlate();
loadApple();
loadKitchen();



function handleWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', handleWindowResize, false);





