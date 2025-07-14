import { solarSystem } from "../data/solar-system";

const planetList = document.querySelector("#planetList");

export function loadPlanets() {
    let order = 0;
    for (let star of solarSystem) {
        const starNode = document.createElement('img');
        starNode.src = `${star.name.toLowerCase()}.png`;
        starNode.className = 'min-h-full grayscale-75';
        starNode.style.order = order;
        planetList.appendChild(starNode);
        if (order == 0) {
            starNode.id = 'selected';
            loadInfo();
        }
        order++;
    }
}

export function loadInfo() {
    document.querySelector('#name').textContent = solarSystem[0].name;
    document.querySelector('#description').textContent = solarSystem[0].description;
    document.querySelector('#radius').textContent = solarSystem[0].radius_km + 'km';
    document.querySelector('#mass').textContent = solarSystem[0].mass_kg + 'kg';
    document.querySelector('#distance').textContent = solarSystem[0].distance_from_sun_km + 'km';
}