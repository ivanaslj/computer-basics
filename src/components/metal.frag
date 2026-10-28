// Liquid metal: domain-warped noise makes a height field, lit like polished chrome.
// GLSL ES 1.0 (WebGL 1). Normals come from screen-space derivatives.
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec2 uRes;      // canvas size in pixels
uniform float uTime;    // seconds
uniform float uSpeed;   // flow speed
uniform float uFade;    // 0..1 fade-in from the base color
uniform vec3 uBase, uDeep, uMetal, uHigh, uRim;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

// Two layers of domain warping give the slow, folding "liquid" shapes.
float heightField(vec2 p, float t) {
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.6)), fbm(p + vec2(5.2, 1.3) - t * 0.45));
  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 0.35),
                fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.3));
  return fbm(p + 2.8 * r);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * uSpeed;
  float h = heightField(p * 0.62, t);   // smaller number = bigger, heavier shapes

  // Surface normal from how fast the height changes per pixel. The factor sets how sharp folds look.
  float k = uRes.y * 0.22;
  vec3 n = normalize(vec3(-dFdx(h) * k, -dFdy(h) * k, 1.0));

  vec3 light = normalize(vec3(-0.45, 0.6, 0.65));
  vec3 r = reflect(vec3(0.0, 0.0, -1.0), n);

  // Chrome: a fake environment that is bright above and dark below, plus sharp highlights.
  float env = smoothstep(-0.15, 0.85, r.y);
  float diffuse = max(dot(n, light), 0.0);
  float spec = pow(max(dot(r, light), 0.0), 56.0);
  float spec2 = pow(max(dot(r, normalize(vec3(0.7, -0.25, 0.7))), 0.0), 110.0);
  float rim = pow(1.0 - n.z, 3.0);  // steep folds get a thin bright edge

  vec3 col = mix(uBase, uDeep, smoothstep(0.2, 0.8, h));
  col = mix(col, uMetal, env * 0.6 * diffuse + 0.12 * env);
  col += uHigh * (spec * 0.85 + spec2 * 0.3);
  col += uRim * rim * 0.65;

  // Readability: vignette toward the edges and an overall darken.
  float vig = smoothstep(1.2, 0.2, length((uv - 0.5) * vec2(1.2, 1.0)));
  col *= mix(0.4, 1.0, vig) * 0.85;

  gl_FragColor = vec4(mix(uBase, col, uFade), 1.0);
}
