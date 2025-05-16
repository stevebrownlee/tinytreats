import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '../assets/radix-theme.css';

// Custom theme configuration based on TinyTreats' existing color scheme
const themeConfig = {
  accentColor: 'pink',
  grayColor: 'slate',
  panelBackground: 'solid',
  scaling: '100%',
  radius: 'medium',
};

function ThemeProvider({ children }) {
  return (
    <Theme {...themeConfig}>
      {children}
    </Theme>
  );
}

export default ThemeProvider;