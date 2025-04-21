import { Avatar, Flex, Heading, Tooltip, VStack } from "@chakra-ui/react";
import React from "react";

export default function ContributorsList({contributors}) {
    return (
        <VStack align="left" className="my-10">
            <Heading as="h6" size="xs">
                Contributors:
            </Heading>
            <Flex
                gap={7}
                style={{width: "calc(70vw / 2)"}}
                overflowX="auto"
                className="scrollable-container"
            >
                {contributors && contributors.map((c, index) => {
                    console.log(c);
                    return (<Tooltip key={index} borderRadius="md" label={c.label}>
                        <Avatar name={c.label} src={c.image}/>
                    </Tooltip>)
                })}
            </Flex>
        </VStack>
    );
};