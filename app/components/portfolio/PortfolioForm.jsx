import {Field, Form, Formik} from "formik";
import {Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea} from "@chakra-ui/react";
import {SingleDatepicker} from "chakra-dayzed-datepicker";
import ImageUploadField from "@/app/components/portfolio/ImageFileUpload";
import Link from "next/link";
import {Select as MultiSelect, CreatableSelect} from "chakra-react-select";
import {useEffect, useState} from "react";
import portfolioService from "../../services/portfolioService"

export default function PortfolioForm({initialValues, handleSubmit}) {

    const [contributors, setContributors] = useState([]);

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = "Title is required";
        }
        if (!values.description) {
            errors.description = "Description is required";
        }
        if (values.searchTags.length > 5) {
            errors.searchTags = "Maximum 5 tags allowed";
        }
        if (!values.image) {
            errors.image = "Image is required";
        }
        if (!values.batch) {
            errors.batch = "Batch is required";
        }
        if (!values.date) {
            errors.date = "Date is required";
        }
        if (!values.batch) {
            errors.batch = "Batch is required";
        }
        if (!values.contributors || values.contributors.length === 0) {
            errors.contributors = "Please select at least one contributor";
        }
        return errors;
    }

    const initialFormValues = {
        title: initialValues?.title || "",
        description: initialValues?.description || "",
        searchTags: initialValues?.searchTags || [],
        image: initialValues?.image || null,
        visible: initialValues?.visible || true,
        featured: initialValues?.featured || false,
        batch: initialValues?.batch || "",
        date: initialValues?.date || new Date(),
        contributors: initialValues?.contributors || [],
    }

    useEffect(() => {
        portfolioService.fetContributors().then((data) => {
            setContributors(data);
        });
    }, []);

    return (
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit} validate={validate}>
            {(props) => (
                <Form>
                    <Field name='title'>
                        {({field, form}) => (
                            <FormControl isInvalid={form.errors.title && form.touched.title} className="mb-10">
                                <FormLabel>Title</FormLabel>
                                <Input {...field} placeholder='Enter Title'/>
                                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name='description'>
                        {({field, form}) => (
                            <FormControl isInvalid={form.errors.description && form.touched.description}
                                         className="mb-10">
                                <FormLabel>Description</FormLabel>
                                <Textarea {...field} placeholder='Enter Description' rows={8}/>
                                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex flex-col md:w-1/2 w-full">
                            <Field name='batch'>
                                {({field, form}) => (
                                    <FormControl isInvalid={form.errors.batch && form.touched.batch} className="mb-10">
                                        <FormLabel>Batch</FormLabel>
                                        <Select {...field} placeholder='Select Batch'>
                                            <option value="Batch 23">Batch 23</option>
                                            <option value="Batch 22">Batch 22</option>
                                            <option value="Batch 21">Batch 21</option>
                                        </Select>
                                        <FormErrorMessage>{form.errors.batch}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='contributors'>
                                {({field, form}) => (
                                    <FormControl
                                        isInvalid={form.errors.contributors && form.touched.contributors}
                                        className="mb-10"
                                    >
                                        <FormLabel>Contributors</FormLabel>
                                        <MultiSelect
                                            isMulti
                                            name={field.name}
                                            value={contributors.filter(option =>
                                                field.value.includes(option.value)
                                            )}
                                            onChange={(selectedOptions) => {
                                                const values = selectedOptions.map(option => option.value);
                                                form.setFieldValue('contributors', values);
                                            }}
                                            onBlur={field.onBlur}
                                            options={contributors}
                                            placeholder="Select contributors"
                                            closeMenuOnSelect={false}
                                        />
                                        <FormErrorMessage>{form.errors.contributors}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='date'>
                                {({field, form}) => (
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
                                                triggerBtnProps: {
                                                    width: '100%',
                                                    justifyContent: 'flex-start',
                                                },
                                                dateNavBtnProps: {
                                                    colorScheme: 'gray',
                                                    variant: 'outline',
                                                    _hover: {
                                                        backgroundColor: 'black',
                                                        color: 'white'
                                                    }
                                                },
                                                dayOfMonthBtnProps: {
                                                    defaultBtnProps: {
                                                        colorScheme: 'gray',
                                                        variant: 'outline',
                                                        _hover: {
                                                            backgroundColor: 'black',
                                                            color: 'white'
                                                        }
                                                    },
                                                    selectedBtnProps: {
                                                        backgroundColor: 'black',
                                                        color: 'white'
                                                    },
                                                },
                                            }}
                                        />
                                        <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='searchTags'>
                                {({field, form}) => (
                                    <FormControl className="mb-6" isInvalid={form.errors.searchTags && form.touched.searchTags}>
                                        <FormLabel>Search Tags</FormLabel>
                                    <CreatableSelect
                                        isMulti
                                        value={field.value.map(tag => ({ value: tag, label: tag }))}
                                        name={field.name}
                                        onChange={(selectedOptions) => {
                                            const values = selectedOptions.map(option => option.value);
                                            form.setFieldValue('searchTags', values);
                                        }}
                                        onBlur={field.onBlur}
                                        placeholder="Enter Search Tags"
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
                                            form.setFieldValue('searchTags', newValue);
                                        }}
                                    /></FormControl>
                                )}
                            </Field>
                            <div className="flex">
                                <Field name="visible">
                                    {({field, form}) => (
                                        <FormControl className="mb-6">
                                            <Checkbox  {...field} defaultChecked>Visible</Checkbox>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="featured">
                                    {({field, form}) => (
                                        <FormControl className="mb-6">
                                            <Checkbox  {...field}>Featured</Checkbox>
                                        </FormControl>
                                    )}
                                </Field>
                            </div>
                        </div>

                        <div className="md:w-1/2 w-full">
                            <Field name='image' className="w-1/2">
                                {({field, form}) => (
                                    <ImageUploadField
                                        name="image"
                                        label="Upload Image"
                                    />
                                )}
                            </Field>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button mt={4} colorScheme='gray' mr={4} className="w-1/6">
                            <Link href={'/portfolio'}>
                                Cancel
                            </Link>
                        </Button>
                        <Button bg="black"
                                color="white"
                                _hover={{bg: "gray.800"}} mt={4} colorScheme='teal' className="w-1/6"
                                isLoading={props.isSubmitting}
                                type='submit'>
                            Submit
                        </Button>
                    </div>
                </Form>
            )
            }
        </Formik>
    )
        ;
}