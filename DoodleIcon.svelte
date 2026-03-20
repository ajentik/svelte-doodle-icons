<script lang="ts">
  import { iconData } from './packages/core/src/icon-data.js';

  interface Props {
    name: string;
    size?: string | number;
    spin?: boolean;
    pulse?: boolean;
    bounce?: boolean;
    flipHorizontal?: boolean;
    flipVertical?: boolean;
    variant?: string;
    animation?: string;
    class?: string;
    [key: string]: unknown;
  }

  const sizeMap: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

  let { name, size = 'md', spin = false, pulse = false, bounce = false, flipHorizontal = false, flipVertical = false, variant, animation, class: className = '', ...rest }: Props = $props();

  const icon = $derived(iconData[name]);
  const pixelSize = $derived(typeof size === 'number' ? size : (sizeMap[size] ?? 24));

  const transforms = $derived([
    flipHorizontal ? 'scaleX(-1)' : '',
    flipVertical ? 'scaleY(-1)' : ''
  ].filter(Boolean).join(' ') || undefined);

  const animClass = $derived([
    spin ? 'doo-iconik-spin' : '',
    pulse ? 'doo-iconik-pulse' : '',
    bounce ? 'doo-iconik-bounce' : '',
    animation ? `doo-iconik-${animation}` : ''
  ].filter(Boolean).join(' '));

  const variantClass = $derived(variant && variant !== 'default' ? `doo-iconik-${variant}` : '');
  const combinedClass = $derived([variantClass, animClass, className].filter(Boolean).join(' '));
</script>

{#if icon}
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox={icon.viewBox}
  width={pixelSize}
  height={pixelSize}
  fill={icon.stroke ? 'none' : 'currentColor'}
  stroke={icon.stroke ? 'currentColor' : undefined}
  stroke-width={icon.stroke ? 2 : undefined}
  stroke-linecap={icon.stroke ? 'round' : undefined}
  stroke-linejoin={icon.stroke ? 'round' : undefined}
  class="{combinedClass}"
  style:transform={transforms}
  aria-hidden="true"
  {...rest}
>
  {#each icon.paths as d}
    <path {d} />
  {/each}
  {#if icon.circles}
    {#each icon.circles as c}
      <circle cx={c.cx} cy={c.cy} r={c.r} />
    {/each}
  {/if}
  {#if icon.lines}
    {#each icon.lines as l}
      <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
    {/each}
  {/if}
</svg>
{/if}

<style>
  @keyframes doo-iconik-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes doo-iconik-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes doo-iconik-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25%); } }
  @keyframes doo-iconik-wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
  @keyframes doo-iconik-shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); } 20%, 40%, 60%, 80% { transform: translateX(2px); } }
  @keyframes doo-iconik-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes doo-iconik-heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); } }
  @keyframes doo-iconik-tada { 0% { transform: scale(1) rotate(0deg); } 10%, 20% { transform: scale(0.9) rotate(-3deg); } 30%, 50%, 70% { transform: scale(1.1) rotate(3deg); } 40%, 60% { transform: scale(1.1) rotate(-3deg); } 80%, 100% { transform: scale(1) rotate(0deg); } }
  @keyframes doo-iconik-rubber { from, to { transform: scale3d(1,1,1); } 30% { transform: scale3d(1.25,0.75,1); } 40% { transform: scale3d(0.75,1.25,1); } 50% { transform: scale3d(1.15,0.85,1); } 65% { transform: scale3d(0.95,1.05,1); } 75% { transform: scale3d(1.05,0.95,1); } }
  @keyframes doo-iconik-swing { 20% { transform: rotate3d(0,0,1,15deg); } 40% { transform: rotate3d(0,0,1,-10deg); } 60% { transform: rotate3d(0,0,1,5deg); } 80% { transform: rotate3d(0,0,1,-5deg); } 100% { transform: rotate3d(0,0,1,0deg); } }
  @keyframes doo-iconik-jello { 0%, 100% { transform: skewX(0deg) skewY(0deg); } 11.1% { transform: skewX(0deg) skewY(0deg); } 22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); } 33.3% { transform: skewX(6.25deg) skewY(6.25deg); } 44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); } 55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); } 66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); } 77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); } 88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); } }
  :global(.doo-iconik-spin) { animation: doo-iconik-spin 1s linear infinite; }
  :global(.doo-iconik-pulse) { animation: doo-iconik-pulse 2s ease-in-out infinite; }
  :global(.doo-iconik-bounce) { animation: doo-iconik-bounce 1s ease infinite; }
  :global(.doo-iconik-wiggle) { animation: doo-iconik-wiggle 1s ease infinite; }
  :global(.doo-iconik-shake) { animation: doo-iconik-shake 0.8s ease infinite; }
  :global(.doo-iconik-float) { animation: doo-iconik-float 3s ease-in-out infinite; }
  :global(.doo-iconik-heartbeat) { animation: doo-iconik-heartbeat 1.5s ease-in-out infinite; }
  :global(.doo-iconik-tada) { animation: doo-iconik-tada 1s ease infinite; }
  :global(.doo-iconik-rubber) { animation: doo-iconik-rubber 1s ease infinite; }
  :global(.doo-iconik-swing) { animation: doo-iconik-swing 1s ease infinite; transform-origin: top center; }
  :global(.doo-iconik-jello) { animation: doo-iconik-jello 1s ease infinite; }
  :global(.doo-iconik-glow) { filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor); }
  :global(.doo-iconik-neon) { filter: drop-shadow(0 0 2px currentColor) drop-shadow(0 0 4px currentColor) drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor); }
  :global(.doo-iconik-shadow) { filter: drop-shadow(2px 3px 3px rgba(0,0,0,0.25)); }
  :global(.doo-iconik-embossed) { filter: drop-shadow(1px 1px 0px rgba(0,0,0,0.3)) drop-shadow(-1px -1px 0px rgba(255,255,255,0.4)); }
  :global(.doo-iconik-glass) { opacity: 0.55; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.12)); }
  :global(.doo-iconik-outline) { fill: none !important; stroke: currentColor !important; stroke-width: 1.5 !important; }
  :global(.doo-iconik-retro) { filter: sepia(0.6) saturate(1.4) drop-shadow(1px 1px 0px rgba(0,0,0,0.2)); }
</style>
