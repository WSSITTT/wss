if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.error('ServiceWorker registration failed: ', err);
            });
    });
}

function navigateTo(event, path, sectionId) {
    event.preventDefault();
    window.history.pushState({}, '', path);
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const menuBackdrop = document.getElementById('menuBackdrop');

    function openMobileMenu() {
        mobileNav.classList.add('active');
        menuBackdrop.classList.add('active');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    window.closeMobileMenu = () => {
        mobileNav.classList.remove('active');
        menuBackdrop.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    if (menuToggle && mobileNav && menuBackdrop) {
        menuToggle.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                window.closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        menuBackdrop.addEventListener('click', window.closeMobileMenu);

        document.querySelectorAll('.mobile-nav .btn').forEach(item => {
            item.addEventListener('click', window.closeMobileMenu);
        });
    } else {
        console.warn("Mobile menu elements not found. Mobile menu functionality may be impaired.");
    }

    let currentSlide = 0;
    let slides = Array.from(document.querySelectorAll('#slideshowContainer .slide'));
    let thumbnails = Array.from(document.querySelectorAll('#thumbnailContainer .thumbnail'));
    let slideInterval;
    let isPlaying = true;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            const video = slide.querySelector('video');
            if (video) video.pause();
        });
        thumbnails.forEach(thumb => thumb.classList.remove('active'));

        if (slides[index]) {
            slides[index].classList.add('active');
            const video = slides[index].querySelector('video');
            if (video) {
                video.play();
                if (isPlaying) {
                    pauseSlideShow();
                }
            }
        }
        if (thumbnails[index]) {
            thumbnails[index].classList.add('active');
        }

        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
        isPlaying = true;
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = 'Pause';
            playPauseBtn.classList.remove('btn-secondary');
            playPauseBtn.classList.add('btn');
        }
    }

    function pauseSlideShow() {
        clearInterval(slideInterval);
        isPlaying = false;
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.textContent = 'Play';
            playPauseBtn.classList.remove('btn');
            playPauseBtn.classList.add('btn-secondary');
        }
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');

    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (isPlaying) pauseSlideShow();
        prevSlide();
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (isPlaying) pauseSlideShow();
        nextSlide();
    });
    if (playPauseBtn) playPauseBtn.addEventListener('click', () => {
        if (isPlaying) startSlideShow();
        else startSlideShow();
    });

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.dataset.index);
            if (isPlaying) pauseSlideShow();
            showSlide(index);
        });
        thumb.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                thumb.click();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            if (isPlaying) pauseSlideShow();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            if (isPlaying) pauseSlideShow();
            prevSlide();
        } else if (e.key === ' ') {
            e.preventDefault();
            if (isPlaying) pauseSlideShow();
            else startSlideShow();
        }
    });

    if (slides.length > 0) {
        showSlide(0);
        startSlideShow();
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = init3DBackground;
    document.head.appendChild(script);

    const pathSectionMap = {
        '/': '#home-section',
        '/our-team': '#our-team-section',
        '/our-projects': '#our-projects-section',
        '/past-events': '#past-events-section',
        '/project-showcase': '#project-showcase-section'
    };

    const currentPath = window.location.pathname;
    let initialSectionId = '#home-section';

    if (pathSectionMap[currentPath]) {
        initialSectionId = pathSectionMap[currentPath];
    }

    const initialTargetSection = document.querySelector(initialSectionId);
    if (initialTargetSection) {
        setTimeout(() => {
            initialTargetSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    window.addEventListener('popstate', () => {
        const popstatePath = window.location.pathname;
        let popstateSectionId = '#home-section';
        if (pathSectionMap[popstatePath]) {
            popstateSectionId = pathSectionMap[popstatePath];
        }
        const popstateTargetSection = document.querySelector(popstateSectionId);
        if (popstateTargetSection) {
            popstateTargetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

let scene, camera, renderer, computerPartsGroup, wiresGroup, sparksGroup;
let mouseX = 0, mouseY = 0;
const objectCount = 40;
const wireCount = 30;
const sparkCount = 100;
const objects = [];
const wires = [];
const sparks = [];

function init3DBackground() {
    const container = document.getElementById('threejs-background');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    computerPartsGroup = new THREE.Group();
    wiresGroup = new THREE.Group();
    sparksGroup = new THREE.Group();
    scene.add(computerPartsGroup);
    scene.add(wiresGroup);
    scene.add(sparksGroup);

    const cpuMaterial = new THREE.MeshPhongMaterial({ color: 0x00e0ff, emissive: 0x00e0ff, emissiveIntensity: 0.6, shininess: 150 });
    const ramMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff80, emissive: 0x00ff80, emissiveIntensity: 0.6, shininess: 150 });
    const pcMaterial = new THREE.MeshPhongMaterial({ color: 0x00e0ff, emissive: 0x00e0ff, emissiveIntensity: 0.3, shininess: 80 });
    const wireMaterial = new THREE.LineBasicMaterial({ color: 0x00ff80, linewidth: 3, transparent: true, opacity: 0.8 });
    const sparkMaterial = new THREE.PointsMaterial({ color: 0x00e0ff, size: 0.2, transparent: true, blending: THREE.AdditiveBlending, map: createSparkTexture(), depthWrite: false });

    function createSparkTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0,224,255,1)');
        gradient.addColorStop(0.8, 'rgba(0,224,255,0)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        return new THREE.CanvasTexture(canvas);
    }

    function createCpuObject() {
        const cpuGroup = new THREE.Group();
        const base = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.1), cpuMaterial);
        cpuGroup.add(base);
        const core = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.15), cpuMaterial);
        core.position.z = 0.05;
        cpuGroup.add(core);
        return cpuGroup;
    }

    function createRamObject() {
        const ramGroup = new THREE.Group();
        const base = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, 0.05), ramMaterial);
        ramGroup.add(base);
        for (let i = -0.5; i <= 0.5; i += 0.25) {
            const chip = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.06), ramMaterial);
            chip.position.y = i;
            chip.position.z = 0.03;
            ramGroup.add(chip);
        }
        return ramGroup;
    }

    function createPcCaseObject() {
        const pcCaseGroup = new THREE.Group();
        const mainBox = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.8, 0.5), pcMaterial);
        pcCaseGroup.add(mainBox);
        const frontPanel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, 0.05), new THREE.MeshPhongMaterial({ color: 0x050505, emissive: 0x050505, emissiveIntensity: 0.1, shininess: 10 }));
        frontPanel.position.z = 0.26;
        frontPanel.position.y = 0.2;
        pcCaseGroup.add(frontPanel);
        return pcCaseGroup;
    }

    for (let i = 0; i < objectCount; i++) {
        let object;
        const type = Math.random();
        if (type < 0.33) {
            object = createCpuObject();
            object.userData.type = 'cpu';
        } else if (type < 0.66) {
            object = createRamObject();
            object.userData.type = 'ram';
        } else {
            object = createPcCaseObject();
            object.userData.type = 'pc';
        }

        object.position.set(
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25
        );
        object.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        object.userData.rotationSpeed = new THREE.Vector3(
            (Math.random() - 0.5) * 0.008,
            (Math.random() - 0.5) * 0.008,
            (Math.random() - 0.5) * 0.008
        );
        object.userData.floatSpeed = new THREE.Vector3(
            (Math.random() - 0.5) * 0.005,
            (Math.random() - 0.5) * 0.005,
            (Math.random() - 0.5) * 0.005
        );
        objects.push(object);
        computerPartsGroup.add(object);
    }

    for (let i = 0; i < wireCount; i++) {
        const startObject = objects[Math.floor(Math.random() * objects.length)];
        const endObject = objects[Math.floor(Math.random() * objects.length)];

        if (startObject === endObject) continue;

        const points = [];
        points.push(startObject.position.clone());
        points.push(endObject.position.clone());
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, wireMaterial);
        line.userData.startObject = startObject;
        line.userData.endObject = endObject;
        wires.push(line);
        wiresGroup.add(line);
    }

    const sparkGeometry = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkOpacities = new Float32Array(sparkCount);
    const sparkSizes = new Float32Array(sparkCount);

    for (let i = 0; i < sparkCount; i++) {
        sparkPositions[i * 3] = (Math.random() - 0.5) * 30;
        sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        sparkOpacities[i] = 0;
        sparkSizes[i] = Math.random() * 0.3 + 0.1;
    }
    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeometry.setAttribute('opacity', new THREE.BufferAttribute(sparkOpacities, 1));
    sparkGeometry.setAttribute('size', new THREE.BufferAttribute(sparkSizes, 1));
    sparksGroup.add(new THREE.Points(sparkGeometry, sparkMaterial));

    camera.position.z = 10;

    animate3D();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize3D, false);
}

