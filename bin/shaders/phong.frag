// classic Phong equation
#version 410
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

uniform vec3 Ia;
uniform vec3 Id;
uniform vec3 Is;
uniform float specularPower = 32.0f;

in vec4 vNormal;
in vec4 vPosition;

out vec4 fragColor;

uniform vec4 cameraPosition;
uniform vec4 lightDirection;

void main()
{

	// Ambient light
	vec3 Ambient = Ka * Ia;

	// Diffuse light
	float NdL = dot( normalize(vNormal), -lightDirection );
	vec3 Diffuse = Kd * Id * NdL;

	// Specular light
	//vec4 R = normalize(reflect( lightDirection, vNormal ));
	//vec4 V = normalize( cameraPosition - vPosition );

	//float specTerm = pow( max( 0, dot( R, V ) ), specularPower );
	//vec3 Specular = Ks * Is * specTerm;

	fragColor = vec4(Ambient + Diffuse, 1);
}