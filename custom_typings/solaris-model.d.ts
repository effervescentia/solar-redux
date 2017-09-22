declare module 'solaris-model' {
  class SolarisModel {
    setTime(time: string): void;
    bodies: {
      sun: SolarisModel.Body;
      earth: SolarisModel.Body;
      venus: SolarisModel.Body;
      mercury: SolarisModel.Body;
      jupiter: SolarisModel.Body;
      mars: SolarisModel.Body;
      saturn: SolarisModel.Body;
      uranus: SolarisModel.Body;
      neptune: SolarisModel.Body;
      pluto: SolarisModel.Body;
      [key: string]: SolarisModel.Body;
    };
  }

  namespace SolarisModel {
    export interface Body {
      radius: number;
      position: [number, number];
      getOrbitPath(): [number, number][];
    }
  }

  const solarisModel: SolarisModel;
  export default SolarisModel;
}
