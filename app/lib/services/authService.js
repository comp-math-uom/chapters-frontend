import { supabase } from "@/app/lib/services/supabase";


const getEmailRedirectUrl = () => {
    const configuredRedirect =
        process.env.NEXT_PUBLIC_SUPABASE_EMAIL_REDIRECT_URL ||
        process.env.NEXT_PUBLIC_SITE_URL;

    if (configuredRedirect) {
        return configuredRedirect;
    }

    if (typeof window !== "undefined" && window.location?.origin) {
        return `${window.location.origin}/auth/login`;
    }

    return "http://localhost:3000/auth/login";
};

export const authService = {
    async signup(username, password, email, firstname, lastname) {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: getEmailRedirectUrl(),
                data: {
                    username,
                    first_name: firstname,
                    last_name: lastname,
                }
            }
        });
    },

    async signin(email, password) {
        return await supabase.auth.signInWithPassword({
            email,
            password
        });
    },

    async signout() {
        return await supabase.auth.signOut();
    }
}
