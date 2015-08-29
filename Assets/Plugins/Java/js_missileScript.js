#pragma strict

var myExplosion: GameObject;
var myTarget: Transform;
var myRange: float = 10.0;
var mySpeed: float = 10.0;

private var myDist: float;

function Update () {
	transform.Translate(Vector3.forward * Time.deltaTime * mySpeed);
	myDist += Time.deltaTime * mySpeed;
	if(myDist >= myRange){
		Explode();
	}
	if(myTarget){
		transform.LookAt(myTarget);
	}
	else{
		Explode();
	}
}

function OnTriggerEnter(other: Collider){
	print("erg");
	if(other.gameObject.tag == "Enemy"){
		Explode();
	}
}

function Explode(){
	Instantiate(myExplosion, transform.position, Quaternion.identity);
	Destroy(gameObject);
}