import portfolioApi from "@/app/lib/services/portfolioApi";

const contactService = {
    /**
     * Submit the contact form. Returns true on success, false otherwise.
     * The portfolio backend forwards the message via Resend / SMTP.
     */
    async send({ name, email, subject, message }) {
        const res = await portfolioApi.post('contact', { name, email, subject, message });
        return res?.status >= 200 && res?.status < 300;
    },
};

export default contactService;