function animate3D() {
    requestAnimationFrame(animate3D);

    objects.forEach(obj => {
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;

        obj.position.x += obj.userData.floatSpeed.x;
        obj.position.y += obj.userData.floatSpeed.y;
        obj.position.z += obj.userData.floatSpeed.z;

        if (Math.abs(obj.position.x) > 15) obj.userData.floatSpeed.x *= -1;
        if (Math.abs(obj.position.y) > 15) obj.userData.floatSpeed.y *= -1;
        if (Math.abs(obj.position.z) > 15) obj.userData.floatSpeed.z *= -1;
    });

    wires.forEach(line => {
        if (line.userData.startObject && line.userData.endObject) {
            line.geometry.attributes.position.array[0] = line.userData.startObject.position.x;
            line.geometry.attributes.position.array[1] = line.userData.startObject.position.y;
            line.geometry.attributes.position.array[2] = line.userData.startObject.position.z;
            line.geometry.attributes.position.array[3] = line.userData.endObject.position.x;
            line.geometry.attributes.position.array[4] = line.userData.endObject.position.y;
            line.geometry.attributes.position.array[5] = line.userData.endObject.position.z;
            line.geometry.attributes.position.needsUpdate = true;
        }
    });

    const sparkPositions = sparksGroup.children[0].geometry.attributes.position.array;
    const sparkOpacities = sparksGroup.children[0].geometry.attributes.opacity.array;

    for (let i = 0; i < sparkCount; i++) {
        if (Math.random() < 0.02) {
            sparkPositions[i * 3] = (Math.random() - 0.5) * 30;
            sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
            sparkOpacities[i] = 1;
        } else {
            sparkOpacities[i] *= 0.9;
        }
    }
    sparksGroup.children[0].geometry.attributes.opacity.needsUpdate = true;
    sparksGroup.children[0].geometry.attributes.position.needsUpdate = true;


    camera.position.x += (mouseX * 0.01 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.01 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onWindowResize3D() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}
 
