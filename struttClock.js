////////////////////////////////////////////
//   "Strutt Epicyclic Clock Model"
//   June 2021
//   Original code by David Gail Smith
//   Attribution:
////////////////////////////////////////////

let container;
let camera, scene, renderer;
let pointLight, directionalLight, ambientLight;
var object;
let controls;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
var num = 0;
let orbit = 0;
let now;
let currentSec;
let lastSec;

init();
animate();

function init() {
	// set update clocks
	now = new Date();
	currentSec = now.getSeconds();	
	lastSec = 0;

	// scene
	scene = new THREE.Scene();

	// camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 25;
	camera.position.z = 25;
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
	scene.add( camera );

	// lighting
	pointLight = getPointLight( 0.8 );
	scene.add( pointLight );
	camera.add( pointLight );
	directionalLight = getDirectionalLight( 1 );
	directionalLight.position.x = 13;
	directionalLight.position.y = 10;
	directionalLight.position.z = 10;
	directionalLight.intensity = .5;
	scene.add( directionalLight );
	ambientLight = getAmbientLight( 0.4 );
	scene.add( ambientLight );

	// models
	const loader = new THREE.OBJLoader();
	const textureLoader = new THREE.TextureLoader();
	const texture = textureLoader.load( 'Assetts/fur.jpg')
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // escape
				object.position.x = 0;
				object.position.y = -2.9;
				object.position.z = 0;
				object.name = 'g0';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // escape pinion
				object.position.x = 0;
				object.position.y = -2.9;
				object.position.z = 2;
				object.name = 'g1';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // ring
				object.position.x = 0;
				object.position.y = 0;
				object.position.z = 3;
				object.name = 'g2';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // drive
				object.position.x = 6.8;
				object.position.y = 11;
				object.position.z = 1;
				object.name = 'g3';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // drive pinion minutes
				object.position.x = 0;
				object.position.y = 0;
				object.position.z = 1;
				object.name = 'g4';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // arm
				object.position.x = 0;
				object.position.y = 0;
				object.position.z = 2;
				object.name = 'g5';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // planet
				object.position.x = 12.7;
				object.position.y = 0;
				object.position.z = 3;
				object.name = 'g6';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // planet pinion
				object.position.x = 12.7;
				object.position.y = 0;
				object.position.z = 4.5;
				object.name = 'g7';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // sun free hour
				object.position.x = 0;
				object.position.y = 0;
				object.position.z = 4;
				object.name = 'g8';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);
	loader.load( 'Assetts/ringGear.obj', function ( object ) { // sun fixed
				object.position.x = 0;
				object.position.y = 0;
				object.position.z = 5;
				object.name = 'g9';
				object.traverse( function ( child ) {
					if ( child.isMesh ) child.material.map = texture;
				} );
				scene.add( object );
			}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			}, function ( error ) {
				console.log( 'An error happened' );
			}
		);

//	// build objects for scene
//	let n1 = getNode();
//	scene.add(n1);

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.evicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 'rgb(0, 0, 0)' );
//	renderer.shadowMap.enabled = true;
	container = renderer.domElement;

	// orbit controlls if desired
	controls = new THREE.OrbitControls( camera, container );

	document.getElementById( 'webgl' ).appendChild( container );

	// event listeners
	document.addEventListener( 'mousemove', onDocumentMouseMove );
	document.addEventListener( 'mouseclick', onDocumentMouseClick );
	window.addEventListener( 'resize', onWindowResize );
}

function degrees_to_radians( degrees )
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function animate( /* renderer,*/ scene, camera, controls ) { // get next frame and dispaly
	//renderer.render( scene, camera );
	requestAnimationFrame( animate );
		//TWEEN.update();
	render();
}

function render() { // update scene here
//	camera.position.x += ( mouseX - camera.position.x ) * .05;
//	camera.position.y += ( - mouseY - camera.position.y ) * .05;
//	camera.lookAt( object.position );

		console.log("Updating");
		scene.getObjectByName('g0').rotation.y -= degrees_to_radians(14.0929481132076); // escape
		scene.getObjectByName('g1').rotation.y -= degrees_to_radians(14.0929481132076); // escape pinion
		scene.getObjectByName('g2').rotation.y += degrees_to_radians(0.503319575471701); // ring
		scene.getObjectByName('g3').rotation.y -= degrees_to_radians(.1); // drive
		scene.getObjectByName('g4').rotation.y += degrees_to_radians(.1); // drive pinion minutes
		scene.getObjectByName('g5').rotation.y += degrees_to_radians(.1); // arm
		scene.getObjectByName('g6').rotation.y += degrees_to_radians(0.854716981132079); // planet
		scene.getObjectByName('g6').position.x = Math.cos(orbit) * 12.7;
		scene.getObjectByName('g6').position.z = Math.sin(orbit) * 12.7;
		scene.getObjectByName('g7').rotation.y += degrees_to_radians(0.854716981132079); // planet pinion
		scene.getObjectByName('g7').position.x = Math.cos(orbit) * 12.7;
		scene.getObjectByName('g7').position.z = Math.sin(orbit) * 12.7;
		orbit += degrees_to_radians(.1);
		scene.getObjectByName('g8').rotation.y += degrees_to_radians(0.00833333); // sun free hour
		scene.getObjectByName('g9').rotation.y += degrees_to_radians(0); // sun fixed
		lastSec = currentSec;
	renderer.render( scene, camera );
} 

function onDocumentMouseMove( event ) {
	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;
}

function onDocumentMouseClick( event ) {
	console.log("mouse clicked.");
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalyY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function getPointLight( intensity ) {
	let light = new THREE.PointLight( 0xffffff, intensity );
	light.castShadow = true;
	return light;
}

function getDirectionalLight( intensity ) {
	let light = new THREE.DirectionalLight( 0xffffff, intensity );
	light.castShadow = true;
	light.shadow.camera.left = -10;
	light.shadow.camera.bottom = -10;
	light.shadow.camera.right = 10;
	light.shadow.camera.top = 10;
	return light;
}

function getAmbientLight( intensity ) {
	let light = new THREE.AmbientLight( 0xcccccc, intensity );
	return light;
}

function getNode() {
  var geometry = new THREE.SphereGeometry(1, 25, 25 );
  var material = new THREE.MeshLambertMaterial({
    emissive: 'rgb(0, 255, 0)',
    emissiveIntensity: .75,
    opacity: 0.05,
    transparent: true
  });
  var mesh = new THREE.Mesh(
    geometry,
    material 
  );
  mesh.receiveShadow = true;
  return mesh;
}

