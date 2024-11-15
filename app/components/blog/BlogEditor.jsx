'use client'

import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import { Bold, Italic, Link2, Code, WrapText, List, ListOrdered, Braces, Minus,
    Heading2, Heading3, Heading4, Heading1, Heading5, Heading6 } from 'lucide-react';
import { ButtonGroup, IconButton, Textarea, useColorModeValue } from '@chakra-ui/react';
import styles from './blogEditor.module.scss';

const lowlight = createLowlight(all);

const BlogEditor = () => {
    const [content, setContent] = useState('');
    const bgColor = useColorModeValue('white', 'gray.100');

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
        ],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
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
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className={styles.editor}>
            <Textarea
                variant="unstyled"
                placeholder="Title"
                size="lg"
                className={styles.titleInput}
                resize="none"
                rows={1}
            />

            <Textarea
                variant="unstyled"
                placeholder="Subtitle"
                size="md"
                className={styles.subtitleInput}
                resize="none"
                rows={1}
            />

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
                        icon={<Link2 className="w-4 h-4"/>}
                        aria-label="Link"
                        onClick={() => {
                            const url = window.prompt('Enter link URL');
                            if (url) {
                                editor.chain().focus().setLink({href: url}).run();
                            }
                        }}
                        colorScheme={editor.isActive('link') ? 'blue' : 'gray'}
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
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        colorScheme={editor.isActive('heading', { level: 1 }) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading2 className="w-4 h-4"/>}
                        aria-label="H2"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        colorScheme={editor.isActive('heading', { level: 2 }) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading3 className="w-4 h-4"/>}
                        aria-label="H3"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        colorScheme={editor.isActive('heading', { level: 3 }) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading4 className="w-4 h-4"/>}
                        aria-label="H4"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        colorScheme={editor.isActive('heading', { level: 4 }) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading5 className="w-4 h-4"/>}
                        aria-label="H5"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        colorScheme={editor.isActive('heading', { level: 5 }) ? 'blue' : 'gray'}
                    />
                    <IconButton
                        icon={<Heading6 className="w-4 h-4"/>}
                        aria-label="H6"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                        colorScheme={editor.isActive('heading', { level: 6 }) ? 'blue' : 'gray'}
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
                </ButtonGroup>
            </div>

            <div
                className={styles.editorContent}
                style={{ backgroundColor: bgColor }}
            >
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default BlogEditor;