#pragma strict

function OnMouseDown(){
	Application.LoadLevel(1);
}


/*

////////////////////////////////////////////////////////////////////////

function SpawnNewEnemy(){
	
	if(mucusPrefab[enemyChoice].tag == "Enemy1"){
		spawnChoice = mucusSpawnPoints[2];
		Instantiate(mucusPrefab[enemyChoice], mucusSpawnPoints[2].position, mucusSpawnPoints[2].rotation);
	}
	else if(mucusPrefab[enemyChoice].tag == "Enemy2"){
		spawnChoice = mucusSpawnPoints[0];
		Instantiate(mucusPrefab[enemyChoice], mucusSpawnPoints[0].position, mucusSpawnPoints[0].rotation);
	}
	else if(mucusPrefab[enemyChoice].tag == "Enemy3"){
		spawnChoice = mucusSpawnPoints[1];
		Instantiate(mucusPrefab[enemyChoice], mucusSpawnPoints[1].position, mucusSpawnPoints[1].rotation);
	}
	
	
	var enemyChoice = Random.Range(0, mucusPrefab.length);
	var enemyChoice2 = mucusPrefab[0];
	var enemyChoice3 = mucusPrefab[1];
	var enemyChoice4 = mucusPrefab[2];
	var enemyChoice5 = mucusPrefab[3];
	
	var spawnChoice: Transform;
	
	if(Application.loadedLevelName == "Ange Gardien LV1"){
		if(waveLevel == 1){
			
			spawnChoice = mucusSpawnPoints[2];
			Instantiate(mucusPrefab[enemyChoice2], mucusSpawnPoints[2].position, mucusSpawnPoints[2].rotation);
			
			
			enemyCount[0]++;
			enemyCountKeeper[0]++;
		}
		else if(waveLevel == 2){
			enemyCount[1]++;
			enemyCountKeeper[1]++;
		}
		else if(waveLevel == 3){
			enemyCount[2]++;
			enemyCountKeeper[2]++;
		}
		else if(waveLevel == 4){
			enemyCount[3]++;
			enemyCountKeeper[3]++;
		}
		else if(waveLevel == 5){
			enemyCount[4]++;
			enemyCountKeeper[4]++;
		}
	}
	
	
	
	
	
	if(waveLevel == 1){
		enemyCount[0]++;
		enemyCountKeeper[0]++;
	}
	else if(waveLevel == 2){
		enemyCount[1]++;
		enemyCountKeeper[1]++;
	}
	else if(waveLevel == 3){
		enemyCount[2]++;
		enemyCountKeeper[2]++;
	}
	else if(waveLevel == 4){
		enemyCount[3]++;
		enemyCountKeeper[3]++;
	}
	else if(waveLevel == 5){
		enemyCount[4]++;
		enemyCountKeeper[4]++;
	}
	else if(waveLevel == 6){
		enemyCount[5]++;
		enemyCountKeeper[5]++;
	}
	else if(waveLevel == 7){
		enemyCount[6]++;
		enemyCountKeeper[6]++;
	}
	else if(waveLevel == 8){
		enemyCount[7]++;
		enemyCountKeeper[7]++;
	}
	else if(waveLevel == 9){
		enemyCount[8]++;
		enemyCountKeeper[8]++;
	}
	else if(waveLevel == 10){
		enemyCount[9]++;
		enemyCountKeeper[9]++;
	}
	else if(waveLevel == 11){
		enemyCount[10]++;
		enemyCountKeeper[10]++;
	}
	else if(waveLevel == 12){
		enemyCount[11]++;
		enemyCountKeeper[11]++;
	}
	else if(waveLevel == 13){
		enemyCount[12]++;
		enemyCountKeeper[12]++;
	}
	else if(waveLevel == 14){
		enemyCount[13]++;
		enemyCountKeeper[13]++;
	}
	else if(waveLevel == 15){
		enemyCount[14]++;
		enemyCountKeeper[14]++;
	}
	
	lastSpawnTime = Time.time;
	mucusInterval = Random.Range(respawnMin, respawnMax);

}

	if(spawnEnemies){
		if(Time.time > (lastSpawnTime + mucusInterval)){
			SpawnNewEnemy();
		}
	}

/////////////////////////////////////////////////////////////////////

*/




