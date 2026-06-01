const planetData = [
    { name: "Mercury", radius: 0.8, dist: 18, speed: 0.04, color: 0xA5A5A5 },
    { name: "Venus", radius: 1.2, dist: 26, speed: 0.015, color: 0xFFD39B },
    { name: "Earth", radius: 1.3, dist: 35, speed: 0.01, color: 0x2255EE },
    { name: "Mars", radius: 1.0, dist: 45, speed: 0.008, color: 0xFF5733 },
    { name: "Jupiter", radius: 3.5, dist: 65, speed: 0.004, color: 0xD39C7E },
    { name: "Saturn", radius: 3.0, dist: 85, speed: 0.002, color: 0xE2BF73, rings: true }
];

let scene, camera, renderer, controls, clock;
let sun, pointLight, ambientLight;
let planets = [];
let simulationSpeed = 1;
let focusedPlanet = null;

const solarSystem = {
    get simulationSpeed() { return simulationSpeed; },
    set simulationSpeed(value) { simulationSpeed = value; },
    get pointLight() { return pointLight; },
    get planets() { return planets; }
};

function init() {
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 100, 150);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.NoToneMapping;
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 3, 1000);
    pointLight.decay = 0;
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const textureLoader = new THREE.TextureLoader();
    const skyGeo = new THREE.SphereGeometry(800, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load('https://cdn.prod.website-files.com/63a20c382430f34e85b5c7c5/672e89809c94bd47388d43a9_Starry_Wallpaper_001.png'),
        side: THREE.BackSide
    });
    scene.add(new THREE.Mesh(skyGeo, skyMat));

    const sunGeo = new THREE.SphereGeometry(8, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xFFF4C2 });
    sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    const haloGeo = new THREE.SphereGeometry(10.5, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
        color: 0xFFDD44,
        transparent: true,
        opacity: 0.08,
        side: THREE.FrontSide,
        depthWrite: false
    });
    sun.add(new THREE.Mesh(haloGeo, haloMat));

    planetData.forEach(data => {
        const pivot = new THREE.Object3D();
        scene.add(pivot);

        const planetGeo = new THREE.SphereGeometry(data.radius, 48, 48);

        const planetMat = new THREE.MeshLambertMaterial({
            color: data.color
        });

        const mesh = new THREE.Mesh(planetGeo, planetMat);
        mesh.position.x = data.dist;
        pivot.add(mesh);

        const orbitGeo = new THREE.RingGeometry(data.dist - 0.15, data.dist + 0.15, 128);
        const orbitMat = new THREE.MeshBasicMaterial({
            color: data.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        const orbitLine = new THREE.Mesh(orbitGeo, orbitMat);
        orbitLine.rotation.x = Math.PI / 2;
        scene.add(orbitLine);

        if (data.rings) {
            const ringGeo = new THREE.RingGeometry(data.radius * 1.5, data.radius * 2.5, 64);
            const ringMat = new THREE.MeshBasicMaterial({
                color: data.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.4
            });
            const rings = new THREE.Mesh(ringGeo, ringMat);
            rings.rotation.x = Math.PI / 2.2;
            mesh.add(rings);
        }

        planets.push({ mesh, pivot, data, orbitLine });
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function focusOn(name) {
    if (name === 'default') { focusedPlanet = null; controls.target.set(0, 0, 0); }
    else if (name === 'Sun') { focusedPlanet = sun; }
    else {
        const p = planets.find(pl => pl.data.name === name);
        focusedPlanet = p.mesh;
    }
}

function animate() {
    requestAnimationFrame(animate);
    planets.forEach(p => {
        p.pivot.rotation.y += p.data.speed * simulationSpeed * 0.5;
        p.mesh.rotation.y += 0.01 * simulationSpeed;
    });
    sun.rotation.y += 0.001 * simulationSpeed;

    if (focusedPlanet) {
        const targetPos = new THREE.Vector3();
        focusedPlanet.getWorldPosition(targetPos);
        controls.target.lerp(targetPos, 0.1);
    }

    controls.update();
    renderer.render(scene, camera);
}
