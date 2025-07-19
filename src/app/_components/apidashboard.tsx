import { withAuth } from "@workos-inc/authkit-nextjs";
import { CopyIcon, PlusIcon, TrashIcon } from "lucide-react";

export default async function APIDashboard() {
//   const { user } = await withAuth();

  // Mock data - replace with real API calls
  const apiKeys = [
    { id: "1", name: "Production Key", key: "lmnr_sk_prod_1234567890", created: "2023-10-15" },
    { id: "2", name: "Development Key", key: "lmnr_sk_dev_0987654321", created: "2023-09-20" },
  ];

//   if (!user) {
//     return null; // or redirect to login
//   }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-26">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Laminor.io API Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* <span className="text-sm">{user.email}</span> */}
            <a 
              href="/logout" 
              className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 max-w-6xl mx-auto w-full">
        <div className="space-y-6">
          {/* API Key Generator Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Generate New API Key</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="key-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Key Name
                </label>
                <input
                  type="text"
                  id="key-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="e.g. Production Server"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Generate Key
              </button>
            </form>
          </section>

          {/* Existing Keys Section */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your API Keys</h2>
              <span className="text-sm text-gray-500">{apiKeys.length} keys</span>
            </div>

            <div className="space-y-4">
              {apiKeys.length === 0 ? (
                <p className="text-gray-500">No API keys generated yet</p>
              ) : (
                apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{apiKey.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Created: {apiKey.created}</p>
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {apiKey.key}
                      </code>
                      <button className="ml-2 text-gray-500 hover:text-black">
                        <CopyIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* API Documentation Link */}
          <section className="text-center">
            <a
              href="https://docs.laminor.io"
              className="text-sm text-gray-500 hover:text-black hover:underline"
            >
              View API Documentation →
            </a>
          </section>
        </div>
      </main>

    </div>
  );
}