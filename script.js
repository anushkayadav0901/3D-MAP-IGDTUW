// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 20, 10);
scene.add(ambientLight, directionalLight);

// Buildings Data
const buildings = [
  { name: 'Library', position: { x: 10, y: 0, z: 15 } },
  { name: 'Hostel', position: { x: -10, y: 0, z: -15 } },
  { name: 'Main Gate', position: { x: 0, y: 0, z: 0 } },
  { name: 'Academic Block', position: { x: 5, y: 0, z: -5 } },
];

// Navigation Paths Data
const paths = [
  { from: 'Main Gate', to: 'Library', waypoints: [{ x: 5, y: 0, z: 10 }] },
  { from: 'Main Gate', to: 'Hostel', waypoints: [{ x: -5, y: 0, z: -10 }] },
  { from: 'Library', to: 'Academic Block', waypoints: [{ x: 7, y: 0, z: 10 }] },
];

// Render 3D Models
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load('models/igdtuw.glb', (gltf) => {
  const campus = gltf.scene;
  scene.add(campus);
  document.getElementById('loading-screen').style.display = 'none';
});

// Highlight and Navigate
let selectedStart = null;
let selectedEnd = null;

function highlightBuilding(building) {
  const tooltip = document.getElementById('tooltip');
  tooltip.style.display = 'block';
  tooltip.textContent = `Building: ${building.name}`;
  setTimeout(() => {
    tooltip.style.display = 'none';
  }, 2000);

  const position = building.position;
  gsap.to(camera.position, { x: position.x + 10, y: position.y + 15, z: position.z + 10, duration: 2 });
  camera.lookAt(position.x, position.y, position.z);
}

document.getElementById('search-box').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const suggestions = buildings.filter((b) => b.name.toLowerCase().includes(query));
  const suggestionList = document.getElementById('search-suggestions');
  suggestionList.innerHTML = '';
  suggestions.forEach((suggestion) => {
    const li = document.createElement('li');
    li.textContent = suggestion.name;
    li.addEventListener('click', () => highlightBuilding(suggestion));
    suggestionList.appendChild(li);
  });
});

function calculatePath(from, to) {
  const path = paths.find((p) => p.from === from.name && p.to === to.name);
  if (path) {
    const waypoints = [from.position, ...path.waypoints, to.position];
    drawPath(waypoints);
    showLiveNavigation(waypoints);
  } else {
    alert('Path not available!');
  }
}

function drawPath(waypoints) {
  const points = waypoints.map((wp) => new THREE.Vector3(wp.x, wp.y, wp.z));
  const pathGeometry = new THREE.BufferGeometry().setFromPoints(points);

  const pathMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  const pathLine = new THREE.Line(pathGeometry, pathMaterial);
  scene.add(pathLine);
}

function showLiveNavigation(waypoints) {
  let currentIndex = 0;
  const arrow = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(waypoints[currentIndex].x, waypoints[currentIndex].y, waypoints[currentIndex].z),
    5,
    0xff0000
  );
  scene.add(arrow);

  const navigate = () => {
    if (currentIndex < waypoints.length - 1) {
      const nextPoint = waypoints[currentIndex + 1];
      gsap.to(arrow.position, {
        x: nextPoint.x,
        y: nextPoint.y,
        z: nextPoint.z,
        duration: 2,
        onComplete: () => {
          currentIndex++;
          arrow.setDirection(
            new THREE.Vector3(
              waypoints[currentIndex + 1].x - nextPoint.x,
              waypoints[currentIndex + 1].y - nextPoint.y,
              waypoints[currentIndex + 1].z - nextPoint.z
            ).normalize()
          );
          navigate();
        },
      });
    } else {
      scene.remove(arrow);
    }
  };
  navigate();
}

// Set Start and End Points for Navigation
document.getElementById('search-box').addEventListener('change', (e) => {
  const selectedBuilding = buildings.find((b) => b.name.toLowerCase() === e.target.value.toLowerCase());
  if (selectedStart === null) {
    selectedStart = selectedBuilding;
    alert(`Start point set to ${selectedStart.name}`);
  } else if (selectedEnd === null) {
    selectedEnd = selectedBuilding;
    alert(`End point set to ${selectedEnd.name}`);
    calculatePath(selectedStart, selectedEnd);
    selectedStart = null;
    selectedEnd = null;
  }
});

// Reset Navigation
document.getElementById('reset-navigation').addEventListener('click', () => {
  selectedStart = null;
  selectedEnd = null;
  alert('Navigation reset. Please select new start and end points.');
});

// Animation Loop
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();