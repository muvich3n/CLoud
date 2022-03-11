import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from 'gsap'

/**
 * Loaders
 */
// retrieve the bar from the DOM
const loadingBarElement = document.querySelector('.loading-bar')
const startButtonElement = document.querySelector('.startButton')
const indicatorElement = document.querySelector('.indicator')
const exploreButtonElement = document.querySelector('.explore-button')
const spaceshipElement = document.getElementById("spaceship")
const controlElement = document.getElementById("control") 
const task1Element = document.getElementById("task1") 
const cloudElement = document.querySelector('.cloud')
const cloudIcon = document.getElementById('cloud')
const overlayElement = document.querySelector('.overlay')
const nextElement = document.querySelector('.next-button')
const backElement = document.querySelector('.back-button')
const task1Img1Element = document.getElementById("task1_img1")
const task1Img2Element = document.getElementById("task1_img2")
const task1Img3Element = document.getElementById("task1_img3")

const taskWindowElement = document.querySelector('.task-window')
taskWindowElement.classList.add('hidden')
taskWindowElement.classList.add('visuallyhidden')

const taskButtonElement = document.querySelector('.task-button')

const task2Element = document.getElementById("task2") 
const task22Element = document.getElementById("task2-2") 
const task2buttonElement = document.getElementById("task-button-text") 

const task2Img1Element = document.getElementById("task2_img1")
const task2Img2Element = document.getElementById("task2_img2")
const task2Img3Element = document.getElementById("task2_img3")

const upgradeButtonElement = document.querySelector('.upgrade-button')
const upgradeTextElement = document.getElementById("upgrade-text")

const point0Element = document.getElementById("point0")
const point1Element = document.getElementById("point1")

const videoElement = document.querySelector('.video-item')
const video = document.getElementById("video")


var task1ImgNo = 1
var task2No = 1
var playSLB = 0
var playBackup = 0

function hideVideo() {
    videoElement.style.opacity = "0"
    videoElement.addEventListener('transitionend', function(e){
        videoElement.style.display = "none"
    }, {
        capture: false,
        once: true,
        passive: false
    })
}

function start() {
    // console.log('started!');
    videoElement.style.display = ""
    videoElement.style.opacity = "1"
    spaceshipElement.style.display = ""
    controlElement.style.display = ""
    exploreButtonElement.style.display = ""
    task1Element.style.display = ""

    setTimeout(function(){
        spaceshipElement.style.opacity = "1"
        controlElement.style.opacity = "1"
        exploreButtonElement.style.opacity = "1"
        task1Element.style.opacity = "1"
    },20)

    video.addEventListener("ended", hideVideo)
    exploreButtonElement.addEventListener("click", startTask1)
    startButtonElement.style.display = "none"
    indicatorElement.style.display = "none"
    cloudElement.style.display = "none"
    // Animate overlay
    gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 0 })
    // Update loadingBarElement
    //loadingBarElement.classList.add('ended')
    loadingBarElement.style.display = "none"
    // Remove the rewrite from js or the css won't working
    //loadingBarElement.style.transform = ''
}

function startTask1() {
    overlayElement.style.display = "flex"
    setTimeout(function(){
        overlayElement.style.opacity = "1"
    },20)
    nextElement.addEventListener("click", next)
    backElement.addEventListener("click", back)
}

function setCamera ( name ) {
    if (name === defaultCamera) {
      controls.enabled = true
      scene.activeCamera = defaultCamera
    } else {
      controls.enabled = false
      scene.content.traverse((node) => {
        if (node.isCamera && node.name === name) {
          scene.activeCamera = node
        }
      })
    }
  }

