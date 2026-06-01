function setupUIControls(solarSystem) {
    document.getElementById('speedRange').oninput = (e) => {
        solarSystem.simulationSpeed = e.target.value;
    };

    document.getElementById('lightRange').oninput = (e) => {
        solarSystem.pointLight.intensity = parseFloat(e.target.value);
    };

    document.getElementById('planetSelect').onchange = (e) => {
        focusOn(e.target.value);
    };

    document.getElementById('orbitBtn').onclick = () => {
        solarSystem.planets.forEach(p => p.orbitLine.visible = !p.orbitLine.visible);
    };
}
