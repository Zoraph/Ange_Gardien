#pragma strict

class js_turretScript extends js_turretBaseUpgrade{

	var myProjectile: GameObject;
	var reloadTime: float = 1.0;
	var turnSpeed: float = 5.0;
	var firePauseTime: float = 0.25;
	// var muzzleEffect: GameObject;
	var myTarget: Transform;
	var muzzlePositions: Transform[];
	var turretBall: Transform;

	private var nextFireTime: float;
	private var nextMoveTime: float;   // pause before firing
	private var desiredRotation: Quaternion;     //where we want to turret to rotate towards

	function Update () {
		if(myTarget){
			if(Time.time >= nextMoveTime){
				CalculateAimPosition(myTarget.position);
				turretBall.rotation = Quaternion.Lerp(turretBall.rotation, desiredRotation, Time.deltaTime * turnSpeed);
			}
			if(Time.time >= nextFireTime){
				FireProjectile();
			}
		}
	}

	function OnTriggerStay(other: Collider){
		if(!myTarget){
			if(other.gameObject.tag == "Enemy1" || other.gameObject.tag == "Enemy2" || other.gameObject.tag == "Enemy3"){
				nextFireTime = Time.time + (reloadTime * 0.5);    //time the turrets takes before firing again
				myTarget = other.gameObject.transform;
			}
		}
	}

	/*
	function OnTriggerEnter(other: Collider){
		if(other.gameObject.tag == "Enemy"){
			nextFireTime = Time.time + (reloadTime * 0.5);    //time the turrets takes before firing again
			myTarget = other.gameObject.transform;
		}
	}
	*/

	function OnTriggerExit(other: Collider){
		if(other.gameObject.transform == myTarget)
			myTarget = null;
	}

	function CalculateAimPosition(targetPos: Vector3){
		var aimPoint = Vector3(targetPos.x, targetPos.y, targetPos.z);
		desiredRotation = Quaternion.LookRotation(aimPoint - transform.position);
	}

	function FireProjectile(){
		GetComponent.<AudioSource>().Play();
		nextFireTime = Time.time + reloadTime;
		nextMoveTime = Time.time + firePauseTime;
		
		for(theMuzzlePos in muzzlePositions){
			Instantiate(myProjectile, theMuzzlePos.position, theMuzzlePos.rotation);
		}
	}
}