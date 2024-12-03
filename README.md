# **IGDTUW 3D Campus Map**

A web-based interactive 3D map of the IGDTUW campus, created using Three.js, GSAP, and WebGL. This project allows users to explore the campus, search for buildings, navigate between them, and toggle between day and night modes.

---

## **Features**

- **3D Campus Model**: View the IGDTUW campus in 3D with detailed navigation.
- **Search Functionality**: Search for buildings and focus the camera on them.
- **Live Navigation Guidance**: Follow pre-determined paths between buildings with animated arrows and smooth camera transitions.
- **Day/Night Mode**: Toggle between day and night modes for the scene lighting.
- **Interactive UI**: Includes a sidebar with search suggestions, building focus, and a feedback form.
- **Responsive Design**: The map is mobile-friendly and adjusts well across various screen sizes.

---

## **Project Structure**

3d-campus-map/

index.html           # Main HTML file for the webpage

styles.css           # Styles for the webpage and 3D model layout

script.js            # JavaScript handling 3D rendering and interactivity

├── models/              # Folder for storing 3D models (e.g., igdtuw campus model)

  └── igdtuw.glb       # 3D GLTF model of IGDTUW campus
  
├── assets/              # Folder for storing images, icons, and other assets

   ├── logo.png         # Logo image 
   
  └── icons/           # Icons for buttons or UI elements
  
 feedback    # (Optional) Folder for feedback-related backend code
 
 README.md            # Project documentation

---

## **Technologies Used**

- **Three.js**: For 3D rendering and model loading.
- **GSAP**: For smooth animations and camera transitions.
- **OrbitControls.js**: For interactive camera controls (rotate, zoom, pan).
- **WebGL**: For rendering 3D content on the web.
- **HTML5 & CSS3**: For webpage layout, responsiveness, and styling.
- **JavaScript**: For interactivity, animations, and logic.

---

## **Installation Instructions**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/3d-campus-map.git
   cd 3d-campus-map

	2.	Install dependencies (if required):
This project doesn’t require any additional Node.js packages since it only uses external CDN links for the libraries. Ensure you have an internet connection to load external resources like Three.js, GSAP, and the GLTF models.
	3.	Open the project in your browser:
Open the index.html file directly in a browser (e.g., Chrome, Firefox).

open index.html

How to Use

	•	Search for Buildings: Type the name of a building in the search box. Click a building from the suggestions to focus the camera on it.
	•	Navigation: Follow the animated paths between buildings. Click on buildings to start navigation.
	•	Day/Night Mode: Toggle between day and night modes by clicking the “Day/Night Mode” button.
	•	Feedback: Use the feedback form in the bottom right corner to submit comments or suggestions.

Customization

	•	Adding More Buildings: To add more buildings to the search, modify the buildings array in script.js. You can adjust their names and positions.
Example:

const buildings = [
  { name: 'Library', position: { x: 10, y: 5, z: 15 } },
  { name: 'Hostel', position: { x: -10, y: 5, z: -15 } },
  { name: 'Main Gate', position: { x: 0, y: 5, z: 0 } },
  // Add more buildings here...
];


	•	Adding New Models: If you want to add more models to the 3D map:
	1.	Place your GLTF/GLB file in the models/ folder.
	2.	Update the gltfLoader.load line in script.js to load your new model.
	•	Changing the Map’s Look: Adjust the lights, materials, and camera angles in the script.js file. You can also update the styling in styles.css to customize the UI.

Contributing

Feel free to fork the project, create an issue, or submit a pull request. Contributions are welcome!

License

This project is open-source and available under the MIT License.

Acknowledgments

	•	Thanks to the creators of Three.js, GSAP, and OrbitControls.js for providing powerful libraries that made this project possible.
	•	3D model of the IGDTUW campus ().

Contact

If you have any questions or feedback, feel free to reach out to me at:
	•	Email: [divi2749@gmail.com]
	•	GitHub: https://github.com/divi-24

This `README.md` will help users and developers to understand the structure, installation, and usage of your IGDTUW 3D Campus Map project.
