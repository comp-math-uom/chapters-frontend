'use client'

import React, { useCallback, useState, useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import Link from '@tiptap/extension-link';
import {
    Bold,
    Braces,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Italic,
    Link2,
    List,
    ListOrdered,
    Minus,
    WrapText
} from 'lucide-react';
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormErrorMessage,
    IconButton,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import styles from './blogEditor.module.scss';
import { useBlog } from "@/app/providers/BlogProvider";

const lowlight = createLowlight(all);

const BlogEditor = () => {
    const [linkUrl, setLinkUrl] = useState('');
    const bgColor = useColorModeValue('white', 'gray.100');
    const {blogTitle, setBlogTitle, blogContent, setContent, errors} = useBlog();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
                bulletList: {
                    keepMarks: true,
                    keepAttributes: true,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: true,
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: styles.editorImage,
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Link.configure({
                openOnClick: false,
            })
        ],
        content: blogContent,
        onUpdate: ({editor}) => {
            setContent(editor.getHTML());
            errors.content = null;
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none',
            },
        },
    });

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL');
        if (url && editor) {
            editor.chain().focus().setImage({src: url}).run();
        }
    }, [editor]);

    const addLink = useCallback(() => {
        if (editor && linkUrl) {
            editor.chain().focus().extendMarkRange('link').setLink({href: linkUrl}).run();
            setLinkUrl(linkUrl);
        }
    }, [editor, linkUrl]);

    // Sync editor content with context when blogContent changes (for edit mode)
    useEffect(() => {
        if (editor && blogContent !== editor.getHTML()) {
            editor.commands.setContent(blogContent);
        }
    }, [editor, blogContent]);

    if (!editor) {
        return null;
    }

    const handleTitleChange = (title) => {
        errors.title = null;
        setBlogTitle(title);
    }

    return (
        <div className={styles.editor}>
            <Box bg="gray.50" px={5} pt={5} mb={5} borderRadius="md">
                <FormControl isInvalid={errors?.title}>
                    <Input
                        variant="unstyled"
                        placeholder="Title"
                        size="lg"
                        className={styles.titleInput}
                        value={blogTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                    />
                    {errors?.title && (
                        <FormErrorMessage pb={5}>{errors.title}</FormErrorMessage>
                    )}
                </FormControl>
            </Box>

            <div className={styles.toolbar}>
                <ButtonGroup size="sm" spacing={2} className="mb-2">
                    <IconButton
                        icon={<Bold className="w-4 h-4"/>}
                        aria-label="Bold"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        colorScheme={editor.isActive('bold') ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Italic className="w-4 h-4"/>}
                        aria-label="Italic"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        colorScheme={editor.isActive('italic') ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Code className="w-4 h-4"/>}
                        aria-label="Code"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        colorScheme={editor.isActive('code') ? 'blue' : 'gray'}
                        isDisabled={!editor.can().chain().focus().toggleCode().run()}
                    />
                    <IconButton
                        icon={<Heading1 className="w-4 h-4"/>}
                        aria-label="H1"
                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                        colorScheme={editor.isActive('heading', {level: 1}) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading2 className="w-4 h-4"/>}
                        aria-label="H2"
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        colorScheme={editor.isActive('heading', {level: 2}) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading3 className="w-4 h-4"/>}
                        aria-label="H3"
                        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                        colorScheme={editor.isActive('heading', {level: 3}) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading4 className="w-4 h-4"/>}
                        aria-label="H4"
                        onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                        colorScheme={editor.isActive('heading', {level: 4}) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading5 className="w-4 h-4"/>}
                        aria-label="H5"
                        onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                        colorScheme={editor.isActive('heading', {level: 5}) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading6 className="w-4 h-4"/>}
                        aria-label="H6"
                        onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                        colorScheme={editor.isActive('heading', {level: 6}) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Minus className="w-4 h-4"/>}
                        aria-label="HR"
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    />
                    <IconButton
                        icon={<Braces className="w-4 h-4"/>}
                        aria-label="CB"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        colorScheme={editor.isActive('codeBlock') ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<List className="w-4 h-4"/>}
                        aria-label="UL"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        colorScheme={editor.isActive('bulletList') ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<ListOrdered className="w-4 h-4"/>}
                        aria-label="OL"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        colorScheme={editor.isActive('orderedList') ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<WrapText className="w-4 h-4"/>}
                        aria-label="LB"
                        onClick={() => editor.chain().focus().setHardBreak().run()}
                    />
                    <Popover>
                        <PopoverTrigger>
                            <IconButton
                                icon={<Link2 className="w-4 h-4"/>}
                                aria-label="Link"
                                colorScheme={editor.isActive('link') ? 'blue' : 'gray'}
                                onClick={() => {
                                    // If there's already a link at the current selection, unset it
                                    if (editor.isActive('link')) {
                                        editor.chain().focus().unsetLink().run();
                                    }
                                }}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow/>
                            <PopoverBody>
                                <Input
                                    placeholder="Enter link URL"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                />
                            </PopoverBody>
                            <PopoverFooter display="flex" justifyContent="flex-end">
                                <Button bg="black"
                                        color="white"
                                        _hover={{bg: "gray.800"}}
                                        size="md"
                                        fontSize="sm"
                                        borderRadius="lg"
                                        px="4" onClick={addLink}>
                                    Add Link
                                </Button>
                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                </ButtonGroup>

            </div>

            <div className={styles.editorContent} style={{backgroundColor: bgColor}}>
                <EditorContent editor={editor}/>
                {errors?.content && (
                    <Text color="red.500" m={3}>{errors.content}</Text>
                )}
            </div>
        </div>
    );
};

export default BlogEditor;