function startTask2() {

    if (task2No == 1){

    defaultCamera.position.x = -4
    defaultCamera.position.y = 1.386
    defaultCamera.position.z = 13.316
    controls.enabled = false
    backElement.removeEventListener("click",back)
    overlayElement.style.opacity = "0"
    setTimeout(function(){
        task22Element.innerHTML = "数据上云后，应用团队也将进行相应升级<br>点击下方按钮进入团队升级界面"
        task22Element.style.marginTop = "-100px"
        task22Element.style.fontSize = "24px"
        task2Element.style.display = "none"
        task2buttonElement.innerHTML = "升级"
        overlayElement.style.opacity = "1"
    },5000)
    task2No = task2No + 1
    }

    else if (task2No ==2){
        taskWindowElement.classList.add('hidden')
        taskWindowElement.classList.add('visuallyhidden')
        task2Img1Element.style.display = ""
        upgradeButtonElement.style.display = ""
        setTimeout(function(){
            task2Img1Element.style.opacity = "1"
            upgradeButtonElement.style.opacity = "1"
        },20)
        upgradeButtonElement.addEventListener("click", startTask2)
        task2No = task2No + 1
    }
    
    else if (task2No ==3){
        task2Img2Element.style.display = ""
        upgradeButtonElement.removeEventListener("click", startTask2)
        setTimeout(function(){
            task2Img1Element.style.opacity = "0"
            task2Img2Element.style.opacity = "1"
        },20)
        task2Img3Element.style.display = ""
        setTimeout(function(){
            task2Img2Element.style.opacity = "0"
            task2Img3Element.style.opacity = "1"
            upgradeTextElement.innerHTML = "升级完成"
        },2000)
        task2Img3Element.addEventListener('transitionend', function(e){
            upgradeButtonElement.addEventListener("click", startTask2)

        }, {
            capture: false,
            once: true,
            passive: false
        })

        
        task2No = task2No + 1   
    }

    else if (task2No == 4){
        upgradeButtonElement.style.opacity = "0"
        upgradeButtonElement.addEventListener('transitionend', function(e){
            task2Img2Element.style.display = "none"
            upgradeButtonElement.style.display = "none"
        }, {
            capture: false,
            once: true,
            passive: false
        })
        task2Element.innerHTML = "<_任务三：了解弹性伸缩_>"
        task22Element.innerHTML = "开始后点击界面中的按钮了解弹性伸缩"
        task22Element.style.marginTop = "-40px"
        task22Element.style.fontSize = "20px"
        task2buttonElement.innerHTML = "开始"
        task2Element.style.display = ""
        task2Img2Element.style.display = "none"
        taskWindowElement.classList.remove('hidden')
        setTimeout(function () {
        task2Img3Element.style.opacity = "0"
        taskWindowElement.classList.remove('visuallyhidden')
        },20)
        task2No = task2No + 1
    }

    else if (task2No == 5){
        taskWindowElement.style.opacity = "0"
        overlayElement.style.opacity = "0"
        taskWindowElement.addEventListener('transitionend', function(e){
            taskWindowElement.style.display = "none"
            overlayElement.style.display = "none"
        }, {
            capture: false,
            once: true,
            passive: false
        })
        task2No = task2No + 1
        point0Element.addEventListener("click", setAnimation)
    }
    else if (task2No == 6){
        overlayElement.style.opacity = "0"
        overlayElement.addEventListener('transitionend', function(e){
            overlayElement.style.display = "none"
        }, {
            capture: false,
            once: true,
            passive: false
        })
        point1Element.style.display = "flex"

        point1Element.addEventListener("click", setAnimation2)

        controls.enabled = true


    }
}

function setAnimation() {
        uploadModel.visible = false
        slbModel.visible = true
        point1Element.style.display = "none"
        playSLB = 1
        task2Element.innerHTML = "<_任务四：了解容灾备份_>"
        task22Element.innerHTML = "开始后点击界面中的按钮来触发自然灾害模拟事件"
        overlayElement.style.display = "flex"
        taskWindowElement.style.display = ""
        point0Element.style.opacity = "0"
        point0Element.addEventListener('transitionend', function(e){
            point0Element.style.display = "none"
            setTimeout(function(){
                overlayElement.style.opacity = "1"
                taskWindowElement.style.opacity = "1"
                uploadModel.visible = true
                scene.remove(slbModel)
            },4000)
        }, {
            capture: false,
            once: true,
            passive: false
        })
}

function setAnimation2() {
    uploadModel.visible = false
    backupModel.visible = true
    playBackup = 1
    point1Element.style.opacity = "0"
    task2Element.innerHTML = "<_任务完成_>"
    task2buttonElement.innerHTML = "自由探索"
    task22Element.innerHTML = "点击下方按钮开始进行云世界自由探索"
    overlayElement.style.display = "flex"
    
    point1Element.addEventListener('transitionend', function(e){
        point1Element.style.display = "none"
        setTimeout(function(){
            overlayElement.style.opacity = "1"
            taskWindowElement.style.opacity = "1"
        },4000)
    }, {
        capture: false,
        once: true,
        passive: false
    })

    
}

