import { User } from "better-auth";
import type { H3Event, H3EventContext } from "h3";


type AuthenticatedEvent = H3Event & {
    context: H3EventContext & {
        user:User
    }
}



export default function defineAuthenticatedEventHandler<T>(
    handler: (event: AuthenticatedEvent) => T | Promise<T>
): (event: AuthenticatedEvent) => T | Promise<T> {
    return handler
}