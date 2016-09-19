// classic Phong equation
#version 410
uniform vec3 kA = vec3(1,0,0);
uniform vec3 kD = vec3(1,0,0);
uniform vec3 kS = vec3(1,0,0);

uniform vec3 iA = vec3(0.25f,0.25f,0.25f);
uniform vec3 iD = vec3(1,1,1);
uniform vec3 iS = vec3(1,1,1);
uniform float iSpecPower = 32.0f;

in vec4 vNormal;
in vec4 vPosition;

out vec4 fragColor;

uniform vec4 cameraPos;
uniform vec4 LightDirection;

void main()
{
	vec3 Ambient = kA * iA;

	float NdL = max( 0.0f, dot( vNormal, -LightDirection ) );
	vec3 Diffuse = kD * iD * NdL;

	vec4 R = reflect( LightDirection, vNormal );
	vec4 E = normalize( cameraPos - vPosition );

	float specTerm = pow( min( 0.0f, dot( R, E ) ), iSpecPower );
	vec3 Specular = kS * iS * specTerm;

	fragColor = vec4(Ambient + Diffuse + Specular, 1);
}