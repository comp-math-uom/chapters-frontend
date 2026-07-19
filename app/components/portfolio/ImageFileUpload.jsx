import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Center, FormControl, FormErrorMessage, FormLabel, Icon, Image, Text } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import { FiUpload } from 'react-icons/fi';

export default function ImageUploadField({name, label}) {
    const [preview, setPreview] = useState(null);
    const [field, meta, helpers] = useField(name);
    const {setFieldValue} = useFormikContext();

    // Initialize preview if field value is already a URL string
    useEffect(() => {
        if (field.value && typeof field.value === 'string') {
            setPreview(field.value);
        } else if (field.value instanceof File) {
            const previewUrl = URL.createObjectURL(field.value);
            setPreview(previewUrl);
            
            // Cleanup function to revoke object URL
            return () => {
                URL.revokeObjectURL(previewUrl);
            };
        } else {
            setPreview(null);
        }
    }, [field.value]);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setFieldValue(name, file);
            // Preview will be set by the useEffect hook
        }
    }, [name, setFieldValue]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <FormControl isInvalid={meta.error && meta.touched} className="mb-6">
            <FormLabel>{label}</FormLabel>
            <Box
                {...getRootProps()}
                border={meta.error ? "2px solid" : "2px dashed"}
                borderRadius="xl"
                borderColor={meta.error && meta.touched ? "red.500" : "slate.200"}
                bg="slate.50"
                p={6}
                style={{height: 400}}
                _active={{
                    borderColor: "primary.500"
                }}
                _focus={{
                    borderColor: "primary.500"
                }}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                    borderColor: "primary.400",
                    bg: "primary.50"
                }}
            >
                <input {...getInputProps()} />
                {!preview ? (
                    <Center flexDirection="column" justifyContent="center" alignItems="center"
                            style={{"height": "100%"}}>
                        <Center w={12} h={12} borderRadius="full" bg="white" boxShadow="soft" mb={3}>
                            <Icon as={FiUpload} w={5} h={5} color="slate.400"/>
                        </Center>
                        <Text textAlign="center" color="slate.500">
                            {isDragActive
                                ? "Drop the image here"
                                : "Drag and drop an image here, or click to select"}
                        </Text>
                    </Center>
                ) : (
                    <Box className="flex flex-col justify-center items-center h-full">
                        <Image
                            src={preview}
                            alt="Preview"
                            maxH="200px"
                            mx="auto"
                            objectFit="contain"
                            borderRadius="lg"
                        />
                        <Text fontSize="sm" color="slate.500" mt={2} textAlign="center">
                            Click or drag to replace
                        </Text>
                    </Box>
                )}
            </Box>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};