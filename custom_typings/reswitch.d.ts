declare module 'reswitch' {
  interface Reswitch {
    <T, A extends { type: any }>(...args: (string | any)[]): (state: T, action: A) => T;
  }

  const reswitch: Reswitch;
  export default reswitch;
}
