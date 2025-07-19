import Link from "next/link";
import { getSignUpUrl, withAuth } from "@workos-inc/authkit-nextjs";

export default async function Home() {
  const { user } = await withAuth();
  const signUpUrl = await getSignUpUrl();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome
          </h1>
          <div className="space-y-4">
            <a
              href="/auth/callback"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors"
            >
              Sign in
            </a>
            <Link
              href={signUpUrl}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-black text-white p-4">
        <h1 className="text-xl font-bold">Welcome</h1>
      </header>
      <main className="flex-grow p-4">
        <div className="max-w-4xl mx-auto">
          {/* Your authenticated content here */}
        </div>
      </main>
    </div>
  );
}