import { getUserApiLimitCount } from "~~/server/services/user-api-limit";



export default defineAuthenticatedEventHandler(async (event) => {
    const userApiLimitCount = await getUserApiLimitCount(
        event.context.user.id
    )

    return {
        userApiLimitCount,
    }
})