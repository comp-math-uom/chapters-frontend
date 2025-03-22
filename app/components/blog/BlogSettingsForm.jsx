"use client";

import {Field, Form, Formik} from "formik";
import {Button, FormControl, FormLabel} from "@chakra-ui/react";
import {CreatableSelect} from "chakra-react-select";
import ImageUploadField from "@/app/components/portfolio/ImageFileUpload";

export default function BlogSettingsForm({initialValues, handleSubmit, handleCancel}) {

    const validate = (values) => {
        const errors = {};

        if (!values.image) {
            errors.image = "Image is required";
        }
        return errors;
    }

    const initialFormValues = {
        topics: initialValues?.topics || [],
        image: initialValues?.image || null,
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    return (
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit} validate={validate}>
            {(props) => (
                <Form className="flex flex-col justify-between" style={{height: "calc(100vh - 100px)"}} onKeyDown={handleKeyDown}>
                    <div>
                        <Field name='image' className="w-1/2">
                            {({field, form}) => (
                                <ImageUploadField
                                    name="image"
                                    label="Preview Image"
                                />
                            )}
                        </Field>

                        <Field name='topics'>
                            {({field, form}) => (
                                <FormControl className="mb-6"
                                             isInvalid={form.errors.searchTags && form.touched.searchTags}>
                                    <FormLabel>Topics</FormLabel>
                                    <CreatableSelect
                                        isMulti
                                        value={field.value.map(tag => ({value: tag, label: tag}))}
                                        name={field.name}
                                        onChange={(selectedOptions) => {
                                            const values = selectedOptions.map(option => option.value);
                                            form.setFieldValue('topics', values);
                                        }}
                                        onBlur={field.onBlur}
                                        placeholder="Enter Topics (upto 5)"
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
                                            form.setFieldValue('topics', newValue);
                                        }}
                                    /></FormControl>
                            )}
                        </Field>
                    </div>

                    <div className="flex justify-between w-full">
                        <Button
                            mt={4}
                            colorScheme='gray'
                            mr={4}
                            className="w-1/2"
                            onClick={handleCancel}
                            isLoading={props.isSubmitting}>
                            Cancel
                        </Button>
                        <Button bg="black"
                                color="white"
                                _hover={{bg: "gray.800"}} mt={4} colorScheme='teal' className="w-1/2"
                                isLoading={props.isSubmitting}
                                type='submit'>
                            Publish
                        </Button>
                    </div>
                </Form>
            )
            }
        </Formik>
    );
}