import { Box, VStack } from '@chakra-ui/react';

export default function BlogContent({blog}) {
    return (
        <Box width="full" marginTop={-6} px={[4, 8, 12, 20]}>
            <VStack spacing={8} align="left">
                <Box
                    sx={{
                        // Headings
                        h1: {fontSize: ["2xl", "3xl", "4xl"], fontWeight: "bold", mb: 4},
                        h2: {fontSize: ["xl", "2xl", "3xl"], fontWeight: "bold", mb: 4},
                        h3: {fontSize: ["lg", "xl", "2xl"], fontWeight: "semibold", mb: 3},
                        h4: {fontSize: ["md", "lg", "xl"], fontWeight: "semibold", mb: 2},
                        h5: {fontSize: ["sm", "md", "lg"], fontWeight: "medium", mb: 1},
                        h6: {fontSize: ["xs", "sm", "md"], fontWeight: "medium", mb: 1},

                        // Paragraphs
                        p: {fontSize: ["sm", "md"], lineHeight: "tall", mb: 4},

                        // Lists
                        ul: {
                            pl: [4, 6, 8],
                            mb: 4,
                            listStyleType: "disc",
                        },
                        ol: {
                            pl: [4, 6, 8],
                            mb: 4,
                            listStyleType: "decimal",
                        },
                        li: {
                            mb: 2,
                            fontSize: ["sm", "md"],
                            lineHeight: "tall",
                        },

                        // Code styles remain the same but with responsive padding
                        code: {
                            bg: "gray.200",
                            px: [1, 2],
                            py: 1,
                            fontSize: ["xs", "sm"],
                            borderRadius: "md",
                            fontFamily: "monospace",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                        },

                        pre: {
                            bg: "gray.100",
                            p: [2, 3, 4],
                            fontSize: ["sm", "md"],
                            fontFamily: "monospace",
                            rounded: "lg",
                            overflowX: "auto",
                            border: "1px solid",
                            borderColor: "gray.200",
                            boxShadow: "sm",
                        },

                        hr: {
                            border: "1px solid",
                            borderColor: "gray.200",
                            my: 4,
                        },
                    }}
                    dangerouslySetInnerHTML={{__html: blog.content}}
                />
            </VStack>
        </Box>
    );
}
