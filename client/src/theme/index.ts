import { DeepPartial, extendTheme, ThemeConfig, Theme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

// https://chakra-ui.com/docs/styled-system/color-mode
const config: ThemeConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: true,
};

export const colors = {
	deepNavy: '#0D1B2A',
	navy: '#1B263B',
	greyBlue: '#415A77',
	lightGreyBlue: '#778DA9',
	paperGrey: '#E0E1DD',
	red: '#bf0a30',
	warning: '#ffd700',
};

export const theme = extendTheme({
	config,
	components: {
		// Button: {
		// 	variants: {
		// 		cta: (props: GlobalStyleProps) => ({
		// 			...theme.components.Button.variants.outline(props),
		// 			bg: colors.green,
		// 			color: colors.white,
		// 			_hover: {
		// 				bg: colors.green,
		// 			},
		// 		}),
		// 		outline: (props: GlobalStyleProps) => ({
		// 			borderWidth: 2,
		// 		}),
		// 	},
		// },
	},
	styles: {
		global: (props) => ({
			body: {
				color: mode(colors.deepNavy, colors.paperGrey)(props),
				backgroundColor: mode(colors.paperGrey, colors.navy)(props),
			},
			'::-webkit-scrollbar': { display: 'none' },
			'#hubspot-messages-iframe-container': {
				colorScheme: 'auto',
			},
		}),
	},
	colors,
} as DeepPartial<Theme>);
