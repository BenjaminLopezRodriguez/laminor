// middleware.ts
import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/login'], // Add other public pages here
  },
});

// ✅ Include '/' so 'app/page.tsx' is protected
export const config = {
  matcher: ['/', '/account/:page*', '/dashboard/:path*', '/home-page'],
};
