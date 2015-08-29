using UnityEngine;
using System.Collections;

using UnityEngine;
using System.Collections;
using System.IO.Ports;

public class s_pep_pressureA : MonoBehaviour {
	
	SerialPort stream = new SerialPort("COM3", 9600); //Set the port ("COM3", "/dev/tty.usbmodem621") and the baud rate (9600, is standard on most devices)
	public float pressure;
	public float normalPressure;
	
	private static s_pep_pressureA _instance;	// transform to class and become unique (script must be only exist at one place = be unique) --> Used for SINGLETON
	private float pressureBuffer = 99000f;
	
	void Start () {
		_instance = this;			// Script creates a reference to itself so it is accessible from any other script --> Used for SINGLETON
		stream.Open(); //Open the Serial Stream.
		Invoke("autoCalib", 1);
	}

	void Update () {
		string value = stream.ReadLine(); //Read the information
		pressure = float.Parse (value);
		
		pressure -= pressureBuffer;
		pressure *= 0.01f;
	}
	
	public static s_pep_pressureA GetSceneInstance ()
	{
		return _instance;	// gives access to this unique instance for this script from anywhere else
	}
	
	void autoCalib (){
		normalPressure = pressure;
	}
}

