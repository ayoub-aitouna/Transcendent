
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'; // Import the FBXLoader
let scene:any, camera:any, renderer:any, controls:any;
let computer:any = null;
let ballModel:any = null;
let player_model:any = null;
let bg_scene =null;
let tableModel = null;
let tableWidth = 0; // Width of the table, to be determined dynamically
let z_velocity = 0.06;
let x_velocity = 0.06;
let moveLeftPlayer = false;
let moveRightPlayer = false;
let moveLeftComputer = false;
let moveRightComputer = false;

function init() {
    // Create a scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue color
    
    // Create a camera, which determines what we'll see when we render the scene
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer and add it to the DOM
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    // Add light for player
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);


    // Load the ball model
    const loader_scene = new GLTFLoader();
    loader_scene.load('/img/scene_bg.glb', (glb) => {
        bg_scene = glb.scene;
        scene.add(bg_scene);
        bg_scene.position.set(0, 0, 0);
        bg_scene.scale.set(0.4, 0.4, 0.4);
    });

    // // Load the GLTF models
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/img/sci_table/scene.gltf', (gltf) => {
        tableModel = gltf.scene;
        tableModel.position.set(0, 1, 0);
        tableModel.scale.set(1.1, 1.1, 1.1); // Adjust the scale if necessary
        scene.add(tableModel);

        // Calculate the bounding box of the table model
        const box = new THREE.Box3().setFromObject(tableModel);
        const size = new THREE.Vector3();
        box.getSize(size);
        tableWidth = size.x;
    }, undefined, (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    });

    const loader_cpm = new GLTFLoader();
    loader_cpm.load('/img/table_tennis_table/paddle.glb', (glb) => { // computer player
        computer = glb.scene;
        scene.add(computer);
        computer.position.set(0, 4.8, -5);
        computer.scale.set(0.3, 0.3, 0.3); // Adjust the scale if necessary
    }, undefined, (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    });

    // Load the ball model
    const loader = new GLTFLoader();
    loader.load('/img/table_tennis_table/ball.glb', (glb) => {
        ballModel = glb.scene;
        scene.add(ballModel);
        ballModel.position.set(0, 5.5, 0);
        ballModel.scale.set(1.5, 1.5, 1.5);
    });

    // Load the player paddle model
    const loader2 = new GLTFLoader();
    loader2.load('/img/table_tennis_table/paddle.glb', (glb) => {
        player_model = glb.scene;
        scene.add(player_model);
        player_model.position.set(0, 4.8, 5);
        player_model.scale.set(0.3, 0.3, 0.3);
    });

    // Adding bounding boxes to our cubes
    const playerBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    const ballBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    const computerBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

    function checkCollision() {
        if (player_model && computer && ballModel) {
            // Update bounding boxes with the current position of the cubes
            playerBB.setFromObject(player_model);
            ballBB.setFromObject(ballModel);
            computerBB.setFromObject(computer);

            // Check collision with player paddle
            if (playerBB.intersectsBox(ballBB)) {
                console.log('Player hit');
                z_velocity = -Math.abs(z_velocity); // Ensure z_velocity is negative to move the ball towards the computer
                // Adjust the ball's x_velocity based on the paddle's movement
                x_velocity = (ballModel.position.x - player_model.position.x) * 0.05;
            } 
            // Check collision with computer paddle
            else if (computerBB.intersectsBox(ballBB))
            {
                console.log('Computer hit');
                z_velocity = Math.abs(z_velocity); // Ensure z_velocity is positive to move the ball towards the player
                // Adjust the ball's x_velocity based on the paddle's movement
                x_velocity = (ballModel.position.x - computer.position.x) * 0.05;
            }
            else if (ballModel.position.z > player_model.position.z)
            {
                resetBallPosition();
            }
            else if (ballModel.position.z < computer.position.z)
            {
                resetBallPosition();
            }
        }
    }
    function resetBallPosition()
    {
        ballModel.position.set(0, 5.5, 0); // Reset the ball to the center of the table
        z_velocity = 0.05; // Reset the velocities if needed
        x_velocity = 0.05;
    }

    // // Create a function to animate our scene
    function animate() {
        requestAnimationFrame(animate);
        if (ballModel)
        {
            ballModel.translateZ(z_velocity );
            ballModel.translateX(x_velocity);
 
            // Constrain the ball's x position to the table width
            if (tableWidth > 0) { // Ensure tableWidth is initialized
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
    }

    // Run the animation function for the first time to kick things off
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // Handle keydown events
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
            case 'a': // 'a' key for moving the computer paddle left
                moveLeftComputer = true;
                controls.enabled = false;
                break;
            case 'd': // 'd' key for moving the computer paddle right
                moveRightComputer = true;
                controls.enabled = false;
                break;
        }
    });

    // Handle keyup events
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
            case 'a': // 'a' key for moving the computer paddle left
                moveLeftComputer = false;
                controls.enabled = true;
                break;
            case 'd': // 'd' key for moving the computer paddle right
                moveRightComputer = false;
                controls.enabled = true;
                break;
        }
    });
}

init();


const App: React.FC = () => {
  return (
    <div id="game">
      {

      }
    </div>
  );
};

export default App;