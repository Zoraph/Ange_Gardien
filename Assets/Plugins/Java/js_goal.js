#pragma strict

var gameMaster: js_gameMaster;

function Start () {	
	gameMaster = GameObject.FindWithTag("gameMaster").GetComponent(js_gameMaster);
}

function OnTriggerEnter(other: Collider){
	if(other.gameObject.tag == "Enemy1" || other.gameObject.tag == "Enemy2" || other.gameObject.tag == "Enemy3"){
		GetComponent.<AudioSource>().Play();
		Destroy(other.gameObject);
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
	}
}