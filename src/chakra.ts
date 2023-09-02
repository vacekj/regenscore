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

	components: {
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
					fontFamily: 'Remixa-Semibold',
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
			},
		},
	},
});
