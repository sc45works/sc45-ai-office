/**
 * SC45 AI Office: pixel texture.
 *
 * The office is built of blocks, and its surfaces are too: `pixelate` gives a lit material
 * a faint mottling in small cubes of world space, so a desk top or a lawn reads as
 * hand-placed pixels and not as flat colour. It is worked out in the shader from position
 * alone (no image files), lines up across neighbouring objects, and fades away with
 * distance, so the overview stays clean.
 */
import * as THREE from 'three';

/**
 * @param blocks   pixels per metre
 * @param strength how far a pixel's brightness may differ from its neighbours (0.1 = ten per cent)
 */
export function pixelate<T extends THREE.Material>(material: T, blocks = 6, strength = 0.12): T {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uPix = { value: new THREE.Vector2(blocks, strength) };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPixPos;')
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vec4 pixWorld = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          pixWorld = instanceMatrix * pixWorld;
        #endif
        vPixPos = (modelMatrix * pixWorld).xyz;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vPixPos;
        uniform vec2 uPix;
        float pixHash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }`,
      )
      .replace(
        '#include <map_fragment>',
        `#include <map_fragment>
        {
          // Nudged off the grid, so a face lying exactly on a cell boundary does not flicker between two cells.
          vec3 pixCell = floor(vPixPos * uPix.x + 0.013);
          // How many cells one screen pixel covers: past about one, the pattern would only shimmer.
          float pixDensity = max(fwidth(vPixPos.x), max(fwidth(vPixPos.y), fwidth(vPixPos.z))) * uPix.x;
          diffuseColor.rgb *= 1.0 + (pixHash(pixCell) - 0.5) * 2.0 * uPix.y * clamp(1.3 - pixDensity, 0.0, 1.0);
        }`,
      );
  };
  material.customProgramCacheKey = () => `pixelate:${blocks}:${strength}`;
  return material;
}
