import * as THREE from 'three';

export function addLighting(scene, lamp) {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Get lamp components
    const headGroup = lamp.getObjectByName('Head Group');
    const bulb = headGroup.getObjectByName('Bulb');
    const headPosition = new THREE.Vector3();
    const bulbPosition = new THREE.Vector3();

    // Spotlight from the lamp
    const spotLight = new THREE.SpotLight(0xfff5e1, 80, 20, Math.PI / 8, 0.4, 2);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 25;
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.normalBias = 0.02;
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Volumetric light cone
    const coneGeometry = new THREE.ConeGeometry(3, 10, 64, 1, true);
    const coneMaterial = new THREE.MeshBasicMaterial({
        color: 0xfff5e1,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
        depthWrite: false
    });
    const lightCone = new THREE.Mesh(coneGeometry, coneMaterial);
    lightCone.position.y = 5;
    lightCone.position.x = 0;
    lightCone.rotation.z = Math.PI;
    const coneGroup = new THREE.Group();
    coneGroup.add(lightCone);
    scene.add(coneGroup);

    // Point light for bulb glow
    const bulbLight = new THREE.PointLight(0xfff5e1, 2, 5);
    scene.add(bulbLight);

    // Glow effect
    const glowGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xfff5e1,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Update function for synchronized lighting
    function updateLighting() {
        bulb.getWorldPosition(bulbPosition);
        headGroup.getWorldPosition(headPosition);

        const headQuaternion = new THREE.Quaternion();
        headGroup.getWorldQuaternion(headQuaternion);

        // Update Spotlight
        spotLight.position.copy(bulbPosition).add(new THREE.Vector3(0, 0.4, 0));
        const direction = new THREE.Vector3(0.3, 1, 0).applyQuaternion(headQuaternion);
        spotLight.target.position.copy(bulbPosition).add(direction);

        // Update Volumetric Cone
        coneGroup.position.copy(bulbPosition);
        coneGroup.quaternion.copy(headQuaternion);

        // Update Bulb Light and Glow
        bulbLight.position.copy(bulbPosition);
        glow.position.copy(bulbPosition);
    }

    lamp.userData.updateLighting = updateLighting;
    return {};
}