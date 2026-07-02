const app = new App({ setup, animate, preload });

window.onload = app.init;
window.onresize = app.handleResize;

const loader = new THREE.TextureLoader();
const data = {}

function toGlobePosition(lat, lng) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (180 - lng) * Math.PI / 180;

  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: -Math.sin(phi) * Math.sin(theta),
  };
}

function getInitialGlobeRotation(lat, lng) {
  const position = toGlobePosition(lat, lng);
  return -Math.atan2(position.x, position.z);
}

function ensurePhilippinesCountry() {
  if(!Array.isArray(data.countries)) {
    return;
  }

  const hasPhilippines = data.countries.some(country => country.name === 'Philippines');

  if(!hasPhilippines) {
    data.countries.push({
      name: 'Philippines',
      latitude: '12.8797',
      longitude: '121.7740'
    });
  }
}


async function preload() {
  try {
    // const gridUrl = '../assets/data/grid.json';
    // const gridRes = await fetch(gridUrl);
    // const grid = await gridRes.json();
    // data.grid = grid;

    // const countryUrl = '../assets/data/countries.json';
    // const countryRes = await fetch(countryUrl);
    // const countries = await countryRes.json();
    // data.countries = countries;

    // const connectionsUrl = '../assets/data/connections.json';
    // const connectionsRes = await fetch(connectionsUrl);
    // const connections = await connectionsRes.json();
    // data.connections = getCountries(connections, countries);    

    return true;
  } catch(error) {
    console.log(error);
  }
}


function setup(app) {
  ensurePhilippinesCountry();

  app.camera.position.z = config.sizes.globe * 2.85;
  app.camera.position.y = config.sizes.globe * 0;

  groups.main = new THREE.Group();
  groups.main.name = 'Main';

  const globe = new Globe();
  globe.rotation.y = getInitialGlobeRotation(12.8797, 121.7740);
  groups.main.add(globe);

  const points = new Points(data.grid);
  groups.globe.add(groups.points);

  const markers = new Markers(data.countries);
  groups.globe.add(groups.markers);

  const lines = new Lines();
  groups.globe.add(groups.lines);

  app.scene.add(groups.main);
}


function animate(app) {
  if(elements.lineDots) {
    for(let i = 0; i < elements.lineDots.length; i++) {
      const dot = elements.lineDots[i];
      dot.material.color.set(config.colors.globeLinesDots);
      dot.animate();
    }
  }

  if(elements.markers) {
    for(let i = 0; i < elements.markers.length; i++) {
      const marker = elements.markers[i];
      marker.point.material.color.set(config.colors.globeMarkerColor);
      marker.glow.material.color.set(config.colors.globeMarkerGlow);
      marker.label.material.map.needsUpdate = true;
      marker.animateGlow();
    }
  }

  if(animations.rotateGlobe) {
    groups.globe.rotation.y += 0.0025;
  }
}

