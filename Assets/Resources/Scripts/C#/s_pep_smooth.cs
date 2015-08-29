using UnityEngine;
using System.Collections;

public class s_pep_smooth : MonoBehaviour {
	
	public Transform e_breath;

	void Start () {

	}
	
	void Update () {

		float breath_y = e_breath.position.y;

		breath_y = Mathf.Clamp(-5f, 5f, 3f);

		e_breath.position = new Vector2(e_breath.position.y, breath_y);



		transform.position = Vector2.Lerp(transform.position, e_breath.position, 0.3f * Time.deltaTime); 

		//	new Vector2(transform.position.x, Mathf.Lerp(e_breath.position.y, e_breath.position.y, 0.01f * Time.deltaTime));

		if (s_pep_pressureB.pressureDone < 0.3f)
			GetComponent<Renderer>().material.color = Color.red;
		if ((s_pep_pressureB.pressureDone > 0.3f) && (s_pep_pressureB.pressureDone < 1.0f)) {
			GetComponent<Renderer>().material.color = Color.green;

		}
		if (s_pep_pressureB.pressureDone > 2.0f)
			GetComponent<Renderer>().material.color = Color.blue;
		
		// end_level = clock - (int)Time.fixedTime;
	}
}
