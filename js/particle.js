import * as THREE from "three";
import SimplexNoise from "simplex-noise";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(4, 2, 8);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0); // Hace el fondo transparente
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("canvas-container").appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Generar las olas con ruido simplex
const geometry = new THREE.PlaneGeometry(6, 4, 150, 100);
const pos = geometry.getAttribute('position');
const simplex = new SimplexNoise();

const waves = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
        size: 0.02,
        color: 0x2757AB,  // Blanco en HEX
        transparent: true,
        opacity: 1      // 50% de transparencia
    })
);
waves.rotation.x = -Math.PI / 2;
scene.add(waves);

function animationLoop(t) {
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = 0.5 * simplex.noise3D(x / 2, y / 2, t / 5000);

        pos.setZ(i, z);
    }
    pos.needsUpdate = true;

    renderer.render(scene, camera);
}



renderer.setAnimationLoop(animationLoop);