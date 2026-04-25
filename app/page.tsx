import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold">
                <span className="text-gray-900">Cul</span>
                <span className="text-bridge">bridge</span>
              </span>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-bridge px-4 py-2 text-sm font-semibold text-white hover:bg-bridge-dark transition"
              >
                Get started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="text-gray-900">Cul</span>
              <span className="text-bridge">bridge</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
              EU compliance validation for Nigerian agricultural exporters.
            </p>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Ship to the Netherlands and Germany with confidence.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/signup"
                className="rounded-lg bg-bridge px-8 py-3 text-base font-semibold text-white hover:bg-bridge-dark transition shadow-sm"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>

        {/* Compliance Tags */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              Compliance Standards
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['NVWA', 'BVL', 'RASFF', 'NAQS', 'NEPC'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white px-4 py-2 text-sm font-bold text-gray-400 border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Prevent Export Losses',
                  description: 'Validate shipments before they leave Nigeria with real-time compliance checks.',
                },
                {
                  title: 'EU Market Access',
                  description: 'Meet NVWA, BVL, and RASFF requirements for Netherlands and Germany.',
                },
                {
                  title: 'Instant Validation',
                  description: 'Run compliance checks immediately after creating your account.',
                },
              ].map((feature) => (
                <div key={feature.title} className="rounded-lg border border-gray-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm text-gray-500">
            © 2026 Culbridge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
