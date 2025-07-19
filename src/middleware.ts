// middleware.ts
import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/'], // Add other public pages here
  },
});

// ✅ Include '/' so 'app/page.tsx' is protected
export const config = {
  matcher: ['/','/_components', '/auth', '/oldpage', '/account/:page*', '/dashboard/:path*', '/home-page'],
};