function next() {
    if (task1ImgNo == 1){
        console.log("1-2")
        task1Img1Element.style.display = "none"
        task1ImgNo = task1ImgNo + 1
        task1Img2Element.style.display = ""
    }
    else if (task1ImgNo == 2){
        console.log("2-3")
        task1Img2Element.style.display = "none"
        task1ImgNo = task1ImgNo + 1
        task1Img3Element.style.display = ""

    }
    else if (task1ImgNo == 3){
        console.log("3-4")
        task1Img3Element.style.display = "none"
        task1ImgNo = task1ImgNo + 1
        nextElement.style.display = "none"
        spaceshipElement.style.opacity = "0"
        controlElement.style.opacity = "0"
        task1Element.style.opacity = "0"
        exploreButtonElement.style.opacity = "0"
        spaceshipElement.addEventListener('transitionend', function(e){
            spaceshipElement.style.display = "none"
            controlElement.style.display = "none"
            task1Element.style.display = "none"
            exploreButtonElement.style.display = "none"
        }, {
            capture: false,
            once: true,
            passive: false
        })
        taskWindowElement.classList.remove('hidden')
        setTimeout(function () {
        taskWindowElement.classList.remove('visuallyhidden')
        },20)
        taskButtonElement.addEventListener("click", startTask2)

        backupModel.visible = false
        slbModel.visible = false
    }

}


function back() {
    if (task1ImgNo == 1){
        overlayElement.style.display = "none"
        overlayElement.style.opacity = "0"
    }
    else if (task1ImgNo == 2){
        console.log("2-1")
        task1Img1Element.style.display = ""
        task1Img2Element.style.display = "none"
        task1ImgNo = task1ImgNo - 1
    }
    else if (task1ImgNo ==3){
        console.log("3-2")
        task1Img2Element.style.display = ""
        task1Img3Element.style.display = "none"
        task1ImgNo = task1ImgNo - 1
    }
    else if (task1ImgNo == 4){
        console.log("4-3")
        task1ImgNo = task1ImgNo - 1
        nextElement.style.display = ""
        task1Img3Element.style.display = ""
        taskWindowElement.classList.add('hidden')
        taskWindowElement.classList.add('visuallyhidden')
    }
}



let sceneReady = false
const loadingManager = new THREE.LoadingManager(
    // Loaded Callback
    () => {
        // Wait a little then call the function
        window.setTimeout(() => {
            startButtonElement.classList.add('ended')
            startButtonElement.innerHTML = "进入云世界"
            startButtonElement.addEventListener("click", start)
            cloudIcon.style.fill = "#ffffff"
            // Adding things to the scene needs a few milliseconds which will cause freeze
            // Need to wait 0.5s to finish the css transform animation
        }, 500)

        window.setTimeout(() => {
            sceneReady = true
            
        }, 2000)
    },

    // Progress Callback
    (itemUrl, itemsLoaded, itemsTotal) => {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        // back quote
        indicatorElement.innerHTML = (progressRatio * 100).toFixed(0) + '%'
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)

/**
 * Base
 */
// Debug
const debugObject = {}
// const gui = new dat.GUI({
//     width: 400
// })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Black Overlay On Screen
 */

// use 2 for width because we need the coordinates from -1 to 1
const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,

    // enable alpha animation
    transparent: true,
    uniforms:
    {
        // to control the alpha animation
        uAlpha: { value: 1 }
    },
    vertexShader: `
         void main()
         {
             gl_Position = vec4(position, 1.0);
         }
     `,
    fragmentShader: `
         uniform float uAlpha;
 
         void main()
         {
             gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
         }
     `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader(loadingManager)
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
scene.traverse((child) =>
{
if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
{
    // child.material.envMap = environmentMap
    child.material.envMapIntensity = debugObject.envMapIntensity
    child.material.needsUpdate = true
    child.castShadow = true
    child.receiveShadow = true
}
})
}

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
'/textures/environmentMaps/7/px.png',
'/textures/environmentMaps/7/nx.png',
'/textures/environmentMaps/7/py.png',
'/textures/environmentMaps/7/ny.png',
'/textures/environmentMaps/7/pz.png',
'/textures/environmentMaps/7/nz.png'
])
environmentMap.encoding = THREE.sRGBEncoding
scene.background = environmentMap
scene.environment = environmentMap
   

// add mixer
let mixer = null
let mixer2= null
let mixer3  = null




