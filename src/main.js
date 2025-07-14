import { solarSystem } from "./data/solar-system";
import { loadInfo, loadPlanets, transformPlanetsY } from "./modules/planets";
import "./style.css";

let selected = 0;
loadPlanets();
loadInfo(selected);

document.querySelector('#previous').addEventListener('click', () => {
    if (selected > 0) {
        transformPlanetsY('previous');
        selected = selected - 1;
    }
    loadInfo(selected);
})
document.querySelector('#next').addEventListener('click', () => {
    if (selected < solarSystem.length - 1) {
        transformPlanetsY('next');
        selected = selected + 1
    }
    else {
        transformPlanetsY('reset');
        selected = 0;
    }
    loadInfo(selected);
})