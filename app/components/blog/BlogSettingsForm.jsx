"use client";

import { Field, Form, Formik } from "formik";
import { Button, FormControl, FormErrorMessage, FormLabel, useToast } from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import ImageUploadField from "@/app/components/portfolio/ImageFileUpload";
import { useBlog } from "@/app/providers/BlogProvider";
import { useAuth } from "@/app/providers/Providers";
import blogService from "@/app/lib/services/blogService";
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function BlogSettingsForm({ initialValues, handleCancel, isEditMode = false, blogId }) {
    const toast = useToast();
    const { validateBlog, blogTitle, blogContent } = useBlog();
    const { auth } = useAuth();
    const router = useRouter();

    const uploadCoverImage = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', process.env.NEXT_PUBLIC_IMAGEBB_API_KEY);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, formData);
            return response.data.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            toast({
                title: "Image Upload Error",
                description: "Failed to upload the image. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return null;
        }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.image) {
            errors.image = "Image is required";
        }
        return errors;
    };

    const initialFormValues = {
        tags: initialValues?.tags || [],
        image: initialValues?.image || null,
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleFormSubmit = async (values, formikActions) => {
        const isValid = validateBlog();
        if (!isValid) {
            toast({
                title: "Validation Error",
                description: "Please check the blog title and content requirements.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            formikActions.setSubmitting(false);
            return;
        }

        try {
            let imageUrl = values.image;
            if (values.image && values.image instanceof File) {
                imageUrl = await uploadCoverImage(values.image);
                if (!imageUrl) {
                    formikActions.setSubmitting(false);
                    return;
                }
            }

            // Author is implicit: the backend reads user_id from the JWT.
            // We don't send a user_id field — sending one is ignored anyway.
            const completeData = {
                tags: values.tags,
                post_image: imageUrl,
                title: blogTitle,
                content: blogContent,
                comment_constraint: true,
                number_of_views: 0,
            };

            const response = isEditMode && blogId
                ? await blogService.updateBlog(blogId, completeData)
                : await blogService.createBlog(completeData);

            if (response?.error) {
                toast({
                    title: `Error ${isEditMode ? 'Updating' : 'Creating'} Blog`,
                    description: response.error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: `Blog ${isEditMode ? 'Updated' : 'Created'} Successfully`,
                    description: `Your blog has been ${isEditMode ? 'updated' : 'published'} successfully.`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                if (isEditMode) {
                    handleCancel();
                    router.push(`/blog/${blogId}`);
                } else {
                    router.push(`/blog`);
                }
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} blog:`, error);
            toast({
                title: "Error Processing Request",
                description: error?.response?.data?.detail || `Failed to ${isEditMode ? 'update' : 'create'} the blog.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

        formikActions.setSubmitting(false);
    };

    const authorDisplay = auth?.tokenParsed?.displayName
        || `${auth?.tokenParsed?.firstName || ""} ${auth?.tokenParsed?.lastName || ""}`.trim()
        || auth?.tokenParsed?.email
        || "You";

    return (
        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit} validate={validate}>
            {(props) => (
                <Form
                    className="flex flex-col justify-between"
                    style={{ height: "calc(100vh - 100px)" }}
                    onKeyDown={handleKeyDown}
                >
                    <div className="px-2">
                        <Field name='image'>
                            {() => <ImageUploadField name="image" label="Preview Image" />}
                        </Field>

                        {/* Author is the logged-in user — no selector needed. */}
                        {!isEditMode && (
                            <FormControl className="mb-6">
                                <FormLabel>Author</FormLabel>
                                <div className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                                    {authorDisplay}
                                </div>
                            </FormControl>
                        )}

                        <Field name='tags'>
                            {({ field, form }) => (
                                <FormControl className="mb-6" isInvalid={form.errors.tags && form.touched.tags}>
                                    <FormLabel>Tags</FormLabel>
                                    <CreatableSelect
                                        isMulti
                                        value={field.value.map((tag) => ({ value: tag, label: tag }))}
                                        name={field.name}
                                        onChange={(selectedOptions) => {
                                            form.setFieldValue('tags', selectedOptions.map((o) => o.value));
                                        }}
                                        onBlur={field.onBlur}
                                        placeholder="Enter Tags (up to 5)"
                                        components={{
                                            DropdownIndicator: null,
                                            IndicatorSeparator: null,
                                            Menu: () => null,
                                        }}
                                        chakraStyles={{
                                            control: (provided) => ({ ...provided, borderRadius: 'md', cursor: 'text' }),
                                            valueContainer: (provided) => ({ ...provided, padding: '2px 8px' }),
                                        }}
                                        onCreateOption={(inputValue) => {
                                            if (field.value.length >= 5) return;
                                            form.setFieldValue('tags', [...field.value, inputValue]);
                                        }}
                                    />
                                    <FormErrorMessage>{form.errors.tags}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between w-full gap-4 px-2">
                        <Button
                            mt={4}
                            colorScheme='gray'
                            className="w-full sm:w-1/2"
                            onClick={handleCancel}
                            isLoading={props.isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg="black"
                            color="white"
                            _hover={{ bg: "gray.800" }}
                            mt={4}
                            className="w-full sm:w-1/2"
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            {isEditMode ? 'Update' : 'Publish'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
