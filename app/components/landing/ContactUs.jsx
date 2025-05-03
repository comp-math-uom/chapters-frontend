"use client";

import React, { useState } from "react";
import Image from "next/image";

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
        <div className="flex flex-col md:flex-row gap-8 my-16 w-full">
            {/* Left side - Contact information and image */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
                <h2 className="text-5xl w-full font-bold text-right mb-6">CONTACT US</h2>
                <p className="text-right mb-8">
                    Interested in learning more about our program, the AI Students Chapter,
                    potential collaborations, or have specific inquiries? Please do not
                    hesitate to reach out. We welcome connection and discussion.
                </p>
                <div className="mt-4">
                    <Image
                        src={'/img/call.png'}
                        alt="Contact Icon"
                        width="272"
                        height="235"
                        style={{ objectFit: "contain" }}
                        priority
                    />
                </div>
            </div>

            {/* Right side - Contact form */}
            <div className="w-full md:w-2/3">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Email field */}
                        <div className="flex flex-col w-full md:w-1/2">
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
                        </div>

                        {/* Name field */}
                        <div className="flex flex-col w-full md:w-1/2">
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
                        </div>
                    </div>

                    {/* Subject field */}
                    <div className="flex flex-col">
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
                    </div>

                    {/* Message field */}
                    <div className="flex flex-col">
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
                    </div>

                    {/* Submit button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            disabled={formStatus.isSubmitting}
                            className="bg-black text-white py-3 px-8 rounded-md hover:bg-gray-800 transition-colors"
                        >
                            {formStatus.isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>

                    {/* Success or error message */}
                    {formStatus.isSubmitted && (
                        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                            Thank you! Your message has been sent successfully.
                        </div>
                    )}

                    {formStatus.error && (
                        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {formStatus.error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ContactUs;