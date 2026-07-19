import { extendTheme } from "@chakra-ui/react";

// Mirrors the token values in tailwind.config.js so Chakra-driven UI
// (menus, drawers, modals, forms) visually matches the Tailwind-styled
// sections instead of falling back to Chakra's own default palette/fonts.
const theme = extendTheme({
    fonts: {
        heading: "var(--font-poppins), system-ui, sans-serif",
        body: "var(--font-inter), system-ui, sans-serif",
    },
    colors: {
        primary: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
            950: "#172554",
        },
        // Chakra's default theme has no "slate" scale (only "gray") - without
        // this, every slate.* prop used across the app resolves to invalid
        // CSS and silently falls back to black/currentColor borders and
        // transparent button backgrounds. Mirrors Tailwind's slate exactly.
        slate: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
            950: "#020617",
        },
    },
    radii: {
        md: "0.5rem",
        lg: "0.75rem",
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
    },
    shadows: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.12)",
        "card-hover": "0 4px 10px rgba(15, 23, 42, 0.06), 0 20px 40px -12px rgba(15, 23, 42, 0.20)",
    },
    styles: {
        global: {
            body: {
                color: "slate.800",
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: "600",
                borderRadius: "lg",
            },
            defaultProps: {
                colorScheme: "primary",
            },
        },
        Menu: {
            baseStyle: {
                list: {
                    borderRadius: "xl",
                    boxShadow: "card-hover",
                    border: "1px solid",
                    borderColor: "slate.100",
                    py: 2,
                },
                item: {
                    borderRadius: "md",
                    mx: 1,
                    w: "calc(100% - 8px)",
                    _hover: { bg: "slate.50" },
                    _focus: { bg: "slate.50" },
                },
            },
        },
        Drawer: {
            baseStyle: {
                dialog: {
                    borderLeftRadius: "xl",
                },
            },
        },
        Input: {
            defaultProps: {
                focusBorderColor: "primary.500",
            },
        },
        Textarea: {
            defaultProps: {
                focusBorderColor: "primary.500",
            },
        },
        Select: {
            defaultProps: {
                focusBorderColor: "primary.500",
            },
        },
        Modal: {
            baseStyle: {
                dialog: {
                    borderRadius: "xl",
                },
            },
        },
        Avatar: {
            baseStyle: {
                container: {
                    borderWidth: "2px",
                    borderColor: "white",
                    boxShadow: "0 0 0 1px rgba(15, 23, 42, 0.08)",
                },
            },
        },
    },
});

export default theme;
