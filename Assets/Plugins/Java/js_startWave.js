#pragma strict

var displayLabel: boolean = false;
var triggerOn: boolean;

var gameMaster: js_gameMaster;
var wall: GameObject;
var pepControl: GameObject;

function Start(){	
	gameMaster = GameObject.FindWithTag("gameMaster").GetComponent(js_gameMaster);
	triggerOn = true;
	wall.GetComponent.<Renderer>().enabled = true;
	FlashLabel();
}

function Update(){
	
	
	if(Application.loadedLevelName == "Ange Gardien LV1"){
		if(triggerOn && gameMaster.pauseEnabled  == false){
			if(Input.GetKeyUp("space")){
				GetComponent.<AudioSource>().Play();
				triggerOn = false;
				wall.SetActive(false);
				print("1");
			}
		}
		else if(triggerOn == false && (gameMaster.enemyLeft[0] == 0 || gameMaster.enemyLeft[1] == 0 || gameMaster.enemyLeft[2] == 0 || gameMaster.enemyLeft[3] == 0)){
			triggerOn = true;
			pepControl.SetActive(true);
			wall.SetActive(true);
			print("2");
			FlashLabel();
		}
	}
	
	else if(Application.loadedLevelName == "Ange Gardien LV2"){
		if(triggerOn && gameMaster.pauseEnabled  == false){
			if(Input.GetKeyUp("space")){
				GetComponent.<AudioSource>().Play();
				triggerOn = false;
				wall.SetActive(false);
				print("1");
			}
		}
		else if(triggerOn == false && (gameMaster.enemyLeft[0] == 0 || gameMaster.enemyLeft[1] == 0 || gameMaster.enemyLeft[2] == 0)){
			triggerOn = true;
			pepControl.SetActive(true);
			wall.SetActive(true);
			print("2");
			FlashLabel();
		}
	}
	
	else if(Application.loadedLevelName == "Ange Gardien LV3"){
		if(triggerOn && gameMaster.pauseEnabled  == false){
			if(Input.GetKeyUp("space")){
				GetComponent.<AudioSource>().Play();
				triggerOn = false;
				wall.SetActive(false);
				print("1");
			}
		}
		else if(triggerOn == false && (gameMaster.enemyLeft[0] == 0 || gameMaster.enemyLeft[1] == 0 || gameMaster.enemyLeft[2] == 0 || gameMaster.enemyLeft[3] == 0 || gameMaster.enemyLeft[4] == 0)){
			triggerOn = true;
			pepControl.SetActive(true);
			wall.SetActive(true);
			print("2");
			FlashLabel();
		}
	}
	
	
	
	
	
}

function FlashLabel() {		
	while (((triggerOn && gameMaster.enemyLeft[0] == 5) || (triggerOn && gameMaster.enemyLeft[0] == 6)) || (triggerOn && gameMaster.enemyLeft[0] == 0) || (triggerOn && gameMaster.enemyLeft[1] == 0) || (triggerOn && gameMaster.enemyLeft[2] == 0) || (triggerOn && gameMaster.enemyLeft[3] == 0) || (triggerOn && gameMaster.enemyLeft[4] == 0)) {
		displayLabel = true;
		yield WaitForSeconds(.5);
		displayLabel = false;
		yield WaitForSeconds(.5);
	}
}

function OnGUI() {
	if (displayLabel == true){
		GUILayout.BeginArea (Rect(420,10,200,100));
	 	GUILayout.Label("Press space to start new wave");
	 	GUILayout.EndArea ();
 	}
}