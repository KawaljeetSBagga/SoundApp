import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

type ScreenDimensions = 'height' | 'width';

export function calculatePixel(type: ScreenDimensions, pixel: number) {
  let pixelData =
    type === 'height' ? (pixel * height) / 780 : (pixel * width) / 360;
  pixelData = Math.floor(pixelData);
  return pixelData + 'px';
}

export function calculatePixelNumber(type: ScreenDimensions, pixel: number) {
  let pixelData =
    type === 'height' ? (pixel * height) / 780 : (pixel * width) / 360;
  pixelData = Math.floor(pixelData);
  return pixelData;
}
