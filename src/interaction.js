import * as THREE from 'three';

export function setupInteraction(scene, camera, renderer, lamp) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const infoDiv = document.getElementById('info');
    let selectedObject = null;

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(lamp.children, true);

        if (intersects.length > 0) {
            const obj = intersects[0].object;
            document.body.style.cursor = 'pointer';
            infoDiv.textContent = `Hovering: ${obj.name}`;
        } else {
            document.body.style.cursor = 'default';
            infoDiv.textContent = 'Click lamp parts to identify them';
        }
    }

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(lamp.children, true);

        if (intersects.length > 0) {
            const obj = intersects[0].object;

            // Reset previous selection
            if (selectedObject) {
                selectedObject.scale.set(1, 1, 1);
                selectedObject.material.color.set(selectedObject.material.originalColor || obj.material.color);
            }

            // Highlight new selection
            selectedObject = obj;
            selectedObject.material.originalColor = selectedObject.material.color.getHex();
            selectedObject.material.color.set(0xff0000);
            selectedObject.scale.set(1.1, 1.1, 1.1);
            infoDiv.textContent = `Selected: ${obj.name}`;

            // Reset highlight after 1 second
            setTimeout(() => {
                if (selectedObject) {
                    selectedObject.scale.set(1, 1, 1);
                    selectedObject.material.color.set(selectedObject.material.originalColor);
                    selectedObject = null;
                    infoDiv.textContent = 'Click lamp parts to identify them';
                }
            }, 1000);
        }
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseClick);
}