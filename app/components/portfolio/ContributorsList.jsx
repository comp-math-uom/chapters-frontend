import { Heading, Tag, TagLabel, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

/**
 * Render the contributors of a project / achievement as styled chips.
 * Accepts an array of plain strings (free-text names).
 */
export default function ContributorsList({ contributors, label = "Contributors" }) {
    if (!contributors || contributors.length === 0) return null;
    return (
        <div className="my-8">
            <Heading as="h6" size="xs" mb={3}>
                {label}:
            </Heading>
            <Wrap spacing={2}>
                {contributors.map((name, idx) => (
                    <WrapItem key={`${name}-${idx}`}>
                        <Tag
                            size="md"
                            borderRadius="full"
                            variant="subtle"
                            colorScheme="gray"
                            px={3}
                            py={1}
                        >
                            <TagLabel>{name}</TagLabel>
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>
        </div>
    );
}
