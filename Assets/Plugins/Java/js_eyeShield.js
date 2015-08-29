#pragma strict

var speed: float = 10;

function Update () {
	transform.Rotate(0,0,1 * speed * Time.deltaTime);
}