"use client";

import { useState } from "react";
import {
    Box, Flex, IconButton, Input, Tag, TagCloseButton, TagLabel, Wrap, WrapItem,
} from "@chakra-ui/react";
import { AddIcon, LinkIcon } from "@chakra-ui/icons";

/**
 * Add-a-person input: a name plus an optional profile/portfolio link.
 * Stores/emits an array of {name, url} objects. Pressing Enter in either
 * field (or clicking the add button) adds a chip and clears both inputs.
 */
export default function ContributorsInput({
    value,
    onChange,
    namePlaceholder = "Name",
    urlPlaceholder = "Profile link (optional)",
}) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const entries = value || [];

    const handleAdd = () => {
        const trimmedName = name.trim();
        if (!trimmedName) return;
        const trimmedUrl = url.trim();
        onChange([...entries, { name: trimmedName, url: trimmedUrl || null }]);
        setName("");
        setUrl("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleRemove = (idx) => {
        onChange(entries.filter((_, i) => i !== idx));
    };

    return (
        <Box>
            <Flex gap={2} mb={2}>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={namePlaceholder}
                />
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={urlPlaceholder}
                />
                <IconButton
                    aria-label="Add"
                    icon={<AddIcon boxSize={3} />}
                    onClick={handleAdd}
                    isDisabled={!name.trim()}
                />
            </Flex>
            {entries.length > 0 && (
                <Wrap spacing={2}>
                    {entries.map((entry, idx) => (
                        <WrapItem key={`${entry.name}-${idx}`}>
                            <Tag size="md" borderRadius="full" variant="subtle" colorScheme="gray" px={3} py={1}>
                                <TagLabel>{entry.name}</TagLabel>
                                {entry.url && <LinkIcon boxSize={2.5} ml={1.5} />}
                                <TagCloseButton onClick={() => handleRemove(idx)} />
                            </Tag>
                        </WrapItem>
                    ))}
                </Wrap>
            )}
        </Box>
    );
}