gltfLoader.load(
    '/Planet/planet_noAnimation.gltf',
    (gltf) => {
        gltf.scene.scale.set(0.005,0.005,0.005)
        scene.add(gltf.scene)
        console.log(gltf)
        
        // mixer = new THREE.AnimationMixer(gltf.scene)
        // const action = mixer.clipAction(gltf.animations[0])

    }
)

var backupModel = null
var slbModel = null
var uploadModel = null

gltfLoader.load(
    '/Planet/upload.gltf',
    (gltf) => {
        gltf.scene.scale.set(0.005,0.005,0.005)
        scene.add(gltf.scene)
        console.log(gltf)
        uploadModel = gltf.scene
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
    }
)

gltfLoader.load(
    '/Planet/SLB.gltf',
    (gltf) => {
        gltf.scene.scale.set(0.005,0.005,0.005)
        scene.add(gltf.scene)
        console.log(gltf)
        slbModel = gltf.scene
        mixer2 = new THREE.AnimationMixer(gltf.scene)
        const action = mixer2.clipAction(gltf.animations[0])
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce)
        action.play()
    }
)

gltfLoader.load(
    '/Planet/Backup.gltf',
    (gltf) => {
        gltf.scene.scale.set(0.005,0.005,0.005)
        scene.add(gltf.scene)
        console.log(gltf)
        backupModel = gltf.scene
        mixer3 = new THREE.AnimationMixer(gltf.scene)
        const action = mixer3.clipAction(gltf.animations[0])
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce)
        action.play()
    }
)







// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 0)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    defaultCamera.aspect = sizes.width / sizes.height
    defaultCamera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update fireflies
    // firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
})

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
let currentIntersect = null

const points = [
    {
        position: new THREE.Vector3(-0.65, 0.85,  9.9),
        element: document.querySelector('.point-0')
    },
    {
        position: new THREE.Vector3(-0.5, 1.7, 5.5),
        element: document.querySelector('.point-1')
    }
]

/**
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1

})


window.addEventListener('click', () => {
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        console.log(intersects)
        var clickedName = intersects[0].object.name;
        // console.log('You clicked: ' + clickedName);
        switch (intersects[0].object.name) {
            case '地面_1_3':
                break;

            default:
                break;

        }
    }
})

/**
 * Camera
 */
// Base camera
const defaultCamera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 2000)
defaultCamera.position.x = -35
defaultCamera.position.y = 18
defaultCamera.position.z = -17
scene.add(defaultCamera)


// Controls
const controls = new OrbitControls(defaultCamera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

debugObject.clearColor = '#201919'
renderer.setClearColor(debugObject.clearColor)
// gui
//     .addColor(debugObject, 'clearColor')
//     .onChange(() => {
//         renderer.setClearColor(debugObject.clearColor)
//     })

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    // Model animation
    if (mixer) {
            mixer.update(deltaTime)
    }

    if (mixer2) {
        if (playSLB == 1) {
            mixer2.update(deltaTime)
        }    
    }

    if (mixer3) {
        if (playBackup == 1) {
            mixer3.update(deltaTime)
        }
    }



    // Update materials
    // portalLightMaterial.uniforms.uTime.value = elapsedTime
    // firefliesMaterial.uniforms.uTime.value = elapsedTime

    // Cast a ray from the mouse and handle events
    raycaster.setFromCamera(mouse, defaultCamera)


    // Update controls
    controls.update()

    // Update points only when the scene is ready
    if(sceneReady)
    {
        if (task2No == 6)
        // Go through each point
        for(const point of points)
        {
            // Get 2D screen position
            const screenPosition = point.position.clone()
            screenPosition.project(defaultCamera)
    
            // Set the raycaster
            raycaster.setFromCamera(screenPosition, defaultCamera)
            const intersects = raycaster.intersectObjects(scene.children, true)
    
            // No intersect found
            if(intersects.length === 0)
            {
                // Show
                point.element.classList.add('visible')
            }

            // Intersect found
            else
            {
                // Get the distance of the intersection and the distance of the point
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(defaultCamera.position)
    
                // Intersection is close than the point
                if(intersectionDistance < pointDistance)
                {
                    // Hide
                    point.element.classList.remove('visible')
                }
                // Intersection is further than the point
                else
                {
                    // Show
                    point.element.classList.add('visible')
                }
            }
    
            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }

    // Render
    renderer.render(scene, defaultCamera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()