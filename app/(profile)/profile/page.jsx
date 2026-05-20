"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Avatar, Badge, Box, Button, Container, FormControl, FormLabel, HStack, Heading,
    Input, Stack, Text, VStack,
} from "@chakra-ui/react";
import { useAuth } from "@/app/providers/Providers";
import { supabase } from "@/app/lib/services/supabase";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";

export default function ProfilePage() {
    const router = useRouter();
    const { auth, initialized, session } = useAuth();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ firstName: "", lastName: "", avatarUrl: "" });
    const [msg, setMsg] = useState("");
    const [errOpen, setErrOpen] = useState(false);
    const [succOpen, setSuccOpen] = useState(false);

    useEffect(() => {
        if (!initialized) return;
        if (!auth?.authenticated) router.push('/auth/login');
    }, [initialized, auth, router]);

    useEffect(() => {
        setForm({
            firstName: auth?.tokenParsed?.firstName || "",
            lastName: auth?.tokenParsed?.lastName || "",
            avatarUrl: auth?.tokenParsed?.picture || "",
        });
    }, [auth]);

    if (!initialized || !auth?.authenticated) return <LoadingSpinner />;

    const user = session?.user;
    const displayName = auth.tokenParsed?.displayName || `${form.firstName} ${form.lastName}`.trim() || "User";
    const role = auth.role || "student";
    const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—";

    const onSave = async () => {
        setSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    first_name: form.firstName,
                    last_name: form.lastName,
                    avatar_url: form.avatarUrl,
                },
            });
            if (error) {
                setMsg(error.message || "Failed to update profile.");
                setErrOpen(true);
            } else {
                setMsg("Profile updated.");
                setSuccOpen(true);
                setEditing(false);
            }
        } catch (err) {
            setMsg("Unexpected error.");
            setErrOpen(true);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Container maxW="3xl" py={12} px={{ base: 4, md: 6 }}>
            <Heading mb={8} className="font-anton">Your profile</Heading>

            <Box bg="white" p={8} borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
                <HStack spacing={6} mb={8} align="flex-start" flexWrap="wrap">
                    <Avatar src={auth.tokenParsed?.picture} name={displayName} size="2xl" />
                    <VStack align="flex-start" spacing={2}>
                        <Heading size="lg">{displayName}</Heading>
                        <Text color="gray.600">{user?.email}</Text>
                        <Badge colorScheme={role === 'admin' ? 'purple' : 'gray'}>{role}</Badge>
                        <Text fontSize="sm" color="gray.500">Member since {memberSince}</Text>
                    </VStack>
                </HStack>

                {editing ? (
                    <Stack spacing={4}>
                        <HStack spacing={4} flexWrap="wrap">
                            <FormControl flex="1" minW="200px">
                                <FormLabel>First name</FormLabel>
                                <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                            </FormControl>
                            <FormControl flex="1" minW="200px">
                                <FormLabel>Last name</FormLabel>
                                <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <FormLabel>Avatar URL</FormLabel>
                            <Input value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} placeholder="https://..." />
                        </FormControl>
                        <HStack justify="flex-end" pt={2}>
                            <Button onClick={() => setEditing(false)} variant="ghost">Cancel</Button>
                            <Button onClick={onSave} bg="black" color="white" _hover={{ bg: "gray.800" }} isLoading={saving}>
                                Save
                            </Button>
                        </HStack>
                    </Stack>
                ) : (
                    <Button onClick={() => setEditing(true)} variant="outline">Edit profile</Button>
                )}
            </Box>

            <ErrorModal isOpen={errOpen} onClose={() => setErrOpen(false)} errorMessage={msg} />
            <SuccessModal isOpen={succOpen} onClose={() => setSuccOpen(false)} successMessage={msg} />
        </Container>
    );
}
