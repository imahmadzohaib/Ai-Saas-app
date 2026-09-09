import { createAuthClient } from "better-auth/vue";
import type { RouteLocationRaw } from "vue-router";
export function useAuth(){



    const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})

const logout = async ({redirectTo}:{redirectTo?: RouteLocationRaw} = {})=>{
    await authClient.signOut();
    if(redirectTo){
        await navigateTo(redirectTo)
    }
}
return{

    signIn: authClient.signIn,
    signUp: authClient.signUp,
    logOut: logout

}
}