import {Container, Flex, Spinner, Text} from "@chakra-ui/react";
import LoadingSpinner from "@/app/components/portfolio/LoadingSpinner";

export default function Loading() {
    return (
        <Flex
            h="calc(100vh - 484px)"
            alignItems="center"
            justifyContent="center"
            direction="column"
        >
            <Container>
                <LoadingSpinner />
            </Container>
        </Flex>
    );
}