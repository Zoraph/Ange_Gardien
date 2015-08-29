#pragma strict

var mainMenuSceneName : String;
var pauseMenuFont : Font;
var pauseEnabled = false;	
private var showGraphicsDropDown = false;


var audio1: AudioClip;
var audio2: AudioClip;
var audio3: AudioClip;


// Placement plane items
var placementPlanesRoot: Transform;
var hoverMat: Material;
var placementLayerMask: LayerMask;
private var originalMat: Material;
private var lastHitObj: GameObject;

var buttonType: GameObject[];

var allStructures: GameObject[];
private var structureIndex: int = 0;

var breathFlow: int = 0;   // will depend on the child's breathing

//towers (cash system)
var towerCost: int[];

//states
var waveActive: boolean = false;
var spawnEnemies: boolean = false;
var upgradePanelOpen: boolean = false;

//GUI

static var scores: int = 0;
var scoreCount: int = 0;
//var upgradeButton: GameObject;

//wave specific var

var difficultyMultiplier: float = 1.0;
var intermissionTime: float = 5.0;


// enemy var
var mucusPrefab: GameObject[];
var mucusSpawns: Transform;
var mucusInterval: float = 1.0;


//var waveLength: int[];

var waveLevel: int = 0;
var waveTotal: int;
var enemyCount: int[];
var enemyLeft: int[];
var enemyCountKeeper: int[];
var totalEnemyCount: int[];

var respawnMinBase: float = 3.0;
var respawnMaxBase: float = 10.0;

private var respawnMin: float = 3.0;
private var respawnMax: float = 10.0;
private var mucusSpawnPoints: Transform[];
private var lastSpawnTime: float = 0;
private var nextMucusSpawnTime: float = 0.0;

// Upgrade var
private var focusedPlane: js_placementPlane;
private var structureToUpgrade: js_turretBaseUpgrade;
private var upgradeStructure: GameObject;
private var upgradeCost: int;

var aTexture: Texture;

function Start () {
	QualitySettings.currentLevel = QualityLevel.Fastest;
	pauseEnabled = false;
	Time.timeScale = 1;
	AudioListener.volume = 1;

	structureIndex = 0;
	
	mucusSpawnPoints = new Transform[mucusSpawns.childCount];
	var i: int = 0;
	for(var theSpawnPoint: Transform in mucusSpawns){
		mucusSpawnPoints[i] = theSpawnPoint;
		i++;
	}	
	SetNextWave();
}

