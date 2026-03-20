// Type definitions for svelte-doodle-icons compatibility
import type { SvelteComponent } from 'svelte';

export type DoodleIconName = string;
export type DoodleIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type DoodleIconCategory = string;

export interface IconData {
  viewBox: string;
  paths: string[];
  circles?: { cx: number; cy: number; r: number }[];
  lines?: { x1: number; y1: number; x2: number; y2: number }[];
  stroke?: boolean;
}

export declare const iconData: Record<string, IconData>;
export declare const DoodleIcon: typeof SvelteComponent;
