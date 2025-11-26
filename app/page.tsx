import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-rose-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-light tracking-wide text-rose-900">Hoek</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/login"
                className="text-rose-700 hover:text-rose-900 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-rose-50"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-200/50 hover:shadow-xl hover:shadow-rose-300/50 transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-rose-900 sm:text-6xl md:text-7xl mb-6 tracking-tight">
              Welcome to Hoek
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-8"></div>
          </div>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-rose-800/80 sm:text-xl md:mt-8 md:text-2xl leading-relaxed font-light">
            Where you can live your wildest fantasies. A place where people find 
            each other to buy and sell sex - honest, respectful, and full of passion.
          </p>
          <div className="mt-12 max-w-md mx-auto sm:flex sm:justify-center md:mt-16">
            <Link
              href="/login"
              className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 md:py-5 md:text-lg md:px-12 shadow-xl shadow-rose-300/40 hover:shadow-2xl hover:shadow-rose-400/50 transition-all transform hover:scale-105"
            >
              Start your adventure
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-rose-100/50 border border-rose-100/50 hover:bg-white/80 hover:shadow-xl hover:shadow-rose-200/50 transition-all transform hover:-translate-y-1">
              <div className="text-5xl mb-6">🔥</div>
              <h3 className="text-2xl font-light text-rose-900 mb-4 tracking-wide">
                Passion & Pleasure
              </h3>
              <p className="text-rose-700/80 leading-relaxed font-light">
                This is about real sex, real passion, real pleasure. Whether you're 
                buying or selling - both parties come satisfied and happy.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-purple-100/50 border border-purple-100/50 hover:bg-white/80 hover:shadow-xl hover:shadow-purple-200/50 transition-all transform hover:-translate-y-1">
              <div className="text-5xl mb-6">🌹</div>
              <h3 className="text-2xl font-light text-rose-900 mb-4 tracking-wide">
                Discreet & Safe
              </h3>
              <p className="text-rose-700/80 leading-relaxed font-light">
                Your kinks, your desires, your secrets - everything stays between you 
                and the people you choose. Complete privacy, always.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-pink-100/50 border border-pink-100/50 hover:bg-white/80 hover:shadow-xl hover:shadow-pink-200/50 transition-all transform hover:-translate-y-1">
              <div className="text-5xl mb-6">💋</div>
              <h3 className="text-2xl font-light text-rose-900 mb-4 tracking-wide">
                Direct & Honest
              </h3>
              <p className="text-rose-700/80 leading-relaxed font-light">
                No bullshit, no games. You say what you want, what you do, 
                what you cost. Clarity only makes it hotter.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-32 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-100/50 p-10 md:p-16">
          <h2 className="text-4xl font-light text-rose-900 text-center mb-16 tracking-wide">
            How does it work?
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-rose-900 mb-6 tracking-wide">
                Selling
              </h3>
              <ul className="space-y-4 text-rose-700/80">
                <li className="flex items-start group">
                  <span className="text-rose-400 mr-4 text-xl group-hover:text-rose-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Show who you are and what you do - be honest about your kinks and boundaries</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-rose-400 mr-4 text-xl group-hover:text-rose-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Set your own price and decide when you're available</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-rose-400 mr-4 text-xl group-hover:text-rose-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Find clients who are looking for exactly what you offer</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-rose-400 mr-4 text-xl group-hover:text-rose-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">You decide what you do and what you don't - always your rules</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-rose-900 mb-6 tracking-wide">
                Buying
              </h3>
              <ul className="space-y-4 text-rose-700/80">
                <li className="flex items-start group">
                  <span className="text-pink-400 mr-4 text-xl group-hover:text-pink-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Browse profiles and find someone who matches your fantasies</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-pink-400 mr-4 text-xl group-hover:text-pink-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Read what they do, what they cost, what others say</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-pink-400 mr-4 text-xl group-hover:text-pink-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Meet up, pay, enjoy - simple and discreet</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-pink-400 mr-4 text-xl group-hover:text-pink-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Live out your desires without shame or judgment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl font-light text-rose-900 mb-12 tracking-wide">
            What it's about
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-xl text-rose-800/80 leading-relaxed font-light">
              Hoek is for people who know what they want. Buying and selling sex 
              is normal, beautiful, and full of passion. We make it easy to find 
              each other for real encounters full of pleasure.
            </p>
            <p className="text-xl text-rose-800/80 leading-relaxed font-light">
              Whether you're kinky, vanilla, or somewhere in between - here you'll 
              find people looking for the same thing. No judgment, no shame, just 
              honest sex between adults who know what they're doing.
            </p>
            <p className="text-xl text-rose-800/80 leading-relaxed font-light italic">
              Consent is sacred. Respect is mandatory. But beyond that? Enjoy it. 
              Live it up. Let yourself go. This is your space to explore what 
              you desire.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-gradient-to-br from-rose-100/50 via-pink-100/50 to-purple-100/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-rose-200/50 shadow-xl shadow-rose-200/30">
          <h2 className="text-4xl font-light text-rose-900 mb-6 tracking-wide">
            Ready to get started?
          </h2>
          <p className="text-xl text-rose-800/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join us and start today. Selling or buying - it doesn't matter. 
            What counts is that you get what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/login"
              className="px-10 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 transition-all transform hover:scale-105"
            >
              Start Selling
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 border-2 border-rose-400 text-base font-medium rounded-full text-rose-700 bg-white/80 hover:bg-white hover:border-rose-500 shadow-lg shadow-rose-200/30 hover:shadow-xl hover:shadow-rose-300/40 transition-all transform hover:scale-105"
            >
              Find Sex
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
