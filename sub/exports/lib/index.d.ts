
declare module 'demo-module' {
  const DEMO: DEMO;
  export = DEMO;
}

interface DEMO {
  Hub: { name: string, hehe(): Promise<void> },
  Core: { name: string },
  Decline: { name: string },
  Inner: { name: string },
}