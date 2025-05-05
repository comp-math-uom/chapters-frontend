"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [formStatus, setFormStatus] = useState({
        isSubmitting: false,
        isSubmitted: false,
        error: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ ...formStatus, isSubmitting: true });

        try {
            // Here you would typically send the form data to your backend
            // For example: await axios.post('/api/contact', formData);

            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset form and show success
            setFormData({ name: "", email: "", subject: "", message: "" });
            setFormStatus({
                isSubmitting: false,
                isSubmitted: true,
                error: null
            });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setFormStatus(prev => ({ ...prev, isSubmitted: false }));
            }, 5000);

        } catch (error) {
            setFormStatus({
                isSubmitting: false,
                isSubmitted: false,
                error: "There was an error submitting the form. Please try again."
            });
        }
    };

    return (
        <motion.div
            className="flex flex-col md:flex-row gap-8 my-16 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            {/* Left side - Contact information and image */}
            <motion.div
                className="w-full md:w-1/3 flex flex-col items-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h2 className="text-5xl w-full font-bold text-right mb-6">CONTACT US</h2>
                <p className="text-right mb-8">
                    Interested in learning more about our program, the AI Students Chapter,
                    potential collaborations, or have specific inquiries? Please do not
                    hesitate to reach out. We welcome connection and discussion.
                </p>
                <motion.div
                    className="mt-4"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                >
                    <Image
                        src={'/img/call.png'}
                        alt="Contact Icon"
                        width="272"
                        height="235"
                        style={{ objectFit: "contain" }}
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* Right side - Contact form */}
            <motion.div
                className="w-full md:w-2/3"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Email field */}
                        <motion.div
                            className="flex flex-col w-full md:w-1/2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <label htmlFor="email" className="mb-2 font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your Email"
                                className="p-3 border border-gray-700 rounded-2xl"
                                required
                            />
                        </motion.div>

                        {/* Name field */}
                        <motion.div
                            className="flex flex-col w-full md:w-1/2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <label htmlFor="name" className="mb-2 font-medium">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="p-3 border border-gray-700 rounded-2xl"
                                required
                            />
                        </motion.div>
                    </div>

                    {/* Subject field */}
                    <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        <label htmlFor="subject" className="mb-2 font-medium">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Enter subject"
                            className="p-3 border border-gray-700 rounded-2xl"
                            required
                        />
                    </motion.div>

                    {/* Message field */}
                    <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                    >
                        <label htmlFor="message" className="mb-2 font-medium">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Enter your message"
                            className="p-3 border border-gray-700 rounded-2xl h-36"
                            required
                        />
                    </motion.div>

                    {/* Submit button */}
                    <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            type="submit"
                            disabled={formStatus.isSubmitting}
                            className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors"
                        >
                            {formStatus.isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </motion.div>

                    {/* Success or error message */}
                    {formStatus.isSubmitted && (
                        <motion.div
                            className="mt-4 p-3 bg-green-100 text-green-700 rounded-md"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            Thank you! Your message has been sent successfully.
                        </motion.div>
                    )}

                    {formStatus.error && (
                        <motion.div
                            className="mt-4 p-3 bg-red-100 text-red-700 rounded-md"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {formStatus.error}
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </motion.div>
    );
}

export default ContactUs;