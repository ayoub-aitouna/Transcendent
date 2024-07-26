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
    const loader2 = new GLTFLoader();
    loader2.load('/game/paddle_hock.glb', (glb) => 
    {
      if (!player_model)
      {
        player_model = glb.scene;
        scene.add(player_model);
        player_model.position.set(0, 0.7, 8.9);
        player_model.scale.set(1.2, 1.2, 1.2);
      }
      });
    //load the soccer board
    const loader_board = new GLTFLoader();
    loader_board.load('/game/score.glb', (glb) => 
    {
      if (!score_board)
      {
        score_board = glb.scene;
        scene.add(score_board);
        score_board.position.set(0, 5, -1);
        score_board.scale.set(0.5, 0.3, 0.3);
        // score_board.rotation.y =Math.PI / 4; // 30 degrees in radians
        score_board.rotation.y = Math.PI; // 30 degrees in radians
        // score_board.rotation.x = Math.PI / 4; // 30 degrees in radians
      }
      });

      // text loader
      const text_loader_computer = new FontLoader();
      text_loader_computer.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
          const textGeometry = new TextGeometry('Computer ', {
              font: font,
              size: 0.2,
              depth: 0.2,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelSegments: 5
          });
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
          textMesh_score_computer = new THREE.Mesh(textGeometry, textMaterial);
          textMesh_score_computer.position.set(0.4, 6.3, -4.5);
          scene.add(textMesh_score_computer);
      });


      const loader1 = new FontLoader();
      loader1.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
          const textGeometry = new TextGeometry(computer_score.toString(), {
              font: font,
              size: 0.6,
              depth: 0.2,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelSegments: 5
          });
  
          // Create a material and a mesh
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
          textMesh = new THREE.Mesh(textGeometry, textMaterial);
  
          // Position the text
          textMesh.position.set(0.7, 5.6, -4.5);
  
          // Add the text to the scene
          scene.add(textMesh);
      });
  
  
      // player score
      const text_loader_player = new FontLoader();
      text_loader_player.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
          const textGeometry = new TextGeometry('PLAYER ', {
              font: font,
              size: 0.2,
              depth: 0.2,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelSegments: 5
          });
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
          textMesh_score_player = new THREE.Mesh(textGeometry, textMaterial);
          textMesh_score_player.position.set(-1.2, 6.3, -4.5);
          scene.add(textMesh_score_player);
      });
  
      const text_load = new FontLoader();
      text_load.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
          const textGeometry = new TextGeometry(player_score.toString(), {
              font: font,
              size: 0.6,
              depth: 0.2,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelSegments: 5
          });
  
          // Create a material and a mesh
          const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
          textMesh_player = new THREE.Mesh(textGeometry, textMaterial);
  
          // Position the text
          textMesh_player.position.set(-1, 5.6, -4.5);
  
          // Add the text to the scene
          scene.add(textMesh_player);
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
          }
            else if (ballModel.position.z > 1.6)
            {
                // console.log('Player hit');
                console.log("computer ----------------");
                resetBallPosition();
                computer_score++;
            }
            else if (ballModel.position.z < -7)
            {
                console.log("player ----------------");
                resetBallPosition_player();
                player_score++;
            }
        }
      };

      // update text for player
      const update_text_player= () => 
      {
        // console.log("Updating text... =>>> ",textMesh);
        if (textMesh_player)
          {
              console.log("remove the model ......");
              scene.remove(textMesh_player);
              textMesh_player.geometry.dispose();
              textMesh_player.material.dispose();
              textMesh_player = null;
              console.log("-------------------------------------------------dx");
          }
          // Load the font and create the new text geometry
          const loader1 = new FontLoader();
          loader1.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
              const textGeometry = new TextGeometry(player_score.toString(), {
                  font: font,
                  size: 0.6,
                  depth: 0.2,
                  curveSegments: 12,
                  bevelEnabled: true,
                  bevelThickness: 0.03,
                  bevelSize: 0.02,
                  bevelSegments: 5
              });
  
              // Create a material and a new mesh
              const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
              textMesh_player = new THREE.Mesh(textGeometry, textMaterial);
  
              // Position the text
              textMesh_player.position.set(-1, 5.6, -4.5);
  
              // Add the new text to the scene
              scene.add(textMesh_player);
              console.log("add the model ......");
          });
      }

      // update text for computer
      const update_text= () => 
      {
        // console.log("Updating text... =>>> ",textMesh);
        if (textMesh)
          {
              console.log("remove the model ......");
              scene.remove(textMesh);
              textMesh.geometry.dispose();
              textMesh.material.dispose();
              textMesh = null;
              console.log("-------------------------------------------------dx");
          }
          // Load the font and create the new text geometry
          const loader1 = new FontLoader();
          loader1.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
              const textGeometry = new TextGeometry(computer_score.toString(), {
                  font: font,
                  size: 0.6,
                  depth: 0.2,
                  curveSegments: 12,
                  bevelEnabled: true,
                  bevelThickness: 0.03,
                  bevelSize: 0.02,
                  bevelSegments: 5
              });
  
              // Create a material and a new mesh
              const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
              textMesh = new THREE.Mesh(textGeometry, textMaterial);
  
              // Position the text
              textMesh.position.set(0.7, 5.6, -4.5);
  
              // Add the new text to the scene
              scene.add(textMesh);
              console.log("add the model ......");
          });
      }
      // Reset ball position
      const resetBallPosition = () => 
      {
        ballModel.position.set(0.5, 0.9, -2.5); // Reset the ball to the center of the table
        z_velocity = 0.05;
        x_velocity = 0.05;
        update_text();
      };

      const resetBallPosition_player = () => 
        {
          ballModel.position.set(0.5, 0.9, -2.5); // Reset the ball to the center of the table
          z_velocity = 0.05;
          x_velocity = 0.05;
          update_text_player();
        };

        var stats = new Stats();
        stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( stats.dom );

      // Animate the scene
      const animate = () => {
        stats.begin();
        requestAnimationFrame(animate);
        if (ballModel) {
          ballModel.translateZ(z_velocity);
          ballModel.translateX(x_velocity);

          if (tableWidth > 0) 
        {
            if (ballModel.position.x > tableWidth / 2) 
            {
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
        stats.end();
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