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

uniform vec3 cameraPosition;
uniform vec3 lightDirection;

void main()
{
	// Ambient light
	vec3 Ambient = Ka * Ia;

	// Diffuse light
	vec3 norLight = normalize(lightDirection) * 1;
	vec4 conLight = vec4(norLight, 1);
	float NdL = max(0, dot(conLight, vNormal));
	vec3 Diffuse = Kd * Id * NdL;

	// Specular light
	vec3 N = normalize(vNormal.xyz);
	vec3 La = normalize(lightDirection);
	vec3 R = 2 * dot(N, La) * N - La;
	vec3 V = normalize( cameraPosition - vPosition.xyz );
	float specTerm = pow( max( 0, dot( R, V ) ), specularPower );
	vec3 Specular = Ks * Is * specTerm;

	fragColor = vec4(Ambient + Diffuse + Specular, 1);
}