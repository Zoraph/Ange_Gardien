#pragma strict

var selectTotalScore: int;
var selectScore1: int;
var selectScore2: int;
var selectScore3: int;

var selectGate1: int;
var selectGate2: int;
var selectGate3: int;

static var open: boolean = false;

var image: GameObject;
var enter: GameObject;

function Awake () {
	selectScore1 = PlayerPrefs.GetInt("highScore1");
	selectScore2 = PlayerPrefs.GetInt("highScore2");
	selectScore3 = PlayerPrefs.GetInt("highScore3");
	selectTotalScore = selectScore1 + selectScore2 + selectScore3;
	PlayerPrefs.SetInt("highScoreTotal", selectTotalScore);
}

function Update(){

}

function OnGUI(){
	
	GUI.color = Color.white;
	GUI.Label (Rect (Screen.width /2 - 65, 70, 200, 30), "Total highscore: " + selectTotalScore);
	
	GUI.color = Color.cyan;
	GUI.Label (Rect (Screen.width /2 - 380, 157, 200, 30), "Scene 1 highscore: " + selectScore1);
	GUI.Label (Rect (Screen.width /2 - 70, 157, 200, 30), "Scene 2 highscore: " + selectScore2);
	GUI.Label(Rect (Screen.width /2 + 245, 157, 200, 30), "Scene 3 highscore: " + selectScore3);
	
	GUI.color = Color.green;
	GUI.Label (Rect(Screen.width / 2 - 380, 442, 200, 30), "Need: " + selectGate1 + " points to enter");
	GUI.Label (Rect(Screen.width / 2 - 80, 442, 200, 30), "Need: " + selectGate2 + " points to enter");
	
	GUI.Label (Rect(Screen.width / 2 - 335, 507, 200, 30), " Enter");
	GUI.Label (Rect(Screen.width / 2 - 25, 507, 200, 30), " Enter");
	
	
	if(selectTotalScore < selectGate3){
		image.SetActive(true);
		enter.SetActive(true);
		GUI.color = Color.magenta;
		GUI.Label (Rect(Screen.width / 2 + 230, 442, 200, 30), "Need: " + selectGate3 + " points to enter");
	}
	else if (selectTotalScore >= selectGate3){
		GUI.color = Color.green;
		open = true;
		image.SetActive(false);
		enter.SetActive(false);
		GUI.Label (Rect(Screen.width / 2 + 275, 442, 200, 30), "Unlocked!");
		GUI.Label (Rect(Screen.width / 2 + 280, 507, 200, 30), " Enter");
	}


	if(GUI.Button (Rect (Screen.width /2 + 320, 10, 100, 30), "Reset")){
		selectTotalScore = selectScore1 = selectScore2 = selectScore3 = 0;
		open = false;
		PlayerPrefs.SetInt("highScoreTotal", selectTotalScore);
		PlayerPrefs.SetInt("highScore1", selectScore1);
		PlayerPrefs.SetInt("highScore2", selectScore2);
		PlayerPrefs.SetInt("highScore3", selectScore3);
	}
	if(GUI.Button (Rect (Screen.width /2 - 320, 10, 100, 30), "Debug")){
		selectTotalScore = selectScore1 = 2600;
		PlayerPrefs.SetInt("highScoreTotal", selectTotalScore);
		PlayerPrefs.SetInt("highScore1", selectScore1);
	}
}