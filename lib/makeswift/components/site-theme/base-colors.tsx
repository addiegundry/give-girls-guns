import { themeToCssVars } from './to-css';

export const colors = {
  primary: '178 49% 25%',
  accent: '278 50% 88%',
  background: '276 60% 98%',
  foreground: '178 49% 20%',
  success: '116 78% 65%',
  error: '0 100% 60%',
  warning: '40 100% 60%',
  info: '220 70% 45%',
  contrast: {
    100: '0 0% 93%',
    200: '0 0% 82%',
    300: '0 0% 70%',
    400: '0 0% 54%',
    500: '0 0% 34%',
  },
  primaryMix: {
    white: {
      75: '178 20% 94%',
    },
    black: {
      75: '178 49% 18%',
    },
  },
};

export const BaseColors = () => (
  <style data-makeswift="theme-base-colors">{`:root {
      ${themeToCssVars(colors).join('\n')}
    }
  `}</style>
);
