#pragma strict

static var windType: boolean;

var otherButton: GameObject[];
var gameMaster: js_gameMaster;

function Start () {
	gameMaster = GameObject.FindWithTag("gameMaster").GetComponent(js_gameMaster);
	
	windType = true;
	GetComponent.<GUITexture>().color = Color(0, 1, 0, 1);
	otherButton[0].GetComponent.<GUITexture>().color = Color.black;
	otherButton[0].GetComponent.<GUITexture>().color = Color(0, 0, 0, 0.3);
	otherButton[1].GetComponent.<GUITexture>().color = Color.black;
	otherButton[1].GetComponent.<GUITexture>().color = Color(0, 0, 0, 0.3);
}

function OnMouseDown () {
	if(!windType && gameMaster.pauseEnabled == false && Time.timeScale == 1){
		GetComponent.<AudioSource>().Play();
		windType = true;
		GetComponent.<GUITexture>().color = Color(0, 1, 0, 1);
		otherButton[0].GetComponent(js_water).waterType = false;
		otherButton[0].GetComponent.<GUITexture>().color = Color.black;
		otherButton[0].GetComponent.<GUITexture>().color = Color(0, 0, 0, 0.3);
		otherButton[1].GetComponent(js_fire).fireType = false;
		otherButton[1].GetComponent.<GUITexture>().color = Color.black;
		otherButton[1].GetComponent.<GUITexture>().color = Color(0, 0, 0, 0.3);
	}
}