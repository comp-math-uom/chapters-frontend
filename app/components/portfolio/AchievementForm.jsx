"use client";

import { Field, Form, Formik } from "formik";
import {
    Button, Checkbox, FormControl, FormErrorMessage, FormLabel,
    Input, Select, Textarea
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import ImageUploadField from "@/app/components/portfolio/ImageFileUpload";
import Link from "next/link";
import { CreatableSelect } from "chakra-react-select";

const CATEGORIES = [
    { value: "competition", label: "Competition" },
    { value: "award", label: "Award" },
    { value: "publication", label: "Publication" },
    { value: "recognition", label: "Recognition" },
    { value: "other", label: "Other" },
];

export default function AchievementForm({ initialValues, handleSubmit }) {
    const validate = (values) => {
        const errors = {};
        if (!values.title) errors.title = "Title is required";
        if (!values.description) errors.description = "Description is required";
        if (!values.category) errors.category = "Category is required";
        if (!values.date) errors.date = "Date is required";
        if (!values.image) errors.image = "Image is required";
        if (values.searchTags?.length > 5) errors.searchTags = "Maximum 5 tags allowed";
        return errors;
    };

    const initialFormValues = {
        title: initialValues?.title || "",
        description: initialValues?.description || "",
        category: initialValues?.category || "",
        date: initialValues?.date ? new Date(initialValues.date) : new Date(),
        image: initialValues?.image || null,
        recipients: initialValues?.recipients || [],
        batch: initialValues?.batch || "",
        searchTags: initialValues?.searchTags || [],
        visible: initialValues?.visible ?? true,
        featured: initialValues?.featured ?? false,
    };

    return (
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit} validate={validate} enableReinitialize>
            {(props) => (
                <Form>
                    <Field name="title">
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.title && form.touched.title} className="mb-10">
                                <FormLabel>Title</FormLabel>
                                <Input {...field} placeholder="Enter title" />
                                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <Field name="description">
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.description && form.touched.description} className="mb-10">
                                <FormLabel>Description</FormLabel>
                                <Textarea {...field} placeholder="Enter description" rows={6} />
                                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex flex-col md:w-1/2 w-full">
                            <Field name="category">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.category && form.touched.category} className="mb-10">
                                        <FormLabel>Category</FormLabel>
                                        <Select {...field} placeholder="Select category">
                                            {CATEGORIES.map((c) => (
                                                <option key={c.value} value={c.value}>{c.label}</option>
                                            ))}
                                        </Select>
                                        <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="recipients">
                                {({ field, form }) => (
                                    <FormControl className="mb-10">
                                        <FormLabel>Recipients</FormLabel>
                                        <CreatableSelect
                                            isMulti
                                            value={(field.value || []).map((name) => ({ value: name, label: name }))}
                                            onChange={(opts) => form.setFieldValue('recipients', (opts || []).map((o) => o.value))}
                                            placeholder="Type a name and press Enter"
                                            components={{ DropdownIndicator: null, IndicatorSeparator: null, Menu: () => null }}
                                            chakraStyles={{ control: (p) => ({ ...p, cursor: 'text' }) }}
                                            onCreateOption={(v) => form.setFieldValue('recipients', [...(field.value || []), v.trim()].filter(Boolean))}
                                        />
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="batch">
                                {({ field }) => (
                                    <FormControl className="mb-10">
                                        <FormLabel>Batch (optional)</FormLabel>
                                        <Input {...field} placeholder="e.g. b22" />
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="date">
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
                                            }}
                                        />
                                        <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="searchTags">
                                {({ field, form }) => (
                                    <FormControl className="mb-6" isInvalid={form.errors.searchTags && form.touched.searchTags}>
                                        <FormLabel>Search Tags</FormLabel>
                                        <CreatableSelect
                                            isMulti
                                            value={(field.value || []).map((tag) => ({ value: tag, label: tag }))}
                                            onChange={(opts) => form.setFieldValue('searchTags', (opts || []).map((o) => o.value))}
                                            placeholder="Enter tags"
                                            components={{ DropdownIndicator: null, IndicatorSeparator: null, Menu: () => null }}
                                            chakraStyles={{ control: (p) => ({ ...p, cursor: 'text' }) }}
                                            onCreateOption={(v) => {
                                                if ((field.value || []).length >= 5) return;
                                                form.setFieldValue('searchTags', [...(field.value || []), v]);
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
                            <Field name="image">
                                {() => <ImageUploadField name="image" label="Upload Image" />}
                            </Field>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button mt={4} colorScheme='gray' mr={4} className="w-1/6" isLoading={props.isSubmitting}>
                            <Link style={{ width: '100%' }} href={'/portfolio/achievements'}>
                                Cancel
                            </Link>
                        </Button>
                        <Button
                            bg="black"
                            color="white"
                            _hover={{ bg: "gray.800" }}
                            mt={4} className="w-1/6"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
