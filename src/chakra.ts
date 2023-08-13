import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      "deepGreen": {
        400: "#354728",
      },
      "greenLeaf": {
        400: "#01966B",
      },
      "limeGreen": {
        400: "#C2ECBF",
      },
      "primaryOrange": {
        200: "#F5B333",
        100: "##F9DD94",
      },
      "backgroundOrange": {
        400: "#F2EFE5",
      },
    },
  },

  components: {
    Button: {
      baseStyle: {
        fontSize: "14px",
        fontWeight: "bold",
        textTransform: "uppercase",
        backgroundColor: "brand.primaryOrange.200",
        _hover: {
          backgroundColor: "#D2900F",
        },
        _disabled: {
          backgroundColor: "brand.primaryOrange.100",
          cursor: "not-allowed",
        },
      },
      variants: {
        brand: { // Default
          borderRadius: "0.25rem", // border radius 4px
        },
        variant1: { // Metamask
          borderRadius: "6.25rem", // border rarius 100px
        },
        variant2: { // WalletConnect
          backgroundColor: "#F6851B",
          _hover: {
            backgroundColor: "#BF5D00",
          },
          _disabled: {
            backgroundColor: "brand.primaryOrange.100",
            cursor: "not-allowed",
          },
        },
      },
      defaultProps: {
        size: "lg",
        variant: "brand",
        colorScheme: "",
      },
    },
    Heading: {
      baseStyle: { fontFamily: "Remixa-Bold" },
      variants: {
        h1: {
          fontSize: "88px",
        },
        h2: {
          fontSize: "48px",
        },
        h3: {
          fontSize: "24px",
        },
      },
    },
  },
});
