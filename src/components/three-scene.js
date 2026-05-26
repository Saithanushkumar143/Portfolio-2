import * as THREE from 'three';

export function initThreeScene() {
  const canvas = document.querySelector('#three-canvas');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 6;

  // WebGL Renderer with performance enhancements
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Colors
  const cyanColor = 0x00f2fe;
  const purpleColor = 0x7f00ff;
  const emeraldColor = 0x05ffc5;

  // Master Group that scrolls
  const scrollGroup = new THREE.Group();
  scene.add(scrollGroup);

  // Individual object groups
  const objGroup1 = new THREE.Group(); // Hero Object (Icosahedron Network)
  const objGroup2 = new THREE.Group(); // Projects Object (REPLACED WITH: Planetary Neural Orbit Core)
  const objGroup3 = new THREE.Group(); // Skills/Timeline Object (Interactive Morphing Cube)
  const objGroup4 = new THREE.Group(); // Contact Object (Torus Ring)

  scrollGroup.add(objGroup1);
  scrollGroup.add(objGroup2);
  scrollGroup.add(objGroup3);
  scrollGroup.add(objGroup4);

  // Position objects vertically
  const ySpacing = 6.8;
  objGroup1.position.y = 0;
  objGroup2.position.y = -ySpacing;
  objGroup3.position.y = -ySpacing * 2;
  objGroup4.position.y = -ySpacing * 3;

  // --- OBJECT 1: HERO NEURAL NODE (Icosahedron) ---
  const geomCore = new THREE.IcosahedronGeometry(2.1, 2);
  const matWire1 = new THREE.MeshBasicMaterial({
    color: cyanColor,
    wireframe: true,
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending
  });
  const meshCore = new THREE.Mesh(geomCore, matWire1);
  objGroup1.add(meshCore);

  const pointsCore = new THREE.Points(
    geomCore,
    new THREE.PointsMaterial({
      color: emeraldColor,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    })
  );
  objGroup1.add(pointsCore);

  const geomInner = new THREE.IcosahedronGeometry(1.1, 1);
  const matInner = new THREE.MeshBasicMaterial({
    color: purpleColor,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending
  });
  const meshInner = new THREE.Mesh(geomInner, matInner);
  objGroup1.add(meshInner);


  // --- OBJECT 2: PLANETARY NEURAL ORBIT (REPLACEMENT FOR 2nd ELEMENT) ---
  // Represents decentralized IoT nodes and smart automated systems orbiting a central AI core
  const geomOrbitCore = new THREE.IcosahedronGeometry(0.9, 1);
  const matOrbitCore = new THREE.MeshBasicMaterial({
    color: emeraldColor,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
  });
  const meshOrbitCore = new THREE.Mesh(geomOrbitCore, matOrbitCore);
  objGroup2.add(meshOrbitCore);

  // Ring 1 (Horizontal Orbit)
  const geomRing1 = new THREE.TorusGeometry(1.6, 0.03, 8, 64);
  const matRing1 = new THREE.MeshBasicMaterial({
    color: cyanColor,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending
  });
  const meshRing1 = new THREE.Mesh(geomRing1, matRing1);
  meshRing1.rotation.x = Math.PI / 2;
  objGroup2.add(meshRing1);

  // Ring 2 (Tilted Orbit)
  const meshRing2 = meshRing1.clone();
  meshRing2.rotation.x = Math.PI / 4;
  meshRing2.rotation.y = Math.PI / 4;
  meshRing2.material = new THREE.MeshBasicMaterial({
    color: purpleColor,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending
  });
  objGroup2.add(meshRing2);

  // Ring 3 (Vertical Orbit)
  const meshRing3 = meshRing1.clone();
  meshRing3.rotation.x = 0;
  meshRing3.rotation.y = Math.PI / 2;
  meshRing3.material = new THREE.MeshBasicMaterial({
    color: emeraldColor,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending
  });
  objGroup2.add(meshRing3);

  // Floating Orbit Node Satellites
  const orbitNodesCount = 4;
  const orbitNodes = [];
  for (let i = 0; i < orbitNodesCount; i++) {
    const nodeGeom = new THREE.IcosahedronGeometry(0.12, 0);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
    objGroup2.add(nodeMesh);
    orbitNodes.push(nodeMesh);
  }


  // --- OBJECT 3: INTERACTIVE CYBER CUBE (Timeline / Experience focal) ---
  const geomBox = new THREE.BoxGeometry(2.0, 2.0, 2.0, 3, 3, 3);
  const matBox = new THREE.MeshBasicMaterial({
    color: purpleColor,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending
  });
  const meshBox = new THREE.Mesh(geomBox, matBox);
  objGroup3.add(meshBox);

  const pointsBox = new THREE.Points(
    geomBox,
    new THREE.PointsMaterial({
      color: emeraldColor,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    })
  );
  objGroup3.add(pointsBox);


  // --- OBJECT 4: CONTACT GLOW PATH (Torus Ring) ---
  const geomTorus = new THREE.TorusGeometry(1.5, 0.4, 16, 60);
  const matTorus = new THREE.MeshBasicMaterial({
    color: cyanColor,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending
  });
  const meshTorus = new THREE.Mesh(geomTorus, matTorus);
  objGroup4.add(meshTorus);

  const pointsTorus = new THREE.Points(
    geomTorus,
    new THREE.PointsMaterial({
      color: purpleColor,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    })
  );
  objGroup4.add(pointsTorus);


  // --- BACKGROUND PARTICLES DATAFIELD (IoT Flows) ---
  const particleCount = 200;
  const geomStars = new THREE.BufferGeometry();
  const starPositions = new Float32Array(particleCount * 3);
  const starSpeeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 15;
    starPositions[i + 1] = (Math.random() - 0.5) * ySpacing * 4;
    starPositions[i + 2] = (Math.random() - 0.7) * 8;

    starSpeeds[i / 3] = 0.05 + Math.random() * 0.1;
  }

  geomStars.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  
  const matStars = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.03,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
  });

  const starField = new THREE.Points(geomStars, matStars);
  scene.add(starField);

  // Interactive mouse variables
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  // Scroll variables
  let scrollY = window.scrollY;
  let targetScrollY = window.scrollY;

  // Dynamic multipliers linked to hover states
  let timelineHoverScale = 1.0;
  let timelineHoverRotationSpeed = 1.0;

  // Mousemove Listener
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Scroll Listener
  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  });

  // Resize Listener
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const clock = new THREE.Clock();

  // Animation Frame Loop
  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Constant slow rotations for Object 1 (Hero Node)
    meshCore.rotation.y = elapsedTime * 0.05;
    meshCore.rotation.x = elapsedTime * 0.03;
    pointsCore.rotation.y = elapsedTime * 0.05;
    meshInner.rotation.z = -elapsedTime * 0.08;

    // Orbiting animations for Object 2 (Planetary Neural Orbits)
    meshOrbitCore.rotation.x = -elapsedTime * 0.06;
    meshOrbitCore.rotation.y = -elapsedTime * 0.04;
    
    meshRing1.rotation.z = elapsedTime * 0.15;
    meshRing2.rotation.z = -elapsedTime * 0.2;
    meshRing3.rotation.z = elapsedTime * 0.1;

    // Orbit satellite node mathematical distribution
    orbitNodes.forEach((node, idx) => {
      const angleOffset = (idx / orbitNodesCount) * Math.PI * 2;
      const speedFactor = elapsedTime * 0.4 + angleOffset;
      const radius = 1.6;

      // Map nodes to circular paths on different axes
      if (idx === 0) {
        node.position.set(Math.cos(speedFactor) * radius, 0, Math.sin(speedFactor) * radius);
      } else if (idx === 1) {
        node.position.set(0, Math.cos(speedFactor) * radius, Math.sin(speedFactor) * radius);
      } else {
        node.position.set(Math.cos(speedFactor) * radius, Math.sin(speedFactor) * radius, 0);
      }
      node.rotation.y = speedFactor * 2;
    });

    // Check if user is hovering over any timeline cards or experience items
    const hasTimelineHover = document.querySelector('.timeline-card:hover');
    if (hasTimelineHover) {
      // Smoothly expand scale and accelerate spin in 3D
      timelineHoverScale += (1.35 - timelineHoverScale) * 0.08;
      timelineHoverRotationSpeed += (4.0 - timelineHoverRotationSpeed) * 0.08;
      
      // Shift cube color dynamically to emerald glow during active hover
      meshBox.material.color.setHex(emeraldColor);
    } else {
      // Smoothly settle back to idle states
      timelineHoverScale += (1.0 - timelineHoverScale) * 0.08;
      timelineHoverRotationSpeed += (1.0 - timelineHoverRotationSpeed) * 0.08;
      
      meshBox.material.color.setHex(purpleColor);
    }

    // Apply interactive scales & rotations to Object 3 (Skills Cyber Cube)
    objGroup3.scale.set(timelineHoverScale, timelineHoverScale, timelineHoverScale);

    meshBox.rotation.y = -elapsedTime * 0.05 * timelineHoverRotationSpeed;
    meshBox.rotation.x = elapsedTime * 0.04 * timelineHoverRotationSpeed;
    pointsBox.rotation.y = -elapsedTime * 0.05 * timelineHoverRotationSpeed;

    // Constant slow rotations for Object 4 (Contact Torus Ring)
    meshTorus.rotation.x = elapsedTime * 0.06;
    meshTorus.rotation.y = elapsedTime * 0.03;
    pointsTorus.rotation.x = elapsedTime * 0.06;

    // Gently drift background particles
    const positions = geomStars.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const speed = starSpeeds[i] * 0.003;
      positions[idx + 1] -= speed;
      if (positions[idx + 1] < -ySpacing * 3.8) {
        positions[idx + 1] = ySpacing * 0.8;
      }
    }
    geomStars.attributes.position.needsUpdate = true;

    // Damping cursor tracking
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Tilt all groups slightly in unison based on cursor coordinates
    objGroup1.rotation.y = targetX * 0.5;
    objGroup1.rotation.x = -targetY * 0.5;

    objGroup2.rotation.y = -targetX * 0.4;
    objGroup2.rotation.x = targetY * 0.4;

    objGroup3.rotation.y = targetX * 0.5;
    objGroup3.rotation.z = targetY * 0.3;

    objGroup4.rotation.y = -targetX * 0.5;
    objGroup4.rotation.x = -targetY * 0.5;

    // Smooth scroll interpolation
    scrollY += (targetScrollY - scrollY) * 0.06;

    // Translate scrollGroup vertically matching viewport scroll depth
    scrollGroup.position.y = scrollY * 0.0038;

    renderer.render(scene, camera);
  }

  animate();
}
