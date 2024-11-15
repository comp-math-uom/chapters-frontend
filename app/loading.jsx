import {Flex, Spinner, Text} from "@chakra-ui/react";

export default function Loading() {
    return (
        <Flex
            h="calc(100vh - 484px)"
            alignItems="center"
            justifyContent="center"
            direction="column"
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="black"
                size="xl"
                mb={5}
            />
            <Text>Please wait...</Text>
        </Flex>
    );
}