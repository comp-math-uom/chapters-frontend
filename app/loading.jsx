import { Container, Flex } from "@chakra-ui/react";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

export default function Loading() {
    return (
        <Flex
            h="calc(100vh - 484px)"
            alignItems="center"
            justifyContent="center"
            direction="column"
        >
            <Container>
                <LoadingSpinner/>
            </Container>
        </Flex>
    );
}