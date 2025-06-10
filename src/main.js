import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initScene } from './initScene.js';
import { createLamp } from './createLamp.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { setupCameraAnimation } from './cameraAnimation.js';

const { scene, camera, renderer } = initScene();
const lamp = createLamp(scene);
addLighting(scene, lamp);
setupInteraction(scene, camera, renderer, lamp);
setupCameraAnimation(camera, renderer, scene, lamp); 