function Update () {

	
	
		//check if pause button (escape key) is pressed
	if(Input.GetKeyDown("escape")){
		
		//check if game is already paused		
		if(pauseEnabled == true){
			//unpause the game
			pauseEnabled = false;
			Time.timeScale = 1;
			AudioListener.volume = 1;
		}
		
		//else if game isn't paused, then pause it
		else if(pauseEnabled == false){
			pauseEnabled = true;
			AudioListener.volume = 0;
			Time.timeScale = 0;
		}
	}
	
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hit: RaycastHit;
	if(Physics.Raycast(ray,hit,1000,placementLayerMask) && !pauseEnabled){
		if(lastHitObj){
			lastHitObj.GetComponent.<Renderer>().material = originalMat;
		}
		lastHitObj = hit.collider.gameObject;
		originalMat = lastHitObj.GetComponent.<Renderer>().material;
		lastHitObj.GetComponent.<Renderer>().material = hoverMat;
	}
	else {
		if(lastHitObj){
			lastHitObj.GetComponent.<Renderer>().material = originalMat;
			lastHitObj = null;
		}
	}
				
	if(Input.GetMouseButtonDown(0) && lastHitObj && !upgradePanelOpen && !pauseEnabled){
		focusedPlane = lastHitObj.GetComponent(js_placementPlane);
		if(focusedPlane.isOpen && towerCost[structureIndex] <= breathFlow){
			
			//drop the chosen structure exactly on the tile
			var newStructure: GameObject = Instantiate(allStructures[structureIndex], lastHitObj.transform.position, Quaternion.identity);
			
			// set the tile as taken
			focusedPlane.myStructure = newStructure;
//			audio.Play();
 			GetComponent.<AudioSource>().PlayOneShot(audio1, 1);
			focusedPlane.isOpen = false;
			
			breathFlow -= towerCost[structureIndex];		
		}
		else if(focusedPlane.myStructure != null){
			GetComponent.<AudioSource>().PlayOneShot(audio2, 1);
			ShowUpgradeGUI();
		}
	}
	
	if(buttonType[0].GetComponent(js_wind).windType == true){
		buttonType[1].GetComponent(js_water).waterType = false;
		buttonType[2].GetComponent(js_fire).fireType = false;
		structureIndex = 0;
	}
	else if(buttonType[1].GetComponent(js_water).waterType == true){
		buttonType[0].GetComponent(js_wind).windType = false;
		buttonType[2].GetComponent(js_fire).fireType = false;
		structureIndex = 1;
	}
	else if(buttonType[2].GetComponent(js_fire).fireType == true){
		buttonType[0].GetComponent(js_wind).windType = false;
		buttonType[1].GetComponent(js_water).waterType = false;
		structureIndex = 2;
	}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	if(Application.loadedLevelName == "Ange Gardien LV1"){
		if(!waveActive){
			if(waveLevel == 0){
				if(enemyCount[0] <= 0 && enemyCountKeeper[0] == 0 && Input.GetKeyUp("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[0] = totalEnemyCount[0];				
				}
			}
			else if(waveLevel == 1){
				if(enemyCount[0] <= 0 && enemyCountKeeper[0] == 0 && Input.GetKeyUp("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[0] = totalEnemyCount[0];	
				}
			}
			
			else if(waveLevel == 2){			
				if(enemyCount[1] <= 0 && enemyCountKeeper[1] == 0 && Input.GetKeyUp("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[1] = totalEnemyCount[1];
				}
			}
			else if(waveLevel == 3){
				if(enemyCount[2] <= 0 && enemyCountKeeper[2] == 0 && Input.GetKeyDown("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[2] = totalEnemyCount[2];
				}
			}
			
			else if(waveLevel == 4){			
				if(enemyCount[3] <= 0 && enemyCountKeeper[3] == 0 && Input.GetKeyDown("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[3] = totalEnemyCount[3];
				}
			}
		}

		if(waveActive){
			if(waveLevel == 0 || waveLevel == 1){
				if(enemyCountKeeper[0] == totalEnemyCount[0]){
					spawnEnemies = false;
					FinishWave();
				}
			}
			else if(waveLevel == 2){
				if(enemyCountKeeper[1] == totalEnemyCount[1]){
					spawnEnemies = false;
					FinishWave();
				}
			}
			else if(waveLevel == 3){
				if(enemyCountKeeper[2] == totalEnemyCount[2]){
					spawnEnemies = false;
					FinishWave();
				}
			}
			else if(waveLevel == 4 ){
				if(enemyCountKeeper[3] == totalEnemyCount[3]){
					spawnEnemies = false;
	//				FinishWave();
				}
				if(enemyLeft[3] <= 0){		
					if(Application.loadedLevelName == "Ange Gardien LV1"){		
						if(scoreCount > PlayerPrefs.GetInt("highScore1")){
							PlayerPrefs.SetInt("highScore1", scoreCount);		
						}
					}
				Application.LoadLevel(1);
				}
			}
			if(spawnEnemies){
				if(Time.time > (lastSpawnTime + mucusInterval)){
					SpawnNewEnemy();
				}
			}
		}
	}

	if(Application.loadedLevelName == "Ange Gardien LV2"){
		if(!waveActive){
			if(waveLevel == 0){
				if(enemyCount[0] <= 0 && enemyCountKeeper[0] == 0 && Input.GetKeyUp("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[0] = totalEnemyCount[0];				
				}
			}
			else if(waveLevel == 1){
				if(enemyCount[0] <= 0 && enemyCountKeeper[0] == 0 && Input.GetKeyUp("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[0] = totalEnemyCount[0];	
				}
			}
			
			else if(waveLevel == 2){			
				if(enemyCount[1] <= 0 && enemyCountKeeper[1] == 0 && Input.GetKeyUp("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[1] = totalEnemyCount[1];
				}
			}
			else if(waveLevel == 3){
				if(enemyCount[2] <= 0 && enemyCountKeeper[2] == 0 && Input.GetKeyDown("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[2] = totalEnemyCount[2];
				}
			}
		}

		if(waveActive){
			if(waveLevel == 0 || waveLevel == 1){
				if(enemyCountKeeper[0] == totalEnemyCount[0]){
					spawnEnemies = false;
					FinishWave();
				}
			}
			else if(waveLevel == 2){
				if(enemyCountKeeper[1] == totalEnemyCount[1]){
					spawnEnemies = false;
					FinishWave();
				}
			}
			else if(waveLevel == 3){
				if(enemyCountKeeper[2] == totalEnemyCount[2]){
					spawnEnemies = false;
	//				FinishWave();
				}
				if(enemyLeft[2] <= 0){		
					if(Application.loadedLevelName == "Ange Gardien LV2"){		
						if(scoreCount > PlayerPrefs.GetInt("highScore2")){
							PlayerPrefs.SetInt("highScore2", scoreCount);		
						}
					}
				Application.LoadLevel(1);
				}
			}
					
			if(spawnEnemies){
				if(Time.time > (lastSpawnTime + mucusInterval)){
					SpawnNewEnemy();
				}
			}
		}
	}
	
	if(Application.loadedLevelName == "Ange Gardien LV3"){
		if(!waveActive){
			if(waveLevel == 0){
				if(enemyCount[0] <= 0 && enemyCountKeeper[0] == 0 && Input.GetKeyUp("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[0] = totalEnemyCount[0];				
				}
			}
			else if(waveLevel == 1){
				if(enemyCount[0] <= 0 && enemyCountKeeper[0] == 0 && Input.GetKeyUp("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[0] = totalEnemyCount[0];	
				}
			}
			
			else if(waveLevel == 2){			
				if(enemyCount[1] <= 0 && enemyCountKeeper[1] == 0 && Input.GetKeyUp("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[1] = totalEnemyCount[1];
				}
			}
			else if(waveLevel == 3){
				if(enemyCount[2] <= 0 && enemyCountKeeper[2] == 0 && Input.GetKeyDown("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[2] = totalEnemyCount[2];
				}
			}
			
			else if(waveLevel == 4){			
				if(enemyCount[3] <= 0 && enemyCountKeeper[3] == 0 && Input.GetKeyDown("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[3] = totalEnemyCount[3];
				}
			}
			
			else if(waveLevel == 5){			
				if(enemyCount[4] <= 0 && enemyCountKeeper[4] == 0 && Input.GetKeyDown("space") && !pauseEnabled && Time.timeScale == 1){
					waveLevel++;
					StartNewWave();
					enemyLeft[4] = totalEnemyCount[4];
				}
			}
		}

		if(waveActive){
			if(waveLevel == 0 || waveLevel == 1){
				if(enemyCountKeeper[0] == totalEnemyCount[0]){
					spawnEnemies = false;
					FinishWave();
				}
			}
			else if(waveLevel == 2){
				if(enemyCountKeeper[1] == totalEnemyCount[1]){
					spawnEnemies = false;
					FinishWave();
				}
			}
			else if(waveLevel == 3){
				if(enemyCountKeeper[2] == totalEnemyCount[2]){
					spawnEnemies = false;
					FinishWave();
				}
			}
			else if(waveLevel == 4 ){
				if(enemyCountKeeper[3] == totalEnemyCount[3]){
					spawnEnemies = false;
					FinishWave();
				}
			}		
			else if(waveLevel == 5){
				if(enemyCountKeeper[4] == totalEnemyCount[4]){
					spawnEnemies = false;
	//				FinishWave();				
				}
				if(enemyLeft[4] <= 0){		
					if(Application.loadedLevelName == "Ange Gardien LV3"){		
						if(scoreCount > PlayerPrefs.GetInt("highScore3")){
							PlayerPrefs.SetInt("highScore3", scoreCount);		
						}
					}
				Application.LoadLevel(1);
				}
			}
					
			if(spawnEnemies){
				if(Time.time > (lastSpawnTime + mucusInterval)){
					SpawnNewEnemy();
				}
			}
		}
	}
}

function SetNextWave(){
	difficultyMultiplier = ((Mathf.Pow(waveLevel, 2)) * .005) + 1;
	respawnMin = respawnMinBase * (1/difficultyMultiplier);
	respawnMax = respawnMaxBase * (1/difficultyMultiplier);
}

function StartNewWave(){
	
	//active the wave
		waveActive = true;
		spawnEnemies = true;
		
	//spawn first enemy
	SpawnNewEnemy();
}

function SpawnNewEnemy(){
	
	//get a random index to choise an enemy prefab with
	var enemyChoice = Random.Range(0, mucusPrefab.length);
	var spawnChoice: Transform;

	if(Application.loadedLevelName == "Ange Gardien LV1"){
		if(waveLevel == 1){		
			spawnChoice = mucusSpawnPoints[2];
			Instantiate(mucusPrefab[0], mucusSpawnPoints[2].position, mucusSpawnPoints[2].rotation);
			enemyCount[0]++;
			enemyCountKeeper[0]++;
		}
		else if(waveLevel == 2){
			
			spawnChoice = mucusSpawnPoints[1];
			Instantiate(mucusPrefab[1], mucusSpawnPoints[1].position, mucusSpawnPoints[1].rotation);
			enemyCount[1]++;
			enemyCountKeeper[1]++;
		}
		else if(waveLevel == 3){
			
			spawnChoice = mucusSpawnPoints[2];
			Instantiate(mucusPrefab[0], mucusSpawnPoints[2].position, mucusSpawnPoints[2].rotation);		
			enemyCount[2]++;
			enemyCountKeeper[2]++;
			spawnChoice = mucusSpawnPoints[1];
			Instantiate(mucusPrefab[1], mucusSpawnPoints[1].position, mucusSpawnPoints[1].rotation);
			enemyCount[2]++;
			enemyCountKeeper[2]++;		
		}
		else if(waveLevel == 4){
			
			spawnChoice = mucusSpawnPoints[0];
			Instantiate(mucusPrefab[2], mucusSpawnPoints[0].position, mucusSpawnPoints[0].rotation);		
			enemyCount[3]++;
			enemyCountKeeper[3]++;		
			Instantiate(mucusPrefab[3], mucusSpawnPoints[0].position, mucusSpawnPoints[0].rotation);	
			enemyCount[3]++;
			enemyCountKeeper[3]++;
		}
	}
	
	else if(Application.loadedLevelName == "Ange Gardien LV2"){
		if(waveLevel == 1){		
			spawnChoice = mucusSpawnPoints[0];
			Instantiate(mucusPrefab[0], mucusSpawnPoints[0].position, mucusSpawnPoints[0].rotation);
			enemyCount[0]++;
			enemyCountKeeper[0]++;
		}
		else if(waveLevel == 2){
			
			spawnChoice = mucusSpawnPoints[1];
			Instantiate(mucusPrefab[1], mucusSpawnPoints[1].position, mucusSpawnPoints[1].rotation);
			enemyCount[1]++;
			enemyCountKeeper[1]++;
		}
		else if(waveLevel == 3){
			
			spawnChoice = mucusSpawnPoints[0];
			Instantiate(mucusPrefab[0], mucusSpawnPoints[0].position, mucusSpawnPoints[0].rotation);		
			enemyCount[2]++;
			enemyCountKeeper[2]++;
			spawnChoice = mucusSpawnPoints[1];		
			Instantiate(mucusPrefab[1], mucusSpawnPoints[1].position, mucusSpawnPoints[1].rotation);	
			enemyCount[2]++;
			enemyCountKeeper[2]++;
		}
	}
	
	else if(Application.loadedLevelName == "Ange Gardien LV3"){
		if(waveLevel == 1){		
			spawnChoice = mucusSpawnPoints[2];
			Instantiate(mucusPrefab[0], mucusSpawnPoints[2].position, mucusSpawnPoints[2].rotation);
			enemyCount[0]++;
			enemyCountKeeper[0]++;
		}
		else if(waveLevel == 2){
			
			spawnChoice = mucusSpawnPoints[1];
			Instantiate(mucusPrefab[1], mucusSpawnPoints[1].position, mucusSpawnPoints[1].rotation);
			enemyCount[1]++;
			enemyCountKeeper[1]++;
		}
		else if(waveLevel == 3){
			
			spawnChoice = mucusSpawnPoints[0];
			Instantiate(mucusPrefab[2], mucusSpawnPoints[0].position, mucusSpawnPoints[0].rotation);		
			enemyCount[2]++;
			enemyCountKeeper[2]++;		
			Instantiate(mucusPrefab[3], mucusSpawnPoints[0].position, mucusSpawnPoints[0].rotation);	
			enemyCount[2]++;
			enemyCountKeeper[2]++;
		}
		else if(waveLevel == 4){
			
			spawnChoice = mucusSpawnPoints[2];
			Instantiate(mucusPrefab[0], mucusSpawnPoints[2].position, mucusSpawnPoints[2].rotation);		
			enemyCount[3]++;
			enemyCountKeeper[3]++;
			spawnChoice = mucusSpawnPoints[1];
			Instantiate(mucusPrefab[1], mucusSpawnPoints[1].position, mucusSpawnPoints[1].rotation);
			enemyCount[3]++;
			enemyCountKeeper[3]++;		
		}
		else if(waveLevel == 5){
			spawnChoice = mucusSpawnPoints[0];
			Instantiate(mucusPrefab[2], mucusSpawnPoints[0].position, mucusSpawnPoints[0].rotation);		
			enemyCount[4]++;
			enemyCountKeeper[4]++;		
			Instantiate(mucusPrefab[3], mucusSpawnPoints[0].position, mucusSpawnPoints[0].rotation);	
			enemyCount[4]++;
			enemyCountKeeper[4]++;
			
			spawnChoice = mucusSpawnPoints[1];
			Instantiate(mucusPrefab[1], mucusSpawnPoints[1].position, mucusSpawnPoints[1].rotation);
			enemyCount[4]++;
			enemyCountKeeper[4]++;	

			spawnChoice = mucusSpawnPoints[2];
			Instantiate(mucusPrefab[0], mucusSpawnPoints[2].position, mucusSpawnPoints[2].rotation);		
			enemyCount[4]++;
			enemyCountKeeper[4]++;		
		}
	}
	
	lastSpawnTime = Time.time;
	mucusInterval = Random.Range(respawnMin, respawnMax);

}

function FinishWave(){
	waveActive = false;
	yield WaitForSeconds(intermissionTime);
		if(waveLevel != waveTotal){	
			if(waveLevel == 1){
				enemyCountKeeper[0] = 0;
			}
			else if(waveLevel == 2){			
				enemyCountKeeper[1] = 0;
			}
			else if(waveLevel == 3){			
				enemyCountKeeper[2] = 0;
			}
			else if(waveLevel == 4){			
				enemyCountKeeper[3] = 0;
			}
			else if(waveLevel == 5){			
				enemyCountKeeper[4] = 0;
			}
								
			SetNextWave();	
		}	
}

function TowerPlacement(){
	for(var thePlane: Transform in placementPlanesRoot){
		thePlane.gameObject.GetComponent.<Renderer>().enabled = false;
	}
	
	for(var thePlane: Transform in placementPlanesRoot){
		thePlane.gameObject.GetComponent.<Renderer>().enabled = true;
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

function ShowUpgradeGUI(){
	structureToUpgrade = focusedPlane.myStructure.GetComponent(js_turretBaseUpgrade);
	upgradeStructure = structureToUpgrade.myUpgrade;
	
//	if(upgradeStructure != null){
		upgradePanelOpen = true;
		
		upgradeCost = structureToUpgrade.myUpgradeCost;
//	}
}


///////////////////////////////////////////////   OnGUI   //////////////////////////////////////////////////


function OnGUI(){

	
	
//	GUI.skin.box.font = pauseMenuFont;
//	GUI.skin.button.font = pauseMenuFont;

	if(pauseEnabled == true){
		
		//Make a background box
		GUI.Box(Rect(Screen.width /2 - 100,Screen.height /2 - 100,250,200), "Pause Menu");
		
		//Make Main Menu button
		if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 - 50,250,50), "Restart")){
			Application.LoadLevel(mainMenuSceneName);
		}
		
		//Make Change Graphics Quality button
			if(GUI.Button(Rect(Screen.width /2 - 100,Screen.height /2 ,250,50), "Change Graphics Quality")){
			
			if(showGraphicsDropDown == false){
				showGraphicsDropDown = true;
			}
			else{
				showGraphicsDropDown = false;
			}
		}
		
		//Create the Graphics settings buttons, these won't show automatically, they will be called when
		//the user clicks on the "Change Graphics Quality" Button, and then dissapear when they click
		//on it again....
		if(showGraphicsDropDown == true){
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 ,250,50), "Fastest")){
				QualitySettings.currentLevel = QualityLevel.Fastest;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 50,250,50), "Fast")){
				QualitySettings.currentLevel = QualityLevel.Fast;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 100,250,50), "Simple")){
				QualitySettings.currentLevel = QualityLevel.Simple;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 150,250,50), "Good")){
				QualitySettings.currentLevel = QualityLevel.Good;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 200,250,50), "Beautiful")){
				QualitySettings.currentLevel = QualityLevel.Beautiful;
			}
			if(GUI.Button(Rect(Screen.width /2 + 150,Screen.height /2 + 250,250,50), "Fantastic")){
				QualitySettings.currentLevel = QualityLevel.Fantastic;
			}
			
			if(Input.GetKeyDown("escape")){
				showGraphicsDropDown = false;
			}
		}
		
		if (GUI.Button (Rect (Screen.width /2 - 100,Screen.height /2 + 50,250,50), "Return to game")){
        	pauseEnabled = false;
        	Time.timeScale = 1;
		}
	}
	

	
	GUI.backgroundColor = Color.blue;
	

	if(waveLevel == 0 || waveLevel == 1){
		GUI.Label (Rect (110, 545, 100, 30), "Foes left: " + enemyLeft[0]);
	}
	else if(waveLevel == 2){
		GUI.Label (Rect (110, 545, 100, 30), "Foes left: " + enemyLeft[1]);
	}
	else if(waveLevel == 3){
		GUI.Label (Rect (110, 545, 100, 30), "Foes left: " + enemyLeft[2]);
	}
	else if(waveLevel == 4){
		GUI.Label (Rect (110, 545, 100, 30), "Foes left: " + enemyLeft[3]);
	}
	else if(waveLevel == 5){
		GUI.Label (Rect (110, 545, 100, 30), "Foes left: " + enemyLeft[4]);
	}
	
	GUI.Label (Rect (110, 528, 100, 30), "Waves: " + waveLevel + "/" + waveTotal);
	GUI.Label (Rect (110, 562, 100, 30), "Scores: " + scoreCount);	
	GUI.Label (Rect (760, 545, 130, 30), "Breath Flow: " + breathFlow);	
	
	
	GUI.Label (Rect (355, 540, 50, 30), "$: " + towerCost[0]);
	GUI.Label (Rect (465, 540, 50, 30), "$: " + towerCost[1]);
	GUI.Label (Rect (575, 540, 50, 30), "$: " + towerCost[2]);


		
	var color: Color;
	color = GUI.backgroundColor = Color.green;	
	if(upgradePanelOpen){	
		Time.timeScale = 0;
		GUI.BeginGroup (new Rect (Screen.width / 2 - 200, Screen.height / 2, 380, 80));	
			GUI.DrawTexture(Rect(0,0,2000,200), aTexture, ScaleMode.ScaleToFit, true, 10.0);
			var upgradeName = structureToUpgrade.myUpgradeName;
			
			if(upgradeCost != 0){
				GUI.Box (new Rect (0,0,400,200), "Upgrade to " + upgradeName + " for $" + upgradeCost + "?");	
			}

			if((upgradeName == "Wind level 2" && breathFlow < 500) || (upgradeName == "Wind level 3" && breathFlow < 800) || (upgradeCost == 0)){
				color = GUI.backgroundColor = Color.red;
				GUI.Button(Rect(50, 30, 80, 30), "Upgrade");
			}
			if((upgradeName == "Water level 2" && breathFlow < 500) || (upgradeName == "Water level 3" && breathFlow < 800)){
				color = GUI.backgroundColor = Color.red;
				GUI.Button(Rect(50, 30, 80, 30), "Upgrade");	
			}
			if((upgradeName == "Fire level 2" && breathFlow < 500) || (upgradeName == "Fire level 3" && breathFlow < 800)){
				color = GUI.backgroundColor = Color.red;
				GUI.Button(Rect(50, 30, 80, 30), "Upgrade");	
			}
			
			if(upgradeCost == 0){
				GUI.Box (new Rect (0,0,400,200), "Maximum level");
			}
			
			if(GUI.Button(Rect(50, 30, 80, 30), "Upgrade")){
				if(upgradeName == "Wind level 2" && breathFlow >= 500){
					GetComponent.<AudioSource>().PlayOneShot(audio1, 1);
					breathFlow -= upgradeCost;
					var spawnPosWind1 = structureToUpgrade.transform.position;
					var spawnRotWind1 = structureToUpgrade.transform.rotation;
					Destroy(structureToUpgrade.gameObject);
					var newStructureWind1: GameObject = Instantiate(upgradeStructure, spawnPosWind1, spawnRotWind1);
					focusedPlane.myStructure = newStructureWind1;		
				}	
				else if (upgradeName == "Wind level 3" && breathFlow >= 800){
					GetComponent.<AudioSource>().PlayOneShot(audio1, 1);
					breathFlow -= upgradeCost;
					var spawnPosWind2 = structureToUpgrade.transform.position;
					var spawnRotWind2 = structureToUpgrade.transform.rotation;
					Destroy(structureToUpgrade.gameObject);
					var newStructureWind2: GameObject = Instantiate(upgradeStructure, spawnPosWind2, spawnRotWind2);
					focusedPlane.myStructure = newStructureWind2;	
				}
				else if (upgradeName == "Water level 2" && breathFlow >= 500){
					GetComponent.<AudioSource>().PlayOneShot(audio1, 1);
					breathFlow -= upgradeCost;
					var spawnPosWater1 = structureToUpgrade.transform.position;
					var spawnRotWater1 = structureToUpgrade.transform.rotation;
					Destroy(structureToUpgrade.gameObject);
					var newStructureWater1: GameObject = Instantiate(upgradeStructure, spawnPosWater1, spawnRotWater1);
					focusedPlane.myStructure = newStructureWater1;	
				}
				else if (upgradeName == "Water level 3" && breathFlow >= 800){
					GetComponent.<AudioSource>().PlayOneShot(audio1, 1);
					breathFlow -= upgradeCost;
					var spawnPosWater2 = structureToUpgrade.transform.position;
					var spawnRotWater2 = structureToUpgrade.transform.rotation;
					Destroy(structureToUpgrade.gameObject);
					var newStructureWater2: GameObject = Instantiate(upgradeStructure, spawnPosWater2, spawnRotWater2);
					focusedPlane.myStructure = newStructureWater2;	
				}
				else if (upgradeName == "Fire level 2" && breathFlow >= 500){
					GetComponent.<AudioSource>().PlayOneShot(audio1, 1);
					breathFlow -= upgradeCost;
					var spawnPosFire1 = structureToUpgrade.transform.position;
					var spawnRotFire1 = structureToUpgrade.transform.rotation;
					Destroy(structureToUpgrade.gameObject);
					var newStructureFire1: GameObject = Instantiate(upgradeStructure, spawnPosFire1, spawnRotFire1);
					focusedPlane.myStructure = newStructureFire1;	
				}
				else if (upgradeName == "Fire level 3" && breathFlow >= 800){
					GetComponent.<AudioSource>().PlayOneShot(audio1, 1);
					breathFlow -= upgradeCost;
					var spawnPosFire2 = structureToUpgrade.transform.position;
					var spawnRotFire2 = structureToUpgrade.transform.rotation;
					Destroy(structureToUpgrade.gameObject);
					var newStructureFire2: GameObject = Instantiate(upgradeStructure, spawnPosFire2, spawnRotFire2);
					focusedPlane.myStructure = newStructureFire2;	
				}
				
			upgradePanelOpen = false;
			Time.timeScale = 1;
			}
			
			color = GUI.backgroundColor = Color.green;	
			if(GUI.Button(Rect(150, 30, 80, 30), "Destroy")){				
				GetComponent.<AudioSource>().PlayOneShot(audio3, 1);
				if(upgradeName == "Wind level 2" || upgradeName == "Water level 2" || upgradeName == "Fire level 2"){
					Destroy(structureToUpgrade.gameObject);
					breathFlow += 50;
					focusedPlane.isOpen = true;
				}
				else if(upgradeName == "Wind level 3" || upgradeName == "Water level 3" || upgradeName == "Fire level 3"){
					Destroy(structureToUpgrade.gameObject);
					breathFlow += 125;
					focusedPlane.isOpen = true;
				}
				else if(upgradeName == "Omega Wind" || upgradeName == "Omega Water" || upgradeName == "Omega Fire"){
					Destroy(structureToUpgrade.gameObject);
					breathFlow += 250;
					focusedPlane.isOpen = true;
				}

				upgradePanelOpen = false;
				Time.timeScale = 1;
			}
			
			color = GUI.backgroundColor = Color.green;	
			if(GUI.Button(Rect(250, 30, 80, 30), "Cancel")){
				GetComponent.<AudioSource>().PlayOneShot(audio2, 1);
				upgradePanelOpen = false;
				Time.timeScale = 1;
			}
						
		GUI.EndGroup ();
	}
	

}