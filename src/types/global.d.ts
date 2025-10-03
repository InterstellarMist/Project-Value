export {};

declare global {
  interface Window {
    androidBackCallback?: () => boolean;
  }
}
