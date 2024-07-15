// components/ThreeScene.js
'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let computer = null;
let ballModel = null;
let player_model = null;
let bg_scene = null;
let tableModel = null;
let tableWidth = 0;
let z_velocity = 0.06;
let x_velocity = 0.06;
let moveLeftPlayer = false;
let moveRightPlayer = false;
let moveLeftComputer = false;
let moveRightComputer = false;

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize scene, camera, and renderer
      const init = () => {
        // Create a scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87CEEB);

        // Create a camera, which determines what we'll see when we render the scene
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create a renderer and add it to the DOM
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);

        // Add light for player
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);
      };

      // Load models and set up the scene
      const loadModels = () => {
        const loader_scene = new GLTFLoader();
        loader_scene.load('/game/scene_bg.glb', (glb) => {
          if (!bg_scene) {
            bg_scene = glb.scene;
            scene.add(bg_scene);
            bg_scene.position.set(0, 0, 0);
            bg_scene.scale.set(0.4, 0.4, 0.4);
          }
        });

        const gltfLoader = new GLTFLoader();
        gltfLoader.load('/game/sci_table/scene.gltf', (gltf) => {
          if (!tableModel) {
            tableModel = gltf.scene;
            tableModel.position.set(0, 1, 0);
            tableModel.scale.set(1.1, 1.1, 1.1);
            scene.add(tableModel);

            const box = new THREE.Box3().setFromObject(tableModel);
            const size = new THREE.Vector3();
            box.getSize(size);
            tableWidth = size.x;
          }
        });

        const loader_cpm = new GLTFLoader();
        loader_cpm.load('/game/table_tennis_table/paddle.glb', (glb) => {
          if (!computer) {
            computer = glb.scene;
            scene.add(computer);
            computer.position.set(0, 4.8, -5);
            computer.scale.set(0.3, 0.3, 0.3);
          }
        });

        const loader = new GLTFLoader();
        loader.load('/game/table_tennis_table/ball.glb', (glb) => {
          if (!ballModel) {
            ballModel = glb.scene;
            scene.add(ballModel);
            ballModel.position.set(0, 5.5, 0);
            ballModel.scale.set(1.5, 1.5, 1.5);
          }
        });

        const loader2 = new GLTFLoader();
        loader2.load('/game/table_tennis_table/paddle.glb', (glb) => {
          if (!player_model) {
            player_model = glb.scene;
            scene.add(player_model);
            player_model.position.set(0, 4.8, 5);
            player_model.scale.set(0.3, 0.3, 0.3);
          }
        });
      };

      // Check collisions
      const checkCollision = () => {
        const playerBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        const ballBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        const computerBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

        if (player_model && computer && ballModel) {
          playerBB.setFromObject(player_model);
          ballBB.setFromObject(ballModel);
          computerBB.setFromObject(computer);

          if (playerBB.intersectsBox(ballBB)) {
            console.log('Player hit');
            z_velocity = -Math.abs(z_velocity);
            x_velocity = (ballModel.position.x - player_model.position.x) * 0.05;
          } else if (computerBB.intersectsBox(ballBB)) {
            console.log('Computer hit');
            z_velocity = Math.abs(z_velocity);
            x_velocity = (ballModel.position.x - computer.position.x) * 0.05;
          } else if (ballModel.position.z > player_model.position.z) {
            resetBallPosition();
          } else if (ballModel.position.z < computer.position.z) {
            resetBallPosition();
          }
        }
      };

      // Reset ball position
      const resetBallPosition = () => {
        ballModel.position.set(0, 5.5, 0);
        z_velocity = 0.05;
        x_velocity = 0.05;
      };

      // Animate the scene
      const animate = () => {
        requestAnimationFrame(animate);
        if (ballModel) {
          ballModel.translateZ(z_velocity);
          ballModel.translateX(x_velocity);

          if (tableWidth > 0) {
            if (ballModel.position.x > tableWidth / 2) {
              ballModel.position.x = tableWidth / 2;
              x_velocity = -Math.abs(x_velocity);
            } else if (ballModel.position.x < -tableWidth / 2) {
              ballModel.position.x = -tableWidth / 2;
              x_velocity = Math.abs(x_velocity);
            }
          }
          checkCollision();
        }

        if (moveLeftPlayer) {
          player_model.position.x -= 0.05;
        }
        if (moveRightPlayer) {
          player_model.position.x += 0.05;
        }

        if (moveLeftComputer) {
          computer.position.x -= 0.05;
        }
        if (moveRightComputer) {
          computer.position.x += 0.05;
        }

        controls.update();
        renderer.render(scene, camera);
      };

      init();
      loadModels();
      animate();

      // Event listeners for resizing and keyboard input
      window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });

      window.addEventListener('keydown', (event) => {
        if (!player_model || !computer) return;
        switch (event.key) {
          case 'ArrowLeft':
            moveLeftPlayer = true;
            controls.enabled = false;
            break;
          case 'ArrowRight':
            moveRightPlayer = true;
            controls.enabled = false;
            break;
          case 'a':
            moveLeftComputer = true;
            controls.enabled = false;
            break;
          case 'd':
            moveRightComputer = true;
            controls.enabled = false;
            break;
        }
      });

      window.addEventListener('keyup', (event) => {
        if (!player_model || !computer) return;
        switch (event.key) {
          case 'ArrowLeft':
            moveLeftPlayer = false;
            controls.enabled = true;
            break;
          case 'ArrowRight':
            moveRightPlayer = false;
            controls.enabled = true;
            break;
          case 'a':
            moveLeftComputer = false;
            controls.enabled = true;
            break;
          case 'd':
            moveRightComputer = false;
            controls.enabled = true;
            break;
        }
      });

      // Clean up on component unmount
      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
