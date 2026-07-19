"use client";

import { Field, Form, Formik } from "formik";
import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea } from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import ImageUploadField from "@/app/components/portfolio/ImageFileUpload";
import Link from "next/link";
import { CreatableSelect } from "chakra-react-select";
import { useEffect, useState } from "react";
import portfolioService from "@/app/lib/services/portfolioService"
import ContributorsInput from "@/app/components/portfolio/ContributorsInput";

export default function PortfolioForm({ initialValues, handleSubmit }) {

    const [batches, setBatches] = useState([]);

    const validate = (values) => {
        const errors = {};
        if (!values.title) errors.title = "Title is required";
        if (!values.description) errors.description = "Description is required";
        if (values.searchTags?.length > 5) errors.searchTags = "Maximum 5 tags allowed";
        if (!values.image) errors.image = "Image is required";
        if (!values.batch) errors.batch = "Batch is required";
        if (!values.date) errors.date = "Date is required";
        if (!values.contributors || values.contributors.length === 0) {
            errors.contributors = "Please add at least one contributor";
        }
        return errors;
    }

    const initialFormValues = {
        title: initialValues?.title || "",
        description: initialValues?.description || "",
        searchTags: initialValues?.searchTags || [],
        image: initialValues?.image || null,
        visible: initialValues?.visible ?? true,
        featured: initialValues?.featured ?? false,
        batch: initialValues?.batch || "",
        date: initialValues?.date ? new Date(initialValues.date) : new Date(),
        contributors: initialValues?.contributors || [],
    }

    useEffect(() => {
        portfolioService.fetchBatches().then(setBatches);
    }, []);

    return (
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit} validate={validate} enableReinitialize>
            {(props) => (
                <Form>
                    <Field name='title'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.title && form.touched.title} className="mb-10">
                                <FormLabel>Title</FormLabel>
                                <Input {...field} placeholder='Enter Title' />
                                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name='description'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.description && form.touched.description} className="mb-10">
                                <FormLabel>Description</FormLabel>
                                <Textarea {...field} placeholder='Enter Description' rows={8} />
                                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex flex-col md:w-1/2 w-full">
                            <Field name='batch'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.batch && form.touched.batch} className="mb-10">
                                        <FormLabel>Batch</FormLabel>
                                        <Select {...field} placeholder='Select Batch'>
                                            {batches.map((batch) => (
                                                <option key={batch.value} value={batch.value}>{batch.label}</option>
                                            ))}
                                        </Select>
                                        <FormErrorMessage>{form.errors.batch}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='contributors'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.contributors && form.touched.contributors} className="mb-10">
                                        <FormLabel>Contributors</FormLabel>
                                        <ContributorsInput
                                            value={field.value}
                                            onChange={(contributors) => {
                                                form.setFieldValue('contributors', contributors);
                                                form.setFieldTouched('contributors', true);
                                            }}
                                            namePlaceholder="Contributor name"
                                            urlPlaceholder="Profile link (optional)"
                                        />
                                        <FormErrorMessage>{form.errors.contributors}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='date'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.date && form.touched.date} className="mb-10">
                                        <FormLabel>Date</FormLabel>
                                        <SingleDatepicker
                                            name="date"
                                            maxDate={new Date()}
                                            date={field.value}
                                            onDateChange={(date) => {
                                                form.setFieldValue('date', date);
                                                form.setFieldTouched('date', true);
                                            }}
                                            propsConfigs={{
                                                triggerBtnProps: { width: '100%', justifyContent: 'flex-start' },
                                                dateNavBtnProps: {
                                                    colorScheme: 'gray', variant: 'outline',
                                                    _hover: { backgroundColor: 'black', color: 'white' },
                                                },
                                                dayOfMonthBtnProps: {
                                                    defaultBtnProps: {
                                                        colorScheme: 'gray', variant: 'outline',
                                                        _hover: { backgroundColor: 'black', color: 'white' },
                                                    },
                                                    selectedBtnProps: { backgroundColor: 'black', color: 'white' },
                                                },
                                            }}
                                        />
                                        <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='searchTags'>
                                {({ field, form }) => (
                                    <FormControl className="mb-6" isInvalid={form.errors.searchTags && form.touched.searchTags}>
                                        <FormLabel>Search Tags</FormLabel>
                                        <CreatableSelect
                                            isMulti
                                            value={(field.value || []).map((tag) => ({ value: tag, label: tag }))}
                                            name={field.name}
                                            onChange={(selectedOptions) => {
                                                form.setFieldValue('searchTags', (selectedOptions || []).map((o) => o.value));
                                            }}
                                            onBlur={field.onBlur}
                                            placeholder="Enter Search Tags"
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
                                                if ((field.value || []).length >= 5) return;
                                                form.setFieldValue('searchTags', [...(field.value || []), inputValue]);
                                            }}
                                        />
                                        <FormErrorMessage>{form.errors.searchTags}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <div className="flex">
                                <Field name="visible">
                                    {({ field }) => (
                                        <FormControl className="mb-6">
                                            <Checkbox {...field} isChecked={field.value}>Visible</Checkbox>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="featured">
                                    {({ field }) => (
                                        <FormControl className="mb-6">
                                            <Checkbox {...field} isChecked={field.value}>Featured</Checkbox>
                                        </FormControl>
                                    )}
                                </Field>
                            </div>
                        </div>

                        <div className="md:w-1/2 w-full">
                            <Field name='image'>
                                {() => (
                                    <ImageUploadField name="image" label="Upload Image" />
                                )}
                            </Field>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button mt={4} colorScheme='gray' mr={4} className="w-1/6" isLoading={props.isSubmitting}>
                            <Link style={{ width: '100%' }} href={'/portfolio/projects'}>
                                Cancel
                            </Link>
                        </Button>
                        <Button
                            bg="black"
                            color="white"
                            _hover={{ bg: "gray.800" }}
                            mt={4} colorScheme='teal' className="w-1/6"
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
