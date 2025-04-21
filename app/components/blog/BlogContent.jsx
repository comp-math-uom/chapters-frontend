import { Box, VStack } from '@chakra-ui/react';

export default function BlogContent({blog}) {
    return (
        <Box width="full" marginTop={-6} px={20}>
            <VStack spacing={8} align="left">
                <Box
                    sx={{
                        // Headings
                        h1: {fontSize: "4xl", fontWeight: "bold", mb: 4},
                        h2: {fontSize: "3xl", fontWeight: "bold", mb: 4},
                        h3: {fontSize: "2xl", fontWeight: "semibold", mb: 3},
                        h4: {fontSize: "xl", fontWeight: "semibold", mb: 2},
                        h5: {fontSize: "lg", fontWeight: "medium", mb: 1},
                        h6: {fontSize: "md", fontWeight: "medium", mb: 1},

                        // Paragraphs
                        p: {fontSize: "md", lineHeight: "tall", mb: 4},

                        // Unordered & Ordered Lists
                        ul: {
                            pl: 8,
                            mb: 4,
                            listStyleType: "disc",
                        },
                        ol: {
                            pl: 8,
                            mb: 4,
                            listStyleType: "decimal",
                        },
                        li: {
                            mb: 2,
                            fontSize: "md",
                            lineHeight: "tall",
                        },

                        // Inline Code Block
                        code: {
                            bg: "gray.200",
                            px: 2,
                            py: 1,
                            fontSize: "sm",
                            borderRadius: "md",
                            fontFamily: "monospace",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                        },

                        // Block Code with Pre
                        pre: {
                            bg: "gray.100",
                            p: 4,
                            fontSize: "md",
                            fontFamily: "monospace",
                            rounded: "lg",
                            overflowX: "auto",
                            border: "1px solid",
                            borderColor: "gray.200",
                            boxShadow: "sm",
                        },

                        // Horizontal Rule
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
