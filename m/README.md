Waterloo Secondary School IT Club Website

Welcome to the official digital presence of the Waterloo Secondary School IT Club from Trinidad and Tobago! This website showcases our club's mission, projects, team members, and past achievements in technology and robotics.
Table of Contents

    About

    Features

    Technologies Used

    Setup and Installation

    Navigation

    3D Background

    Project Structure

    Contributing

    Contact

    License

About

The WSS IT Club is dedicated to fostering innovation and practical skills in various fields of technology. Our expertise spans:

    Arduino Microcontrollers: Building interactive electronics and automation systems.

    LEGO Mindstorms Robotics: Creating programmable robots for problem-solving challenges.

    Scratch Programming: Teaching computational thinking through visual coding.

    Computer Building & Repair: Hands-on hardware workshops and tech support.

    3D Printing: Designing and prototyping physical components.

    Advanced Software Development: Developing innovative solutions for various applications.

This website serves as a dynamic portfolio of our work and a hub for information about our club.
Features

✨ Modern, Bubble-Glassy Aesthetic: A sleek, dark theme with vibrant neon green and blue accents, featuring translucent, blurred elements and glowing effects.
⚙️ Dynamic 3D Background: An interactive Three.js powered background showcasing floating 3D models of CPUs, RAM sticks, and PC cases, connected by sparking wires.
🚀 Smooth Scrolling Navigation: Effortlessly navigate between sections with smooth scroll animations.
🔗 Clean URL Routing: Experience a modern web feel with clean URLs (e.g., /our-team instead of #our-team-section), managed client-side for a single-page application experience.
📱 Fully Responsive Design: Optimized for seamless viewing and interaction across all devices and screen sizes (desktop, tablet, mobile).
🖼️ Interactive Project Showcase: A dynamic slideshow with image and video content, complete with navigation controls and thumbnails.
⚡ Service Worker for Offline Access: The website is progressive web app (PWA) ready, offering offline capabilities for cached content.
🌟 Intersection Observer Animations: Sections animate into view as you scroll, creating an engaging "video presentation" effect.
Technologies Used

    HTML5: For structuring the web content.

    CSS3: For styling and animations, implementing the bubble-glassy theme.

    JavaScript (ES6+): For interactive elements, DOM manipulation, and client-side routing.

    Three.js (r128): A JavaScript 3D library used for rendering the interactive 3D background.

    Service Worker API: For enhancing the website with offline capabilities and faster loading times.

Setup and Installation

To run this project locally:

    Clone the repository:

    git clone https://github.com/your-username/waterloo-robotics.git
    cd waterloo-robotics

    Open index.html:
    Simply open the index.html file in your web browser. Due to the service worker and clean URL routing, it's recommended to serve this project via a local web server (e.g., using Python's http.server or Node.js's serve package) for the best experience, especially for navigation and PWA features.

    Using Python:

    python -m http.server 8000

    Then, open your browser and go to http://localhost:8000.

    Using Node.js (serve package):

    npm install -g serve
    serve .

    Then, open your browser and go to the address provided by serve (e.g., http://localhost:3000).

Navigation

The website uses client-side routing to provide clean URLs without page reloads.

    Home: /

    Our Team: /our-team

    Our Projects: /our-projects

    Past Events: /past-events

    Project Showcase: /project-showcase

Clicking on navigation links or using browser back/forward buttons will smoothly scroll you to the corresponding section.
3D Background

The interactive 3D background is powered by Three.js and features:

    Floating Components: Animated 3D models of CPUs, RAM sticks, and generic PC cases.

    Sparking Wires: Subtle glowing lines connecting the components, with occasional spark effects.

    Parallax Effect: The camera subtly shifts based on mouse movement, adding depth to the scene.

Project Structure

.
├── index.html            # Main HTML file containing all content sections
├── index.style.css       # All CSS for styling the website
├── index.script.js       # All JavaScript for interactivity, 3D background, and routing
├── manifest.json         # Web App Manifest for PWA features
├── sw.js                 # Service Worker script for offline caching
└── Assets/               # Directory for multimedia assets (videos, etc.)
    └── xLs.mp4
    └── xLs7.mp4

Contributing

We welcome contributions to improve our website! If you have suggestions or find issues, please open an issue or submit a pull request.
Contact

For inquiries, please contact the WSS IT Club at:
📧 wssinfotechclub@gmail.com
License

This project is open source and available under the MIT License.
