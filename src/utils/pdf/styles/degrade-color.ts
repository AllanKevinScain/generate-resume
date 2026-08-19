import { rgb, type RGB } from 'pdf-lib';

type DegradeGenerateColorParamsType = {
  fromColor: RGB;
  toColor: RGB;
  t: number;
};

export function degradeGenerateColor(params: DegradeGenerateColorParamsType): RGB {
  const { fromColor, toColor, t } = params;
  const r = fromColor.red + (toColor.red - fromColor.red) * t;
  const g = fromColor.green + (toColor.green - fromColor.green) * t;
  const b = fromColor.blue + (toColor.blue - fromColor.blue) * t;

  return rgb(r, g, b);
}
