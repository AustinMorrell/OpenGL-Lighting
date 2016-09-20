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
	vec3 norLight = normalize(lightDirection) * 1;
	vec4 conLight = vec4(norLight, 1);

	vec3 N = normalize(vNormal.xyz);
	vec3 La = normalize(lightDirection);
	vec3 R = 2 * dot(N, La) * N - La;
	vec3 V = normalize( cameraPosition - vPosition.xyz );

	vec3 red = vec3(250,0,0);
    vec3 green = vec3(0, 250, 0); 
    vec3 blue = vec3(0, 0, 250);
    float a = dot(N,vec3(0,1.f,0));
    vec3 hemisphere = .5f * mix(red, blue, a) + .5f;

	// Ambient light
	vec3 Ambient = Ka * Ia;

	// Diffuse light
	float NdL = max(0, dot(conLight, vNormal));
	vec3 Diffuse = Kd * Id * NdL;

	// Specular light
	float specTerm = pow( max( 0, dot( R, V ) ), specularPower );
	vec3 Specular = Ks * Is * specTerm;

	fragColor = vec4(Ambient + Diffuse + Specular, 1);
}