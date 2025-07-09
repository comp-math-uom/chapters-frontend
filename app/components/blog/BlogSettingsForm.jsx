"use client";

import { Field, Form, Formik } from "formik";
import { Button, FormControl, FormErrorMessage, FormLabel, Select, useToast } from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import ImageUploadField from "@/app/components/portfolio/ImageFileUpload";
import { useBlog } from "@/app/providers/BlogProvider";
import blogService from "@/app/lib/services/blogService";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function BlogSettingsForm({initialValues, handleCancel, isEditMode = false, blogId}) {
    const toast = useToast();
    const [authors, setAuthors] = useState([]);
    const {validateBlog, blogTitle, blogContent} = useBlog();
    const router = useRouter();

    useEffect(() => {
        const fetchAuthors = async () => {
            const authorsData = await blogService.getAuthors();
            setAuthors(authorsData);
        };

        fetchAuthors();
    }, []);

    const uploadCoverImage = async (file) => {
        // curl command: curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY" --form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        // I have base64 encoded the image and uploaded it to imgbb
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
        debugger;
        const errors = {};

        if (!values.image) {
            errors.image = "Image is required";
        }
        
        if (!values.user_id) {
            errors.author = "Author is required";
        }
        
        return errors;
    }

    const initialFormValues = {
        tags: initialValues?.tags || [],
        image: initialValues?.image || null,
        user_id: initialValues?.user_id || "",
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    const handleFormSubmit = async (values, formikActions) => {
        // First validate the blog content and title
        debugger;
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
            // Convert image to base64 if it exists and is a File object
            let imageBase64 = values.image;
            if (values.image && values.image instanceof File) {
                imageBase64 = await convertToBase64(values.image);
            }

            var imageUrl = await uploadCoverImage(values.image);
  
            // Combine blog data with form values
            const completeData = {
                ...values,
                post_image: imageUrl,
                title: blogTitle,
                content: blogContent,
                comment_constraint: true,
                number_of_views: 0
            };

            console.log(`${isEditMode ? 'Updating' : 'Creating'} blog data:`, completeData);
            
            let response;
            if (isEditMode && blogId) {
                response = await blogService.updateBlog(blogId, completeData);
            } else {
                response = await blogService.createBlog(completeData);
            }
            
            if (response.error) {
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
                    // Close the drawer and possibly refresh the data
                    handleCancel();
                    // Navigate to the blog view page
                    router.push(`/blog/${blogId}`);
                } else {
                    router.push(`/blog`);
                }
            }

        } catch (error) {
            toast({
                title: "Error Processing Request",
                description: `Failed to ${isEditMode ? 'update' : 'create'} the blog.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} blog:`, error);
        }

        formikActions.setSubmitting(false);

    };

    return (
        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit} validate={validate}>
            {(props) => (
                <Form className="flex flex-col justify-between" style={{height: "calc(100vh - 100px)"}}
                      onKeyDown={handleKeyDown}>
                    <div className="px-2">
                        <Field name='image' className="w-full sm:w-3/4 md:w-1/2">
                            {({field, form}) => (
                                <ImageUploadField
                                    name="image"
                                    label="Preview Image"
                                />
                            )}
                        </Field>

                        <Field name='user_id'>
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.user_id && form.touched.user_id} className="mb-6">
                                    <FormLabel>Author</FormLabel>
                                    <Select {...field} placeholder='Select Author'>
                                        {authors.map((author) => (
                                            <option key={author.id} value={author.id}>
                                                {author.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{form.errors.user_id}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name='tags'>
                            {({field, form}) => (
                                <FormControl className="mb-6"
                                             isInvalid={form.errors.searchTags && form.touched.searchTags}>
                                    <FormLabel>Tags</FormLabel>
                                    <CreatableSelect
                                        isMulti
                                        value={field.value.map(tag => ({value: tag, label: tag}))}
                                        name={field.name}
                                        onChange={(selectedOptions) => {
                                            const values = selectedOptions.map(option => option.value);
                                            form.setFieldValue('tags', values);
                                        }}
                                        onBlur={field.onBlur}
                                        placeholder="Enter Tags (upto 5)"
                                        components={{
                                            DropdownIndicator: null,  // Removes the dropdown arrow
                                            IndicatorSeparator: null, // Removes the separator
                                            Menu: () => null,         // Removes the dropdown menu completely
                                        }}
                                        chakraStyles={{
                                            control: (provided) => ({
                                                ...provided,
                                                borderRadius: 'md',
                                                cursor: 'text',
                                            }),
                                            valueContainer: (provided) => ({
                                                ...provided,
                                                padding: '2px 8px',
                                            }),
                                        }}
                                        onCreateOption={(inputValue) => {
                                            if (field.value.length >= 5) {
                                                // Optionally show a toast or alert here
                                                return;
                                            }
                                            const newValue = [...field.value, inputValue];
                                            form.setFieldValue('tags', newValue);
                                        }}
                                    /></FormControl>
                            )}
                        </Field>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between w-full gap-4 px-2">
                        <Button
                            mt={4}
                            colorScheme='gray'
                            className="w-full sm:w-1/2"
                            onClick={handleCancel}
                            isLoading={props.isSubmitting}>
                            Cancel
                        </Button>
                        <Button bg="black"
                                color="white"
                                _hover={{bg: "gray.800"}}
                                mt={4}
                                colorScheme='teal'
                                className="w-full sm:w-1/2"
                                isLoading={props.isSubmitting}
                                type='submit'>
                            {isEditMode ? 'Update' : 'Publish'}
                        </Button>
                    </div>
                </Form>
            )
            }
        </Formik>
    );
}