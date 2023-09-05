import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      deepGreen: {
        400: '#354728',
      },
      greenLeaf: {
        400: '#01966B',
      },
      limeGreen: {
        400: '#C2ECBF',
      },
      primaryOrange: {
        300: '#FFC555',
        200: '#F5B333',
        100: '#F9DD94',
      },
      backgroundOrange: {
        400: '#F2EFE5',
      },
      beige: {
        400: 'rgba(248, 246, 240,1)',
      },
    },
  },

  breakpoints: {
    base: '375px', //mobile
    sm: '768px', //760-1023px
    md: '1024px', //1024-1279px
    lg: '1280px', //1280-1439px
    xl: '1440px', //1440 and more
  },

  components: {
    Tooltip: {
      baseStyle: {
        placement: 'top-end',
        bgColor: 'brand.deepGreen.400',
        p: 4,
      },
    },
    Button: {
      baseStyle: {
        fontSize: '16px',
        fontFamily: 'Inter-Black',
        textTransform: 'uppercase',
        backgroundColor: 'brand.primaryOrange.200',
        _hover: {
          backgroundColor: '#D2900F',
        },
        _disabled: {
          backgroundColor: 'brand.primaryOrange.100',
          cursor: 'not-allowed',
        },
      },
      variants: {
        brand: {
          // Default
          borderRadius: '0.25rem', // border radius 4px
        },
        variant1: {
          // Metamask
          width: '249px',
          height: '64px',
          minWidth: '192px',
          color: 'brand.deepGreen.400',
          px: '2rem',
          borderRadius: '6.25rem', // border radius 100px
        },
        variant2: {
          // WalletConnect
          backgroundColor: '#F6851B',
          _hover: {
            backgroundColor: '#BF5D00',
          },
          _disabled: {
            backgroundColor: 'brand.primaryOrange.100',
            cursor: 'not-allowed',
          },
        },
        variant3: {
          // Mint Now
          fontSize: '14px',
          minWidth: '134.75px',
          height: '45.46px',
          backgroundColor: '#FFF',
          color: 'brand.deepGreen.400',
          fontFamily: 'Inter-Bold',
          borderRadius: '81.175px',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.10)',
          _hover: {
            backgroundColor: '#FFF',
          },
        },
      },
      defaultProps: {
        size: 'lg',
        variant: 'brand',
        colorScheme: '',
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'Remixa-Medium',
        fontWeight: '500',
        lineHeight: '106px',
      },
      variants: {
        h1: {
          fontSize: '92px',
        },
        h2: {
          fontSize: '48px',
          fontFamily: 'Remixa-Medium',
        },
        h3: {
          fontSize: '24px',
          fontFamily: 'Remixa-Bold',
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 'normal',
        cursor: 'default',
      },
      variants: {
        large: {
          fontSize: '24px',
        },
        xLarge: {
          fontSize: '44px',
          fontWeigth: '300',
          lineHeight: '57px',
        },
        bold: {
          fontFamily: 'Inter-Bold',
          fontWeight: 'bold',
        },
        link: {
          cursor: 'pointer',
          _hover: {
            color: 'brand.primaryOrange.200',
          },
        },
        boldLink: {
          fontWeight: 'bold',
          cursor: 'pointer',
          _hover: {
            color: 'brand.primaryOrange.200',
          },
        },
        largeBold: {
          fontSize: '24px',
          fontWeight: 'bold',
        },
        contributor: {
          fontFamily: 'Inter-Regular',
          fontSize: '16px',
          fontWeight: '700',
          color: 'brand.greenLeaf.400',
        },
        governance: {
          fontFamily: 'Inter-Regular',
          fontSize: '16px',
          fontWeight: '700',
          color: '#014E96',
        },
        outreach: {
          fontFamily: 'Inter-Regular',
          fontSize: '16px',
          fontWeight: '700',
          color: 'brand.primaryOrange.200',
        },
        security: {
          fontFamily: 'Inter-Regular',
          fontSize: '16px',
          fontWeight: '700',
          color: '#8B4242',
        },
        utilization: {
          fontFamily: 'Inter-Regular',
          fontSize: '16px',
          fontWeight: '700',
          color: '#463E5C',
        },
      },
    },
  },
});
