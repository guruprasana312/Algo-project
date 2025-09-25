// Indian-inspired color palette with high contrast
export const theme = {
  colors: {
    // Primary - Saffron inspired
    primary: '#FF6B35',
    primaryDark: '#E55A2B',
    primaryLight: '#FF8A65',
    
    // Secondary - Deep Blue
    secondary: '#1565C0',
    secondaryDark: '#0D47A1',
    secondaryLight: '#42A5F5',
    
    // Accent - Emerald Green
    accent: '#00C853',
    accentDark: '#00A843',
    accentLight: '#69F0AE',
    
    // Neutrals with high contrast
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceDark: '#F5F5F5',
    
    // Text colors for accessibility
    textPrimary: '#212121',
    textSecondary: '#757575',
    textLight: '#FFFFFF',
    
    // Status colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Indian festival colors
    festival: {
      holi: '#E91E63',
      diwali: '#FFC107',
      navratri: '#9C27B0'
    },
    
    // Gradients
    gradients: {
      primary: 'linear-gradient(135deg, #FF6B35 0%, #F44336 100%)',
      secondary: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
      success: 'linear-gradient(135deg, #00C853 0%, #4CAF50 100%)'
    }
  },
  
  typography: {
    fontFamily: {
      primary: "'Inter', 'Noto Sans', sans-serif",
      hindi: "'Noto Sans Devanagari', sans-serif",
      display: "'Poppins', sans-serif"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};