import { createAuthClient } from "better-auth/vue"

export function useAuth(){



    const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})

return{

    signIn: authClient.signIn,
    signUp: authClient.signUp
}
}