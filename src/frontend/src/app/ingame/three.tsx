// components/ThreeScene.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import AuthWebSocket from "@/lib/AuthWebSocket";
import { useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie';
import { parseCookies } from 'nookies';
import { WS_BASE_URL } from '@/constant/api';
// import { uid } from 'chart.js/dist/helpers/helpers.core';

let scene:any, camera:any, renderer:any, controls:any;
let computer:any = null;
let ballModel:any = null;
let player_model:any = null;
let score_board:any = null;
let bg_scene :any=null;
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
let textMesh:any = null;
let textMesh_computer = null;
let textMesh_player:any = null;
let textMesh_score_player = null;
let textMesh_score_computer = null;
let socket:any  = null;
// game uid

//serach params = 
// let token = new AuthWebSocket(`${WS_BASE_URL}/game/tournament/${tournament.uuid}/`);
//

const ThreeScene = () => {
  const mountRef = useRef(null);
  const params = useSearchParams();
  const uuid = params.get('uuid')
  console.log("uuid from search prams is ----------------->: ", uuid) 

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
        camera.position.y = 5;

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
        loader_scene.load('game/scene_bg.glb', (glb) => {
          if (!bg_scene) {
            bg_scene = glb.scene;
            scene.add(bg_scene);
            bg_scene.position.set(0, 0, 0);
            bg_scene.scale.set(0.4, 0.4, 0.4);
          }
        });

        const loader_scene1 = new GLTFLoader();
        loader_scene1.load('game/low_table.glb', (glb) => {
          tableModel = glb.scene;
          scene.add(tableModel);
          tableModel.position.set(0, 3.8, 0);
          tableModel.scale.set(1.2, 1.2, 1.2);
          tableModel.rotation.y = 1.6;
          
          const box = new THREE.Box3().setFromObject(tableModel);
          const size = new THREE.Vector3();
          box.getSize(size);
          tableWidth = size.x;
          //3.340033802727273
          //538242.01536809
          if (tableWidth > 1000) {
            console.warn("Table width seems too large. Check model dimensions.");
            tableWidth = 5.8; // Default to old table width
          }
          console.log("table witdh =>>>>    ",tableWidth);
        });
// computer player
        const loader_cpm = new GLTFLoader();
        loader_cpm.load('game/paddle_hock.glb', (glb) =>
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
    loader.load('game/ball_rca.glb', (glb) => 
    {
      if (!ballModel)
      {
        ballModel = glb.scene;
        scene.add(ballModel);
        ballModel.position.set(0.5, -0.6, -2.5);
        ballModel.scale.set(1, 1.7, 1);
      }
      });
    // Load the player paddle model
    const loader2 = new GLTFLoader();
    loader2.load('game/paddle_hock.glb', (glb) => 
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
    loader_board.load('game/score.glb', (glb) => 
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
          const textGeometry = new TextGeometry('PLAYRER 2', {
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
          textMesh_score_computer.position.set(0.2, 6.3, -4.5);
          scene.add(textMesh_score_computer);
      });
  
      // player score
      const text_loader_player = new FontLoader();
      text_loader_player.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
          const textGeometry = new TextGeometry('PLAYER 1', {
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
          textMesh_score_player.position.set(-1.3, 6.3, -4.5);
          scene.add(textMesh_score_player);
      });
    };

      // Check collisions
      const checkCollision = () => 
      {
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
          else if (ballModel.position.z > 2.4)
            {
                console.log("computer ----------------");
                computer_score++;
                resetBallPosition();
            }
            else if (ballModel.position.z < -8.5)
            {
                console.log("player ----------------");
                player_score++;
                resetBallPosition_player();
            }
        }
      };

      // update text for player
      const update_text_player=() => 
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
      const update_text = () => {
        console.log("entre this ===>");
        // if (computer_score == 0)
        // {
        //   console.log("fuccccccccccccccckkkkkkkkk");
        // }
        if (textMesh)
          {
              console.log("----------------------when is it",computer_score);
              scene.remove(textMesh);
              textMesh.geometry.dispose();
              textMesh.material.dispose();
              textMesh = null;
              // console.log("-------------------------------------------------dx");
          }
          console.log("---------------------- null ",computer_score);
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
      };

      // Reset ball position
      const resetBallPosition = () => 
      {
        ballModel.position.set(0.5, -0.6, -2.5);
        ballModel.scale.set(1, 1.7, 1);
        z_velocity = 0.05;
        x_velocity = 0.05;
        update_text();
      };

      const resetBallPosition_player = () => 
        {
          ballModel.position.set(0.5, -0.6, -2.5);
          ballModel.scale.set(1, 1.7, 1);
          z_velocity = 0.05;
          x_velocity = 0.05;
          update_text_player();
        };


        const handleWebSocketMessages = (message) => {
          if (!message.data) return;
          const data = JSON.parse(message.data);
  
          switch (data.type) {
            case 'update':
              // Game state update
              if (data.ball) {
                ballModel.position.set(data.ball.x, data.ball.y, data.ball.z);
              }
              if (data.leftPaddle) {
                player_model.position.set(data.leftPaddle.x, player_model.position.y, data.leftPaddle.z);
              }
              if (data.rightPaddle) {
                computer.position.set(data.rightPaddle.x, computer.position.y, data.rightPaddle.z);
              }
              break;
            case 'goal':
              // Update scores
              player_score = data.first_player_score;
              computer_score = data.second_player_score;
              update_text();
              resetBallPosition();
              break;
            case 'game_over':
              // Handle game over scenario
              alert("Game Over!");
              break;
            default:
              console.log(data);
              break;
          }
        };

        const setupWebSocket = () => 
        {
          //AuthWebSocket
          //searchparams

          // get a token of game
          //  i should be to get uid of game
          // const cookies = parseCookies();
          // const token = Cookies.get('access');
          // if (!token) {
          //   console.error('No access token found in cookies');
          // } else {
          //   console.log('token found:', token);
          // }
          // console.log(token,"============");

          // const game_uuid = searcb
          const lobbySocket = new AuthWebSocket(`${WS_BASE_URL}/game/${uuid}/`);          
//https://localhost/ingame?uuid=8119c1f6-cb63-49ec-8c8f-7d9e092d7eec
          lobbySocket.onerror = (error) => {
            console.error('WebSocket error: dxx', error);
          };
          lobbySocket.onclose = (event) => {
            console.log('WebSocket closed:', event.code, event.reason);
          };
          lobbySocket.onopen = (event) => {
              console.log("yaaaaaaaaaaaa hooo");
          };
          
          // const searchParams = useSearchParams();
// 
          // const search = searchParams.get(`/so games?uuid=${uid}`);

//  const socket = new WebSocket(`ws://localhost:8000/ws/game/${game_uuid}/?token=${token}`);
          lobbySocket.addEventListener('open', () => {
            console.log('WebSocket connected');
          });
  
          lobbySocket.addEventListener('message', (message) => 
          {
            console.log("=------------------=-=--==-=i have a message");
            handleWebSocketMessages(message);
          });
  
          lobbySocket.addEventListener('close', () => {
            console.log('WebSocket disconnected');
          });
          lobbySocket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
          });
        };

      // Animate the scene
      const animate = () => {
        requestAnimationFrame(animate);
        if (ballModel) 
        {
          ballModel.translateZ(z_velocity);
          ballModel.translateX(x_velocity);
          if (tableWidth > 0) 
            {
              // console.log("before ==>>",ballModel.position.x);
              if (ballModel.position.x > tableWidth / 2) {
                ballModel.position.x = tableWidth / 2;
                x_velocity = -Math.abs(x_velocity);
              }
              else if (ballModel.position.x < -tableWidth / 2) 
              {
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
      setupWebSocket();
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
        // socket.send(JSON.stringify({ type: "move", y: player_model.position.x })); // its x but i still use y
        // socket.send(JSON.stringify({ type: "move", y: playerY }));
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
        // socket.send(JSON.stringify({ type: "move", y: player_model.position.x })); // its x but i still use y
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

