// BlogContext.js
'use client'
import React, { createContext, useState, useContext } from 'react';

// Create a context
const BlogContext = createContext();

// Create a provider component
export function BlogProvider({ children }) {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setContent] = useState('');
    const [errors, setErrors] = useState({});

    const validateBlog = () => {
        const newErrors = {};

        if (!blogTitle.trim()) {
            newErrors.title = "Blog title is required";
        } else if (blogTitle.trim().length < 5) {
            newErrors.title = "Blog title must be at least 5 characters";
        }

        // Count words in blog content by splitting on whitespace and filtering out empty strings
        const wordCount = blogContent
            .replace(/<[^>]*>/g, ' ') // Replace HTML tags with spaces
            .split(/\s+/)
            .filter(word => word.length > 0)
            .length;

        if (wordCount < 150) {
            newErrors.content = `Blog content must have at least 150 words. Current: ${wordCount} words`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearErrors = () => {
        setErrors({});
    };

    return (
        <BlogContext.Provider
            value={{
                blogTitle,
                setBlogTitle,
                blogContent,
                setContent,
                errors,
                validateBlog,
                clearErrors
            }}
        >
            {children}
        </BlogContext.Provider>
    );
}

// Create a custom hook for using the blog context
export function useBlog() {
    return useContext(BlogContext);
}