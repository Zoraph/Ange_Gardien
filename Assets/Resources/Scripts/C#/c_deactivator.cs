using UnityEngine;
using System.Collections;

public class c_deactivator : MonoBehaviour {

	static s_pep_pressureB stop;

		// Use this for initialization
	void Start () {
		stop = gameObject.GetComponent <s_pep_pressureB>();
	}
	
	// Update is called once per frame
	void Update () {
		if(s_pep_pressureB.deactivator)
			gameObject.SetActive (false);
			s_pep_pressureB.deactivator = false;
	//		s_pep_pressureB.THE COUNTER FOR BREATH IS RESET TO 0 = 0;
	}
}
