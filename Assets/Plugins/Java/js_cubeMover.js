#pragma strict

var myCashValue: int = 50;
var score: int = 30;
var spawnRange: Vector2 = Vector2(-31.0, -25.0);
var speedRange: Vector2 = Vector2(-2, -5.0);
var health: float = 20.0;
var gameMaster: js_gameMaster;

private var speed: float = -2.0;
private var maxHealth: float = 20.0;

var explosionEffect: GameObject;

function Start () {
	
	gameMaster = GameObject.FindWithTag("gameMaster").GetComponent(js_gameMaster);
	
	maxHealth = health;
	speed = Random.Range(speedRange.x, speedRange.y);
	
	speed *= gameMaster.difficultyMultiplier;
	health *= gameMaster.difficultyMultiplier;
	maxHealth *= gameMaster.difficultyMultiplier;
}

function Update () {
	if(health <= 0){
		Explode();
		return;
	}
}

function OnTriggerEnter(other: Collider){
	
	if(this.gameObject.tag == "Enemy1"){
		switch (other.gameObject.tag){
			case "Wind1":
				health -= 3;
				Destroy(other.gameObject);
				break;
			case "Wind2":
				health -= 5;
				Destroy(other.gameObject);
				break;
			case "Wind3":
				health -= 8;
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
				health -= 1;
				Destroy(other.gameObject);
				break;
			case "Fire2":
				health -= 2;
				Destroy(other.gameObject);
				break;
			case "Fire3":
				health -= 3;
				Destroy(other.gameObject);
				break;
		}
	}

	else if(this.gameObject.tag == "Enemy2"){
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
				health -= 3;
				Destroy(other.gameObject);
				break;
			case "Water2":
				health -= 5;
				Destroy(other.gameObject);
				break;
			case "Water3":
				health -= 8;
				Destroy(other.gameObject);
				break;
			case "Fire1":
				health -= 2;
				Destroy(other.gameObject);
				break;
			case "Fire2":
				health -= 4;
				Destroy(other.gameObject);
				break;
			case "Fire3":
				health -= 6;
				Destroy(other.gameObject);
				break;
		}
	}

	else if(this.gameObject.tag == "Enemy3"){
		switch (other.gameObject.tag){
			case "Wind1":
				health -= 2;
				Destroy(other.gameObject);
				break;
			case "Wind2":
				health -= 4;
				Destroy(other.gameObject);
				break;
			case "Wind3":
				health -= 6;
				Destroy(other.gameObject);
				break;
			case "Water1":
				health -= 1;
				Destroy(other.gameObject);
				break;
			case "Water2":
				health -= 2;
				Destroy(other.gameObject);
				break;
			case "Water3":
				health -= 3;
				Destroy(other.gameObject);
				break;
			case "Fire1":
				health -= 3;
				Destroy(other.gameObject);
				break;
			case "Fire2":
				health -= 5;
				Destroy(other.gameObject);
				break;
			case "Fire3":
				health -= 8;
				Destroy(other.gameObject);
				break;
		}
	}	
}

function Explode(){
	
	if(gameMaster.waveLevel == 1){
		gameMaster.enemyCount[0]--;
		gameMaster.enemyLeft[0]--;
	}
	else if(gameMaster.waveLevel == 2){
		gameMaster.enemyCount[1]--;
		gameMaster.enemyLeft[1]--;
	}
	else if(gameMaster.waveLevel == 3){
		gameMaster.enemyCount[2]--;
		gameMaster.enemyLeft[2]--;
	}
	else if(gameMaster.waveLevel == 4){
		gameMaster.enemyCount[3]--;
		gameMaster.enemyLeft[3]--;
	}
	else if(gameMaster.waveLevel == 5){
		gameMaster.enemyCount[4]--;
		gameMaster.enemyLeft[4]--;
	}
	
//	builder.BreathFlow += myCashValue;

	gameMaster.breathFlow += myCashValue;
	gameMaster.scoreCount += score;

	Instantiate(explosionEffect, transform.position, Quaternion.identity);
	Destroy(gameObject);
}

