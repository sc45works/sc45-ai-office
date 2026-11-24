/**
 * SC45 AI Office: post-processing.
 *
 * Render -> bloom -> vignette -> output (tone mapping + sRGB).
 * The scene is rendered into a multisampled half-float target, so thin neon
 * lines stay smooth and colours brighter than white survive until the bloom.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

/**
 * Only the light strips and screens should glow. The threshold sits above the brightest
 * lit wood (about 0.3) and below the dimmest strip (about 0.45), so the floor and
 * furniture stay crisp.
 */
export const BLOOM = { threshold: 0.42, strength: 0.8, radius: 0.4 } as const;

const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uStrength: { value: 0.32 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uStrength;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float falloff = smoothstep(0.9, 0.3, length(vUv - 0.5));
      color.rgb *= mix(1.0 - uStrength, 1.0, falloff);
      gl_FragColor = color;
    }
  `,
};

export interface PostFX {
  bloom: UnrealBloomPass;
  render(): void;
  setSize(width: number, height: number, pixelRatio: number): void;
}

export function createPostFX(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera): PostFX {
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  // Smoothing costs in proportion to its sample count. A dense screen hides jagged edges by itself, so it gets half.
  const target = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: renderer.getPixelRatio() >= 1.5 ? 2 : 4 });
  const composer = new EffectComposer(renderer, target);

  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), BLOOM.strength, BLOOM.radius, BLOOM.threshold);

  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(bloom);
  composer.addPass(new ShaderPass(VignetteShader));
  composer.addPass(new OutputPass());

  return {
    bloom,
    render() {
      composer.render();
    },
    setSize(width, height, pixelRatio) {
      composer.setPixelRatio(pixelRatio);
      composer.setSize(width, height);
    },
  };
}
