// import * as THREE from 'three';

// export function addLighting(scene, lamp) {
//     // Ambient Light - reduced intensity
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
//     scene.add(ambientLight);

//     // Add a directional light for better overall illumination
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     // Get the lamp head position from the lamp group
//     const headGroup = lamp.getObjectByName('Head Group');
//     const bulb = headGroup.getObjectByName('Bulb');
//     const headPosition = new THREE.Vector3();
//     const bulbPosition = new THREE.Vector3();
//     headGroup.getWorldPosition(headPosition);
//     bulb.getWorldPosition(bulbPosition);

//     // Create a target for the spotlight
//     const target = new THREE.Object3D();
//     target.position.set(bulbPosition.x, bulbPosition.y - 5, bulbPosition.z);
//     scene.add(target);

//     // Configurable spotlight position offset
//     const spotLightOffset = new THREE.Vector3(-0.9, -0.9, 0);

//     // Enhanced SpotLight from Lamp Head
//     const spotLight = new THREE.SpotLight(0xffffcc, 2, 15, Math.PI / 6, 0.3, 1);
//     spotLight.position.copy(bulbPosition).add(spotLightOffset);
//     spotLight.target = target;
//     spotLight.castShadow = true;
//     spotLight.shadow.mapSize.width = 1024;
//     spotLight.shadow.mapSize.height = 1024;
//     spotLight.shadow.camera.near = 0.5;
//     spotLight.shadow.camera.far = 20;
//     scene.add(spotLight);

//     // Enhanced Volumetric Light Cone
//     const coneGeometry = new THREE.ConeGeometry(1.5, 4, 32);
//     const coneMaterial = new THREE.MeshBasicMaterial({
//         color: 0xffffcc,
//         transparent: true,
//         opacity: 0.15,
//         side: THREE.FrontSide,
//         depthWrite: false
//     });
//     const lightCone = new THREE.Mesh(coneGeometry, coneMaterial);
//     lightCone.position.copy(bulbPosition).add(spotLightOffset);
//     lightCone.rotation.z = -Math.PI / 2;
//     scene.add(lightCone);

//     // Add a point light at the bulb position for additional illumination
//     const bulbLight = new THREE.PointLight(0xffffcc, 0.8, 3);
//     bulbLight.position.copy(bulbPosition);
//     scene.add(bulbLight);

//     // Add a subtle glow effect around the bulb
//     const glowGeometry = new THREE.SphereGeometry(0.2, 32, 32);
//     const glowMaterial = new THREE.MeshBasicMaterial({
//         color: 0xffffcc,
//         transparent: true,
//         opacity: 0.3,
//         side: THREE.BackSide
//     });
//     const glow = new THREE.Mesh(glowGeometry, glowMaterial);
//     glow.position.copy(bulbPosition);
//     scene.add(glow);

//     // Update function to keep light synchronized with lamp head
//     function updateLighting() {
//         headGroup.getWorldPosition(headPosition);
//         bulb.getWorldPosition(bulbPosition);
//         const headRotation = new THREE.Euler();
//         headRotation.setFromQuaternion(headGroup.getWorldQuaternion(new THREE.Quaternion()));
        
//         const direction = new THREE.Vector3(0, -1, 0);
//         direction.applyEuler(headRotation);
        
//         spotLight.position.copy(bulbPosition).add(spotLightOffset);
//         target.position.copy(bulbPosition).add(direction.multiplyScalar(5));
        
//         lightCone.position.copy(bulbPosition).add(spotLightOffset);
//         lightCone.rotation.copy(headRotation);
        
//         bulbLight.position.copy(bulbPosition);
//         glow.position.copy(bulbPosition);
//     }

//     lamp.userData.updateLighting = updateLighting;
//     return { spotLightOffset };
// }






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
    const spotLight = new THREE.SpotLight(0xfff5e1, 150, 20, Math.PI / 4, 0.3, 1);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 25;
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Volumetric light cone
    const coneGeometry = new THREE.ConeGeometry(3, 5, 64, 1, true);
    const coneMaterial = new THREE.MeshBasicMaterial({
        color: 0xfff5e1,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
        depthWrite: false
    });
    const lightCone = new THREE.Mesh(coneGeometry, coneMaterial);
    lightCone.position.y = 2.5;
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
        spotLight.position.copy(bulbPosition);
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