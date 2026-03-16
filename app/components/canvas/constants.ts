import type { PixelBlastVariant } from './types'

export const SHAPE_MAP: Record<PixelBlastVariant, number> = {
  square: 0,
  circle: 1,
  triangle: 2,
  diamond: 3,
}

export const VERTEX_SRC = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

export const FRAGMENT_SRC = `
  precision highp float;

  uniform vec3  uPrimaryColor;
  uniform vec3  uSecondaryColor;
  uniform float uSecondaryColorRatio;
  uniform vec2  uResolution;
  uniform float uTime;
  uniform float uPixelSize;
  uniform float uScale;
  uniform float uDensity;
  uniform float uPixelJitter;
  uniform float uEdgeFade;
  uniform int   uShapeType;
  uniform vec2  uBurstCenter;
  uniform float uBurstAttack;
  uniform float uBurstAttackProgress;
  uniform float uBurstStabilize;

  const int SHAPE_SQUARE   = 0;
  const int SHAPE_CIRCLE   = 1;
  const int SHAPE_TRIANGLE = 2;
  const int SHAPE_DIAMOND  = 3;

  out vec4 fragColor;

  float Bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2.0 + a.y * a.y * 0.75);
  }
  #define Bayer4(a) (Bayer2(0.5 * (a)) * 0.25 + Bayer2(a))
  #define Bayer8(a) (Bayer4(0.5 * (a)) * 0.25 + Bayer2(a))

  #define FBM_OCTAVES     5
  #define FBM_LACUNARITY  1.25
  #define FBM_GAIN        1.0

  float hash11(float n) {
    return fract(sin(n) * 43758.5453);
  }

  float vnoise(vec3 p) {
    vec3 ip = floor(p);
    vec3 fp = fract(p);
    float n000 = hash11(dot(ip + vec3(0.0, 0.0, 0.0), vec3(1.0, 57.0, 113.0)));
    float n100 = hash11(dot(ip + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, 113.0)));
    float n010 = hash11(dot(ip + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
    float n110 = hash11(dot(ip + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
    float n001 = hash11(dot(ip + vec3(0.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0)));
    float n101 = hash11(dot(ip + vec3(1.0, 0.0, 1.0), vec3(1.0, 57.0, 113.0)));
    float n011 = hash11(dot(ip + vec3(0.0, 1.0, 1.0), vec3(1.0, 57.0, 113.0)));
    float n111 = hash11(dot(ip + vec3(1.0, 1.0, 1.0), vec3(1.0, 57.0, 113.0)));
    vec3 w = fp * fp * fp * (fp * (fp * 6.0 - 15.0) + 10.0);
    float x00 = mix(n000, n100, w.x);
    float x10 = mix(n010, n110, w.x);
    float x01 = mix(n001, n101, w.x);
    float x11 = mix(n011, n111, w.x);
    float y0 = mix(x00, x10, w.y);
    float y1 = mix(x01, x11, w.y);
    return mix(y0, y1, w.z) * 2.0 - 1.0;
  }

  float fbm2(vec2 uv, float t) {
    vec3 p = vec3(uv * uScale, t);
    float amp = 1.0;
    float freq = 1.0;
    float sum = 1.0;
    for (int i = 0; i < FBM_OCTAVES; ++i) {
      sum += amp * vnoise(p * freq);
      freq *= FBM_LACUNARITY;
      amp *= FBM_GAIN;
    }
    return sum * 0.5 + 0.5;
  }

  float maskCircle(vec2 p, float cov) {
    float r = sqrt(cov) * 0.25;
    float d = length(p - 0.5) - r;
    float aa = 0.5 * fwidth(d);
    return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
  }

  float maskTriangle(vec2 p, vec2 id, float cov) {
    bool flip = mod(id.x + id.y, 2.0) > 0.5;
    if (flip) p.x = 1.0 - p.x;
    float r = sqrt(cov);
    float d = p.y - r * (1.0 - p.x);
    float aa = fwidth(d);
    return cov * clamp(0.5 - d / aa, 0.0, 1.0);
  }

  float maskDiamond(vec2 p, float cov) {
    float r = sqrt(cov) * 0.564;
    return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
  }

  void main() {
    float pixelSize = uPixelSize;
    vec2 fragCoord = gl_FragCoord.xy - uResolution * 0.5;
    float aspectRatio = uResolution.x / uResolution.y;
    vec2 screenUv = gl_FragCoord.xy / uResolution;
    vec2 aspectVec = vec2(aspectRatio, 1.0);

    vec2 pixelId = floor(fragCoord / pixelSize);
    vec2 pixelUV = fract(fragCoord / pixelSize);

    float cellPixelSize = 8.0 * pixelSize;
    vec2 cellId = floor(fragCoord / cellPixelSize);
    vec2 cellCoord = cellId * cellPixelSize;
    vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

    float base = fbm2(uv, uTime * 0.045);
    base = base * 0.55 - 0.62;
    float feed = base + (uDensity - 0.5) * 0.25;

    float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
    float bw = step(0.5, feed + bayer);

    float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
    float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
    float coverage = bw * jitterScale;

    float mask;
    if      (uShapeType == SHAPE_CIRCLE)   mask = maskCircle(pixelUV, coverage);
    else if (uShapeType == SHAPE_TRIANGLE) mask = maskTriangle(pixelUV, pixelId, coverage);
    else if (uShapeType == SHAPE_DIAMOND)  mask = maskDiamond(pixelUV, coverage);
    else                                   mask = coverage;

    if (uEdgeFade > 0.0) {
      vec2 norm = gl_FragCoord.xy / uResolution;
      float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
      float fade = smoothstep(0.0, uEdgeFade, edge);
      mask *= fade;
    }

    float secondarySeed = fract(sin(dot(cellId, vec2(41.0, 289.0))) * 43758.5453);
    float threatNoise = fbm2(uv * 1.65 + vec2(4.2, -7.1), uTime * 0.03 + 11.0);
    float secondaryBias = smoothstep(0.68, 0.9, threatNoise) * 0.08;
    float localSecondaryRatio = clamp(uSecondaryColorRatio + secondaryBias, 0.01, 0.22);

    vec2 burstDelta = (screenUv - uBurstCenter) * aspectVec;
    vec2 burstWarp = vec2(
      fbm2(burstDelta * 5.4 + vec2(4.6, -2.2), uTime * 0.08 + 7.0),
      fbm2(burstDelta.yx * 5.0 + vec2(-3.8, 5.4), uTime * 0.09 + 13.0)
    ) - 0.5;
    vec2 burstShape = burstDelta + burstWarp * 0.08;
    float burstWindowX = 1.0 - smoothstep(0.14, 0.32, abs(burstShape.x));
    float burstWindowY = 1.0 - smoothstep(0.1, 0.24, abs(burstShape.y));
    float burstWindow = burstWindowX * burstWindowY;
    float burstNoise = fbm2(burstShape * 10.0 + vec2(6.4, -3.1), uTime * 0.12 + 21.0);
    float burstCells = smoothstep(
      0.48,
      0.84,
      burstNoise + burstWindow * 0.32 + uBurstAttackProgress * 0.18
    );
    float attackField = burstWindow * burstCells * uBurstAttack;

    float stabilizeTexture = smoothstep(0.42, 0.88, burstNoise + burstWindow * 0.28);
    float stabilizeField = burstWindow * stabilizeTexture * uBurstStabilize;

    localSecondaryRatio = clamp(localSecondaryRatio + attackField * 0.92, 0.0, 1.0);
    localSecondaryRatio *= (1.0 - stabilizeField * 0.96);

    float secondaryMix = step(1.0 - localSecondaryRatio, secondarySeed);
    vec3 color = mix(uPrimaryColor, uSecondaryColor, secondaryMix);

    vec3 srgbColor = mix(
      color * 12.92,
      1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
      step(0.0031308, color)
    );

    fragColor = vec4(srgbColor, mask);
  }
`
