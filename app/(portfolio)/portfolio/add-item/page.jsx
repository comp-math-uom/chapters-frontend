"use client";

import {Field, Form, Formik} from "formik";
import {FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/react";

export default function Page() {

    const handleSubmit =  (values, actions) => {

    }

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = "Title is required";
        }
        if (!values.summary) {
            errors.summary = "Summary is required";
        }
        if (!values.description) {
            errors.description = "Description is required";
        }
        return errors;
    }

    const initialValues = {
        title: "",
        summary: "",
        description: "",
        searchTags: [],
        contributors: []
    }

    return (
        <div className="container flex flex-col h-full m-auto justify-start">
            <h1 className="text-4xl font-bold mb-10">
                Add New Post
            </h1>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
                {(props) => (
                    <Form>
                        <Field name='title'>
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.title && form.touched.title} className="mb-10">
                                    <div className="flex items-center">
                                        <FormLabel style={{marginBottom: 0}}>Title</FormLabel>
                                        <Input {...field} placeholder='name' />
                                    </div>
                                    <FormErrorMessage className="ml-10">{form.errors.title}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='summary'>
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.summary && form.touched.summary} className="mb-10">
                                    <FormLabel>Summary</FormLabel>
                                    <Textarea {...field} placeholder='summary' />
                                    <FormErrorMessage>{form.errors.summary}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='description'>
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.description && form.touched.description} className="mb-10">
                                    <FormLabel>Description</FormLabel>
                                    <Textarea {...field} placeholder='description' />
                                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                    </Form>
                )}
            </Formik>
        </div>
    );
}