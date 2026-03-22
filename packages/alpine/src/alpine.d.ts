declare module 'alpinejs' {
  export interface Alpine {
    directive(
      name: string,
      callback: (
        el: HTMLElement,
        directive: { expression: string; modifiers: string[] },
        utilities: { evaluate: (expression: string) => unknown },
      ) => void,
    ): void;
    magic(name: string, callback: (el: HTMLElement) => unknown): void;
  }

  const alpine: Alpine;
  export default alpine;
}
