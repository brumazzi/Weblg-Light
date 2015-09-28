var th = THREE;
var render;
var camera;
var scene;
var sphere;
var point;
var ice_snow;

function snow(){
	point = new th.Geometry();
	var material = new th.PointsMaterial({
		color: Math.random()*0xffffff,
		size: 0.2
	});
	for(var x=0;x<5000;x++){
		point.vertices.push(new th.Vector3(
			(Math.random()*window.innerWidth/10 - (window.innerWidth/10)/2)*2,
			(Math.random()*window.innerHeight/10 - (window.innerHeight/10)/2)*2,
			Math.random()*500-250
		));
	}

	ice_snow = new th.Points(point, material);
	scene.add(ice_snow);
}

function snow_animate(){
	ice_snow.rotation.y += 0.01;
}

function init(){
	camera = new th.OrthographicCamera(window.innerWidth/-10, window.innerWidth/10, window.innerHeight / 10, window.innerHeight/ -10, -500, 1000);
	camera.position.set(0,0,0);

	scene = new th.Scene();

	var sph_geo = new th.SphereGeometry(Math.random()*26+10,16,16);
	var material = new th.MeshPhongMaterial({
		color: Math.random()*0x53ffff,//0x5a8f32,
		emissive: Math.random()*0x04ffff,//0x0764aa,
		side: th.DoubleSide,
		shading: th./*SmoothShading*/FlatShading
	});//th.MeshBasicMaterial({color: 0xffff00});
	sphere = new th.Mesh(sph_geo, material);
	scene.add(sphere);

	/* LIGHT */

	var amb_light = new th.AmbientLight(Math.random()*0xffffff/*0x888888*/);
	scene.add(amb_light);

	var dir_light = [
		new th.DirectionalLight(Math.random()*0xffffff/*0xaaaaaa*/),
		new th.DirectionalLight(Math.random()*0xffffff/*0xff0000*/)
	];
	dir_light[0].position.set(60,-60,0);
	dir_light[1].position.set(-60,60,0);
	dir_light[0].position.normalize();
	dir_light[1].position.normalize();
	scene.add(dir_light[0]);
	scene.add(dir_light[1]);

	/************************/
	snow();
	/************************/

	render = new th.WebGLRenderer()//th.CanvasRenderer();
	render.setClearColor(0x000000);
	render.setPixelRatio(window.devicePixelRatio);
	render.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(render.domElement);

	window.addEventListener('resize', onResize, false);
}

function onResize(){
	camera.left = window.innerWidth / -10;
	camera.right = window.innerWidth / 10;
	camera.top = window.innerHeight / 10;
	camera.bottom = window.innerHeight / -10;

	camera.updateProjectionMatrix();

	render.setSize(window.innerWidth, window.innerHeight);
}

function step(){
	requestAnimationFrame(step);

	sphere.rotation.y += 0.01;
	snow_animate();

	render.render(scene, camera);
}

init();
step();
