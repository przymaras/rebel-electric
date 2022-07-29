import type { FunctionComponent } from 'react';

export type SvgComponentType = FunctionComponent<{
  height?: number;
  width?: number;
  title?: string;
}>;
