// components/ThreeScene.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import Stats from 'stats.js/src/Stats.js'

let scene, camera, renderer, controls;
let computer = null;
let ballModel = null;
let player_model = null;
let score_board = null;
let bg_scene =null;
let tableModel = null;
let tableWidth = 0; // Width of the table, to be determined dynamically
let z_velocity = 0.05;
let x_velocity = 0.05;
let moveLeftPlayer = false;
let moveRightPlayer = false;
let moveLeftComputer = false;
let moveRightComputer = false;
let computer_score = 0;
let player_score = 0;
let player_score_text = "player :";
let computer_score_text = "player :";
let textMesh = null;
let textMesh_computer = null;
let textMesh_player = null;
let textMesh_score_player = null;
let textMesh_score_computer = null;


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

        const loader_scene1 = new GLTFLoader();
        loader_scene1.load('/game/low_table.glb', (glb) => {
            tableModel = glb.scene;
            scene.add(tableModel);
            tableModel.position.set(0, 3.8, 0);
            tableModel.scale.set(1.2, 1.2, 1.2);
            tableModel.rotation.y = 1.6;
            const box = new THREE.Box3().setFromObject(tableModel);
            const size = new THREE.Vector3();
            box.getSize(size);
            tableWidth = size.x;
            console.log("----->>>>>>",tableWidth)
        });
// computer player
        const loader_cpm = new GLTFLoader();
        loader_cpm.load('/game/paddle_hock.glb', (glb) =>
        {
            if (!computer)
            {
            computer = glb.scene;
            scene.add(computer);
            computer.position.set(0, 0.7, -1);
            computer.scale.set(1.2, 1.2, 1.2); // Adjust the scale if necessary
            }
          }, undefined, (error) => {
            console.error('An error occurred while loading the GLTF model:', error);
        });

    // Load the ball model
    const loader = new GLTFLoader();
    loader.load('/game/ball_rca.glb', (glb) => 
    {
      if (!ballModel)
      {
        ballModel = glb.scene;
        scene.add(ballModel);
        ballModel.position.set(0.5, 0.9, -2.5);
        ballModel.scale.set(0.9, 1.2, 0.9);
      }
      });
    // Load the player paddle model
    const loader2 = new GLTFLoader