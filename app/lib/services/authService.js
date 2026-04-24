import { supabase } from "@/app/lib/services/supabase";


export const authService = {
    async signup(username, password, email, firstname, lastname) {
        return await supabase.auth.signUp({
            email,
            password,
            options: {
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
