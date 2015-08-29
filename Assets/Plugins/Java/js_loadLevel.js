#pragma strict

function OnMouseDown(){
	if(gameObject.tag == "Level1"){
		Application.LoadLevel(2);
	}
	else if(gameObject.tag == "Level2"){
		Application.LoadLevel(3);
	}
	else if(gameObject.tag == "Level3" && js_selection.open){
		Application.LoadLevel(4);
	}
}