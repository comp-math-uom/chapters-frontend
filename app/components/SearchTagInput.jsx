import React, {useState} from 'react';
import {Field} from 'formik';
import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    Wrap,
    WrapItem
} from '@chakra-ui/react';

const MAX_TAGS = 5;

const SearchTagsField = ({
                             name,
                             label = "Search Tags",
                             placeholder = "Type and press enter to add tag"
                         }) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <Field name={name}>
            {({field, form}) => (
                <FormControl
                    isInvalid={form.errors[name] && form.touched[name]}
                    mb={6}
                >
                    <FormLabel>{label}</FormLabel>
                    <Box flex="1">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && inputValue.trim()) {
                                    e.preventDefault();
                                    const newTags = [...field.value];
                                    if (newTags.length >= MAX_TAGS) {
                                        form.setFieldError(name, `Maximum ${MAX_TAGS} tags allowed`);
                                        return;
                                    }
                                    if (!newTags.includes(inputValue.trim())) {
                                        newTags.push(inputValue.trim());
                                        form.setFieldValue(name, newTags);
                                        form.setFieldError(name, undefined);
                                    }
                                    setInputValue('');
                                }
                            }}
                            placeholder={placeholder}
                            mb={2}
                            isDisabled={field.value.length >= MAX_TAGS}
                        />
                        <Wrap spacing={2}>
                            {field.value.map((tag, index) => (
                                <WrapItem key={index}>
                                    <Tag size="lg">
                                        <TagLabel>{tag}</TagLabel>
                                        <TagCloseButton
                                            onClick={() => {
                                                const newTags = field.value.filter((_, i) => i !== index);
                                                form.setFieldValue(name, newTags);
                                                form.setFieldError(name, undefined);
                                            }}
                                        />
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                        <Text fontSize="sm" color="gray.500" mt={1}>
                            {field.value.length}/{MAX_TAGS} tags
                        </Text>
                    </Box>
                    <FormErrorMessage className="ml-20">
                        {form.errors[name]}
                    </FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
};

export default SearchTagsField;