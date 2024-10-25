import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Box,
    Text,
    Image,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Icon,
    Center
} from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import { FiUpload } from 'react-icons/fi';

const ImageUploadField = ({ name, label }) => {
    const [preview, setPreview] = useState(null);
    const [field, meta, helpers] = useField(name);
    const { setFieldValue } = useFormikContext();

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setFieldValue(name, file);

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    }, [name, setFieldValue]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
                border={meta.error ? "2px solid": "1px"}
                borderRadius="md"
                borderColor={meta.error && meta.touched ? "red.500" : "gray.200"}
                p={6}
                style={{ height: 400 }}
                _active={{
                    borderColor: "blue.500"
                }}
                _focus={{
                    borderColor: "blue.500"
                }}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                    borderColor: "gray.300"
                }}
            >
                <input {...getInputProps()} />
                {!preview ? (
                    <Center flexDirection="column" justifyContent="center" alignItems="center" style={{"height": "100%"}}>
                        <Icon as={FiUpload} w={8} h={8} color="gray.400" mb={2} />
                        <Text textAlign="center" color="gray.500">
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
                        />
                        <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
                            Click or drag to replace
                        </Text>
                    </Box>
                )}
            </Box>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default ImageUploadField;