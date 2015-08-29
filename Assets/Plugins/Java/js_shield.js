#pragma strict

var health: int;
var shieldGone: GameObject;

function Start () {
	health = 12;
}

function Update(){
	if (health <= 0){
		shieldGone.GetComponent.<Collider>().isTrigger = true;
		Destroy(gameObject);
	}
}

function OnTriggerEnter(other: Collider){
	
	switch (other.gameObject.tag){
		case "Wind1":
			health -= 1;
			Destroy(other.gameObject);
			break;
		case "Wind2":
			health -= 2;
			Destroy(other.gameObject);
			break;
		case "Wind3":
			health -= 3;
			Destroy(other.gameObject);
			break;
		case "Water1":
			health -= 2;
			Destroy(other.gameObject);
			break;
		case "Water2":
			health -= 4;
			Destroy(other.gameObject);
			break;
		case "Water3":
			health -= 6;
			Destroy(other.gameObject);
			break;
		case "Fire1":
			Destroy(other.gameObject);
			break;
		case "Fire2":
			Destroy(other.gameObject);
			break;
		case "Fire3":
			Destroy(other.gameObject);
			break;
	}
}