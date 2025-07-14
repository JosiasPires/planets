import { solarSystem } from "../data/solar-system";

const planetList = document.querySelector("#planetList");

export function loadPlanets() {
    let order = 0;
    for (let star of solarSystem) {
        const starNode = document.createElement('img');
        starNode.src = `${star.name.toLowerCase()}.png`;
        starNode.className = 'min-h-full';
        starNode.style.order = order;
        planetList.appendChild(starNode);
        order++;
    }
}

let y = 0
const height = document.querySelector('#planetList').offsetHeight;
export function transformPlanetsY(option) {
    if (option == 'next') {
        y -= height; 
    }
    else if (option == 'reset') {
        y = 0;
    }
    else if (option == 'previous') {
        y += height; 
    }
    planetList.style.transform = `translateY(${y}px)`;
}

export function loadInfo(order) {
    document.querySelector('#name').textContent = solarSystem[order].name;
    document.querySelector('#description').textContent = solarSystem[order].description;
    document.querySelector('#radius').textContent = solarSystem[order].radius_km + 'km';
    document.querySelector('#mass').textContent = solarSystem[order].mass_kg + 'kg';
    document.querySelector('#distance').textContent = solarSystem[order].distance_from_sun_km + 'km';
}