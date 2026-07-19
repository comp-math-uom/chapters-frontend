"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Badge, Box, Button, Container, Heading, HStack, IconButton, Image, Select, Table, TableContainer,
    Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack,
} from "@chakra-ui/react";
import { DeleteIcon, ViewIcon, ViewOffIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useAuth } from "@/app/providers/Providers";
import adminBlogService from "@/app/lib/services/adminBlogService";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ErrorBlock from "@/app/components/common/ErrorBlock";
import DeleteConfirmModal from "@/app/components/common/DeleteConfirmModal";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";

export default function AdminBlogsPage() {
    const router = useRouter();
    const { auth, initialized } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [filter, setFilter] = useState("all");
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const { isOpen: delOpen, onOpen: openDel, onClose: closeDel } = useDisclosure();
    const [msg, setMsg] = useState("");
    const { isOpen: errOpen, onOpen: openErr, onClose: closeErr } = useDisclosure();
    const { isOpen: succOpen, onOpen: openSucc, onClose: closeSucc } = useDisclosure();

    useEffect(() => {
        if (!initialized) return;
        if (!auth?.authenticated) router.replace('/auth/login');
        else if (auth.role !== 'admin') router.replace('/');
    }, [initialized, auth, router]);

    const reload = async () => {
        if (auth?.role !== 'admin') return;
        setIsLoading(true);
        try {
            const data = await adminBlogService.listAll(filter);
            setBlogs(data);
            setIsError(false);
        } catch (err) {
            console.error(err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (initialized && auth?.role === 'admin') reload();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, initialized, auth?.role]);

    const onDeleteClick = (id) => {
        setPendingDeleteId(id);
        openDel();
    };

    const onConfirmDelete = async () => {
        try {
            await adminBlogService.remove(pendingDeleteId);
            setMsg("Blog deleted.");
            openSucc();
            await reload();
        } catch (err) {
            setMsg(err?.response?.data?.detail || "Failed to delete blog.");
            openErr();
        }
    };

    const onToggleVisibility = async (id, current) => {
        try {
            await adminBlogService.setVisibility(id, !current);
            setMsg(`Blog ${!current ? 'shown' : 'hidden'}.`);
            openSucc();
            await reload();
        } catch (err) {
            setMsg(err?.response?.data?.detail || "Failed to update visibility.");
            openErr();
        }
    };

    if (!initialized || auth?.role !== 'admin') return <LoadingSpinner />;

    return (
        <Container maxW="7xl" py={10} px={{ base: 4, md: 6 }}>
            <VStack align="stretch" spacing={6}>
                <HStack justify="space-between" flexWrap="wrap">
                    <Heading className="font-anton" color="slate.900" letterSpacing="tight">Blog moderation</Heading>
                    <HStack>
                        <Text fontSize="sm" color="slate.600">Show:</Text>
                        <Select value={filter} onChange={(e) => setFilter(e.target.value)} maxW="200px" size="sm" borderColor="slate.200" borderRadius="lg" bg="white">
                            <option value="all">All blogs</option>
                            <option value="visible">Visible only</option>
                            <option value="hidden">Hidden only</option>
                        </Select>
                    </HStack>
                </HStack>

                {isLoading && <LoadingSpinner />}
                {isError && !isLoading && <ErrorBlock msg="Failed to load blogs." />}
                {!isLoading && !isError && blogs.length === 0 && (
                    <Text color="slate.500">No blogs match this filter.</Text>
                )}
                {!isLoading && !isError && blogs.length > 0 && (
                    <TableContainer bg="white" borderRadius="xl" border="1px" borderColor="slate.100" boxShadow="card">
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    <Th color="slate.500">Cover</Th>
                                    <Th color="slate.500">Title</Th>
                                    <Th color="slate.500">Author</Th>
                                    <Th color="slate.500">Posted</Th>
                                    <Th color="slate.500">Status</Th>
                                    <Th color="slate.500">Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {blogs.map((b) => {
                                    const visible = b.visibility !== false;
                                    const author = `${b.user_first_name || ''} ${b.user_last_name || ''}`.trim() || b.user_username || b.user_id;
                                    const id = b.blog_id || b.blogPost_id;
                                    return (
                                        <Tr key={id} _hover={{ bg: "slate.50" }}>
                                            <Td>
                                                {b.post_image ? (
                                                    <Image src={b.post_image} alt="" boxSize="48px" objectFit="cover" borderRadius="md" />
                                                ) : (
                                                    <Box boxSize="48px" bg="slate.100" borderRadius="md" />
                                                )}
                                            </Td>
                                            <Td maxW="300px">
                                                <Text fontWeight="bold" noOfLines={1} color="slate.900">{b.title}</Text>
                                                <Text fontSize="xs" color="slate.500" noOfLines={1}>
                                                    {b.content_preview}
                                                </Text>
                                            </Td>
                                            <Td color="slate.600">{author}</Td>
                                            <Td color="slate.600">{b.postedAt ? new Date(b.postedAt).toLocaleDateString() : '-'}</Td>
                                            <Td>
                                                <Badge colorScheme={visible ? 'green' : 'red'} borderRadius="full" px={2}>
                                                    {visible ? 'Visible' : 'Hidden'}
                                                </Badge>
                                            </Td>
                                            <Td>
                                                <HStack spacing={1}>
                                                    <Link href={`/blog/${id}`} target="_blank">
                                                        <IconButton
                                                            size="sm"
                                                            variant="ghost"
                                                            borderRadius="full"
                                                            aria-label="View"
                                                            icon={<ExternalLinkIcon />}
                                                        />
                                                    </Link>
                                                    <IconButton
                                                        size="sm"
                                                        variant="ghost"
                                                        borderRadius="full"
                                                        aria-label={visible ? 'Hide' : 'Show'}
                                                        icon={visible ? <ViewOffIcon /> : <ViewIcon />}
                                                        onClick={() => onToggleVisibility(id, visible)}
                                                    />
                                                    <IconButton
                                                        size="sm"
                                                        variant="ghost"
                                                        borderRadius="full"
                                                        colorScheme="red"
                                                        aria-label="Delete"
                                                        icon={<DeleteIcon />}
                                                        onClick={() => onDeleteClick(id)}
                                                    />
                                                </HStack>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </VStack>

            <DeleteConfirmModal isOpen={delOpen} onClose={closeDel} onDelete={onConfirmDelete} />
            <ErrorModal isOpen={errOpen} onClose={closeErr} errorMessage={msg} />
            <SuccessModal isOpen={succOpen} onClose={closeSucc} successMessage={msg} />
        </Container>
    );
}
