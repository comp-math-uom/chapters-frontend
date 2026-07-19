import { Heading, Link, Tag, TagLabel, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

/**
 * Render the contributors of a project / achievement as styled chips.
 * Accepts an array of {name, url} entries (url is optional). A name with a
 * url is a real, clickable link that opens in a new tab; a name without one
 * is plain text.
 */
export default function ContributorsList({ contributors, label = "Contributors" }) {
    if (!contributors || contributors.length === 0) return null;
    return (
        <div className="my-6">
            <Heading as="h6" size="xs" mb={3} color="slate.500" letterSpacing="wider" textTransform="uppercase">
                {label}
            </Heading>
            <Wrap spacing={2}>
                {contributors.map((entry, idx) => {
                    const name = typeof entry === "string" ? entry : entry?.name;
                    const url = typeof entry === "string" ? null : entry?.url;
                    return (
                        <WrapItem key={`${name}-${idx}`}>
                            <Tag
                                size="md"
                                borderRadius="full"
                                variant="subtle"
                                colorScheme="slate"
                                px={3}
                                py={1}
                            >
                                {url ? (
                                    <TagLabel>
                                        <Link
                                            href={url}
                                            isExternal
                                            color="primary.600"
                                            textDecoration="underline"
                                            _hover={{ color: "primary.700" }}
                                        >
                                            {name}
                                        </Link>
                                    </TagLabel>
                                ) : (
                                    <TagLabel>{name}</TagLabel>
                                )}
                            </Tag>
                        </WrapItem>
                    );
                })}
            </Wrap>
        </div>
    );
}
