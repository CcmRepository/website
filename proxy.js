import { updateSession } from '@/app/utils/supabase/middleware';

// Next.js 16 "proxy" convention (formerly "middleware").
export async function proxy(request) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except static assets and images.
         */
        '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
