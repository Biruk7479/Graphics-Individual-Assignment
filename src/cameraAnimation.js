import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function setupCameraAnimation(camera, renderer, scene, lamp) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 1.5, 0);
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;

    let autoRotate = true;
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        if (autoRotate) {
            const elapsedTime = clock.getElapsedTime();
            camera.position.x = Math.sin(elapsedTime * 0.3) * 5;
            camera.position.z = Math.cos(elapsedTime * 0.3) * 5;
            camera.position.y = 3;
            camera.lookAt(0, 1.5, 0);
        }

        // Update lighting to follow lamp head
        if (lamp.userData.updateLighting) {
            lamp.userData.updateLighting();
        }

        controls.update();
        renderer.render(scene, camera);
    }

    // Pause auto-rotation on user interaction
    controls.addEventListener('start', () => {
        autoRotate = false;
    });

    // Resume auto-rotation after interaction ends
    controls.addEventListener('end', () => {
        setTimeout(() => {
            autoRotate = true;
        }, 2000);
    });

    animate();
}