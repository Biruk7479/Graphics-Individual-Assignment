// import * as THREE from 'three';

// export function initScene() {
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf0f0f0);

//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(5, 5, 5);
//     camera.lookAt(0, 0, 0);

//     const renderer = new THREE.WebGLRenderer({ 
//         antialias: true,
//         alpha: false
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     document.body.appendChild(renderer.domElement);

//     // Add a floor plane
//     const floorGeometry = new THREE.PlaneGeometry(20, 20);
//     const floorMaterial = new THREE.MeshStandardMaterial({ 
//         color: 0xffffff,
//         roughness: 0.8,
//         metalness: 0.2
//     });
//     const floor = new THREE.Mesh(floorGeometry, floorMaterial);
//     floor.rotation.x = -Math.PI / 2;
//     floor.position.y = 0;
//     floor.receiveShadow = true;
//     scene.add(floor);

//     window.addEventListener('resize', () => {
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     });

//     return { scene, camera, renderer };
// }



import * as THREE from 'three';

export function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x34495e);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4, 4, 6);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    document.body.appendChild(renderer.domElement);

    // Floor plane
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0xb0bec5,
        roughness: 0.7,
        metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { scene, camera, renderer };
}