import { Avatar, Flex, Heading, Tooltip, VStack } from "@chakra-ui/react";
import React from "react";

export default function ContributorsList({contributors}) {
    return (
        <VStack align="left" className="my-10">
            <Heading as="h6" size="xs">
                Contributors:
            </Heading>
            <Flex
                gap={{ base: 3, md: 7 }}
                width={{ base: "100%", md: "calc(70vw / 2)" }}
                overflowX="auto"
                className="scrollable-container"
                py={1}
            >
                {contributors && contributors.map((c, index) => (
                    <Tooltip key={index} borderRadius="md" label={c.label}>
                        <Avatar
                            name={c.label}
                            src={c.image}
                            size={{ base: "sm", md: "md" }}
                        />
                    </Tooltip>
                ))}
            </Flex>
        </VStack>
    );
};