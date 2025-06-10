import * as THREE from 'three';

export function createLamp(scene) {
    const lampGroup = new THREE.Group();
    lampGroup.name = 'lamp';

    // --- Materials ---
    const armMaterial = new THREE.MeshStandardMaterial({
        color: 0x8793a2, 
        metalness: 0.8,
        roughness: 0.4
    });

    const jointMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a5461, 
        metalness: 0.9,
        roughness: 0.3
    });

    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x555555,
        metalness: 0.7,
        roughness: 0.1
    });

    // --- Base ---
    const baseShape = new THREE.Shape();
    baseShape.moveTo(0, 0);
    baseShape.absarc(0, 0, 0.8, 0, Math.PI * 2, false);
    const baseHole = new THREE.Path();
    baseHole.moveTo(0, 0);
    baseHole.absarc(0, 0, 0.15, 0, Math.PI * 2, true);
    baseShape.holes.push(baseHole);
    const extrudeSettings = {
        steps: 1,
        depth: 0.15,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 4
    };
    const baseGeometry = new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.rotation.x = -Math.PI / 2;
    base.name = 'Base';
    lampGroup.add(base);

    // --- Lower Arm ---
    const lowerArmGeometry = new THREE.CapsuleGeometry(0.1, 1.5, 4, 16);
    const lowerArm = new THREE.Mesh(lowerArmGeometry, armMaterial);
    lowerArm.position.y = 0.95;
    lowerArm.name = 'Lower Arm';
    lampGroup.add(lowerArm);

    // --- Lower Hinge (Joint) ---
    const lowerHingeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const lowerHinge = new THREE.Mesh(lowerHingeGeometry, jointMaterial);
    lowerHinge.position.y = 1.8;
    lowerHinge.name = 'Lower Hinge';
    lampGroup.add(lowerHinge);

    // --- Upper Part Group ---
    const upperPart = new THREE.Group();
    upperPart.position.set(0, 1.8, 0);
    upperPart.rotation.z = Math.PI / 4;
    upperPart.name = 'Upper Part';

    // --- Upper Arm ---
    const upperArmGeometry = new THREE.CapsuleGeometry(0.1, 1.5, 4, 16);
    const upperArm = new THREE.Mesh(upperArmGeometry, armMaterial);
    upperArm.position.y = 0.75;
    upperArm.name = 'Upper Arm';
    upperPart.add(upperArm);

    // --- Head Group ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.5, 0);
    headGroup.rotation.z = Math.PI / 2;
    headGroup.name = 'Head Group';

    // --- Lamp Head (Shade) ---
    const lampShadePoints = [];
    lampShadePoints.push(new THREE.Vector2(0.1, 0));
    lampShadePoints.push(new THREE.Vector2(0.5, 0));
    lampShadePoints.push(new THREE.Vector2(0.6, 0.8));
    lampShadePoints.push(new THREE.Vector2(0.2, 0.8));
    const lampShadeGeometry = new THREE.LatheGeometry(lampShadePoints, 32);
    const lampShadeMaterial = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.5,
        roughness: 0.4,
        side: THREE.DoubleSide
    });
    const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
    lampShade.name = 'Lamp Head';
    headGroup.add(lampShade);

    // --- Bulb ---
    const bulbGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const bulbMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff99,
        emissive: 0xffff99,
        emissiveIntensity: 0.8
    });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.set(0, 0.4, 0);
    bulb.name = 'Bulb';
    headGroup.add(bulb);

    upperPart.add(headGroup);
    lampGroup.add(upperPart);

    scene.add(lampGroup);
    return lampGroup;
}