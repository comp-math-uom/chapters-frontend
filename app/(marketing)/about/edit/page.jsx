"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box, Button, Container, FormControl, FormLabel, Heading, HStack, IconButton, Input,
    SimpleGrid, Stack, Text, Textarea, VStack,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "@/app/providers/Providers";
import aboutUsService from "@/app/lib/services/aboutUsService";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

export default function EditAboutUsPage() {
    const router = useRouter();
    const { auth, initialized } = useAuth();
    const [form, setForm] = useState({
        hero_title: "",
        hero_subtitle: "",
        body_markdown: "",
        cover_image: "",
        team: [],
        contact_email: "",
        contact_links: [],
    });
    const [linksInput, setLinksInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errOpen, setErrOpen] = useState(false);
    const [succOpen, setSuccOpen] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (!initialized) return;
        if (!auth?.authenticated) router.push('/auth/login');
        else if (auth.role !== 'admin') router.push('/about');
    }, [initialized, auth, router]);

    useEffect(() => {
        (async () => {
            const data = await aboutUsService.get();
            if (data) {
                setForm({
                    hero_title: data.hero_title || "",
                    hero_subtitle: data.hero_subtitle || "",
                    body_markdown: data.body_markdown || "",
                    cover_image: data.cover_image || "",
                    team: data.team || [],
                    contact_email: data.contact_email || "",
                    contact_links: data.contact_links || [],
                });
                setLinksInput((data.contact_links || []).join("\n"));
            }
            setIsLoading(false);
        })();
    }, []);

    const onTeamChange = (idx, key, value) => {
        setForm((f) => ({
            ...f,
            team: f.team.map((m, i) => (i === idx ? { ...m, [key]: value } : m)),
        }));
    };

    const addTeamMember = () => {
        setForm((f) => ({ ...f, team: [...f.team, { name: "", role: "", image_url: "" }] }));
    };

    const removeTeamMember = (idx) => {
        setForm((f) => ({ ...f, team: f.team.filter((_, i) => i !== idx) }));
    };

    const onSave = async () => {
        setSaving(true);
        try {
            const payload = {
                ...form,
                contact_links: linksInput.split("\n").map((l) => l.trim()).filter(Boolean),
            };
            const res = await aboutUsService.update(payload);
            if (res.status === 200) {
                setMsg("About Us updated.");
                setSuccOpen(true);
            } else {
                setMsg("Failed to update.");
                setErrOpen(true);
            }
        } catch (err) {
            setMsg(err?.response?.data?.detail || "Unexpected error.");
            setErrOpen(true);
        } finally {
            setSaving(false);
        }
    };

    const onSuccClose = () => {
        setSuccOpen(false);
        router.push('/about');
    };

    if (isLoading || !initialized) return <LoadingSpinner />;

    return (
        <Container maxW="4xl" py={12} px={{ base: 4, md: 6 }}>
            <Heading mb={8} className="font-anton">Edit About Us</Heading>

            <Stack spacing={6}>
                <FormControl>
                    <FormLabel>Hero Title</FormLabel>
                    <Input value={form.hero_title} onChange={(e) => setForm({ ...form, hero_title: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>Hero Subtitle</FormLabel>
                    <Input value={form.hero_subtitle} onChange={(e) => setForm({ ...form, hero_subtitle: e.target.value })} />
                </FormControl>

                <FormControl>
                    <FormLabel>Cover Image URL</FormLabel>
                    <Input
                        value={form.cover_image}
                        onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                        placeholder="https://..."
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Body (HTML or markdown)</FormLabel>
                    <Textarea
                        rows={10}
                        value={form.body_markdown}
                        onChange={(e) => setForm({ ...form, body_markdown: e.target.value })}
                        placeholder="<p>Tell visitors about the chapter…</p>"
                        fontFamily="mono"
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                        HTML is rendered as-is on the public page.
                    </Text>
                </FormControl>

                <FormControl>
                    <FormLabel>Contact Email</FormLabel>
                    <Input
                        type="email"
                        value={form.contact_email}
                        onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Contact Links (one URL per line)</FormLabel>
                    <Textarea
                        rows={4}
                        value={linksInput}
                        onChange={(e) => setLinksInput(e.target.value)}
                        placeholder={"https://twitter.com/...\nhttps://linkedin.com/..."}
                    />
                </FormControl>

                <Box>
                    <HStack justify="space-between" mb={3}>
                        <FormLabel m={0}>Team Members</FormLabel>
                        <Button size="sm" leftIcon={<AddIcon />} onClick={addTeamMember}>
                            Add member
                        </Button>
                    </HStack>
                    <VStack spacing={3} align="stretch">
                        {form.team.map((m, idx) => (
                            <SimpleGrid key={idx} columns={{ base: 1, md: 4 }} spacing={2} alignItems="end">
                                <Input
                                    placeholder="Name"
                                    value={m.name}
                                    onChange={(e) => onTeamChange(idx, 'name', e.target.value)}
                                />
                                <Input
                                    placeholder="Role"
                                    value={m.role}
                                    onChange={(e) => onTeamChange(idx, 'role', e.target.value)}
                                />
                                <Input
                                    placeholder="Image URL"
                                    value={m.image_url || ""}
                                    onChange={(e) => onTeamChange(idx, 'image_url', e.target.value)}
                                />
                                <IconButton
                                    aria-label="Remove"
                                    icon={<DeleteIcon />}
                                    variant="ghost"
                                    onClick={() => removeTeamMember(idx)}
                                />
                            </SimpleGrid>
                        ))}
                    </VStack>
                </Box>

                <HStack justify="flex-end" pt={4}>
                    <Button onClick={() => router.push('/about')} variant="ghost">Cancel</Button>
                    <Button bg="black" color="white" _hover={{ bg: "gray.800" }} onClick={onSave} isLoading={saving}>
                        Save changes
                    </Button>
                </HStack>
            </Stack>

            <ErrorModal isOpen={errOpen} onClose={() => setErrOpen(false)} errorMessage={msg} />
            <SuccessModal isOpen={succOpen} onClose={onSuccClose} successMessage={msg} />
        </Container>
    );
}
