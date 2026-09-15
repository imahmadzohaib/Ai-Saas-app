import { auth } from "~~/server/services/better-auth"
import type { User } from "better-auth"
import type { H3Event, H3EventContext } from "h3"

type AuthenticatedEvent = H3Event & {
    context: H3EventContext & {
        user: User
    }
}

export default function defineAuthenticatedEventHandler<T>(
    handler: (event: AuthenticatedEvent) => T | Promise<T>
) {
    return defineEventHandler(async (event) => {
        const session = await auth.api.getSession({
            headers: event.headers,
        })

        if (!session) {
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
            })
        }

        event.context.user = session.user

        return handler(event as AuthenticatedEvent)
    })
}