declare module 'solaris-model' {
  class SolarisModel {
    setTime(time: string): void;
    bodies: {
      sun: any;
      earth: any;
      venus: any;
      mercury: any;
      jupiter: any;
      mars: any;
      saturn: any;
      uranus: any;
      neptune: any;
      pluto: any;
    };
  }

  const solarisModel: SolarisModel;
  export default SolarisModel;
}
