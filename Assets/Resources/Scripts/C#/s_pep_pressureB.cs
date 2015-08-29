using UnityEngine;
using System.Collections;

public class s_pep_pressureB : MonoBehaviour {
	
	public static float pressureDone;
	public float pressurePosition;
	public float pressureFixed = 0.55f;
	public float pressureBuffer = 0.3f;
	public GameObject dot;
	public GameObject dot_red;
	public GUIText g_text_1;
	public GUIText g_text_2;
	public GUIText g_text_total;
	private float[] breathing = new float[799];
	private float dot_height;
	private float dot_height_saved;
	public float clock;
	public float clockEnd;
	public float clockExhaleEnd;
	public int x = 0;
//	private int i_text_total = 3;
	private bool startBreath = true;
	private bool endBreath = false;

	public int counterDot = 0;

	static public bool deactivator = false;

	static js_gameMaster gameMaster;

	void Start () {
		gameMaster = GameObject.FindWithTag("gameMaster").GetComponent <js_gameMaster>();
		deactivator = false;
		clock =  Time.fixedTime + 0.1f;
	}

	void Update () {
		s_pep_pressureA sp = s_pep_pressureA.GetSceneInstance ();
		pressurePosition = sp.pressure;
		pressureFixed = sp.normalPressure;
		pressureDone = Mathf.Abs (pressurePosition - pressureFixed);

		if (pressureDone > pressureBuffer){
			Vector3 newPlayerPosition = transform.position;
			newPlayerPosition = new Vector3(transform.position.x, ((pressurePosition - pressureFixed) * 4.0f)  - 3.5f, transform.position.z);		//sets horizontal and vertical limit
			transform.position = newPlayerPosition;
		}
		if (pressureDone < pressureBuffer){
			Vector3 newPlayerPosition = transform.position;
			newPlayerPosition = new Vector3(transform.position.x, - 3.5f, transform.position.z);
			transform.position = newPlayerPosition;
		}

		clockEnd = clock - Time.fixedTime;
		
		if (clockEnd < 0f)
		{
			if (x > 20)
			{
				dot_height = pressureDone;
				g_text_1.text = (Mathf.Round(dot_height * 10) / 10).ToString();
				dot_height = Mathf.Clamp(dot_height, 0, 8);
				if (dot_height < 0.15f)
					dot_height = 0f;
				breathing[x] = Mathf.Round(dot_height * 100f) / 100f;
				dot_height_saved = dot_height;
				dot_height -= -40f;
				Instantiate (dot, new Vector3 (-59f + (x * 0.07f), dot_height, -3f), Quaternion.Euler(90, 0, 0));
				clock = Time.fixedTime + 0.1f;
			}
			x++;
		}



		if ((clockExhaleEnd < Time.fixedTime) && (x > 20))
		{
			g_text_2.text = ":-)";
			
			if (startBreath == true){
		 		gameMaster.breathFlow += 50;
				print (gameMaster.breathFlow);

				startBreath = false;
			}
		}


//		g_text_total.text = i_text_total.ToString() + " expirations à faire";

		if (dot_height_saved <= 0.3f)
		{
			g_text_2.text = " ";
			startBreath = true;
			endBreath = true;
			clockExhaleEnd = Time.fixedTime + 5f;
		}
		else
		{
			if (endBreath == true) {
				Instantiate (dot_red, new Vector3 (-59f + (x * 0.07f), 45f, -3f), Quaternion.Euler(0, 0, 0));
				counterDot ++;
				endBreath = false;
			}
		}

		if(counterDot == 15){
			deactivator = true;
			counterDot = 0;
		}

		if (Input.GetKeyUp ("g"))
			deactivator = true;
	}
}

