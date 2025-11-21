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
                Inloggen
              </Link>
              <Link
                href="/login"
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-200/50 hover:shadow-xl hover:shadow-rose-300/50 transition-all"
              >
                Registreren
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
              Welkom bij Hoek
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full mb-8"></div>
          </div>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-rose-800/80 sm:text-xl md:mt-8 md:text-2xl leading-relaxed font-light">
            Waar je je wildste fantasieën kunt leven. Een plek waar mensen elkaar 
            vinden om seks te kopen en verkopen - oprecht, respectvol en vol passie.
          </p>
          <div className="mt-12 max-w-md mx-auto sm:flex sm:justify-center md:mt-16">
            <Link
              href="/login"
              className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 md:py-5 md:text-lg md:px-12 shadow-xl shadow-rose-300/40 hover:shadow-2xl hover:shadow-rose-400/50 transition-all transform hover:scale-105"
            >
              Begin je avontuur
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-rose-100/50 border border-rose-100/50 hover:bg-white/80 hover:shadow-xl hover:shadow-rose-200/50 transition-all transform hover:-translate-y-1">
              <div className="text-5xl mb-6">🔥</div>
              <h3 className="text-2xl font-light text-rose-900 mb-4 tracking-wide">
                Passie & Genot
              </h3>
              <p className="text-rose-700/80 leading-relaxed font-light">
                Hier gaat het om echte seks, echte passie, echt genot. Of je nu 
                koopt of verkoopt - beide partijen komen klaar en tevreden.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-purple-100/50 border border-purple-100/50 hover:bg-white/80 hover:shadow-xl hover:shadow-purple-200/50 transition-all transform hover:-translate-y-1">
              <div className="text-5xl mb-6">🌹</div>
              <h3 className="text-2xl font-light text-rose-900 mb-4 tracking-wide">
                Discreet & Veilig
              </h3>
              <p className="text-rose-700/80 leading-relaxed font-light">
                Je kinks, je verlangens, je geheimen - alles blijft tussen jou 
                en de mensen die je kiest. Volledige privacy, altijd.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-lg shadow-pink-100/50 border border-pink-100/50 hover:bg-white/80 hover:shadow-xl hover:shadow-pink-200/50 transition-all transform hover:-translate-y-1">
              <div className="text-5xl mb-6">💋</div>
              <h3 className="text-2xl font-light text-rose-900 mb-4 tracking-wide">
                Direct & Eerlijk
              </h3>
              <p className="text-rose-700/80 leading-relaxed font-light">
                Geen gezeur, geen spelletjes. Je zegt wat je wilt, wat je doet, 
                wat je kost. Duidelijkheid maakt het alleen maar geiler.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-32 bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-100/50 p-10 md:p-16">
          <h2 className="text-4xl font-light text-rose-900 text-center mb-16 tracking-wide">
            Hoe werkt het?
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-rose-900 mb-6 tracking-wide">
                Verkopen
              </h3>
              <ul className="space-y-4 text-rose-700/80">
                <li className="flex items-start group">
                  <span className="text-rose-400 mr-4 text-xl group-hover:text-rose-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Laat zien wie je bent en wat je doet - wees eerlijk over je kinks en grenzen</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-rose-400 mr-4 text-xl group-hover:text-rose-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Zet je eigen prijs en bepaal wanneer je beschikbaar bent</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-rose-400 mr-4 text-xl group-hover:text-rose-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Vind klanten die precies zoeken naar wat jij aanbiedt</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-rose-400 mr-4 text-xl group-hover:text-rose-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Jij beslist wat je doet en wat niet - altijd jouw regels</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-rose-900 mb-6 tracking-wide">
                Kopen
              </h3>
              <ul className="space-y-4 text-rose-700/80">
                <li className="flex items-start group">
                  <span className="text-pink-400 mr-4 text-xl group-hover:text-pink-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Blader door profielen en vind iemand die bij je fantasieën past</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-pink-400 mr-4 text-xl group-hover:text-pink-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Lees wat ze doen, wat ze kosten, wat anderen zeggen</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-pink-400 mr-4 text-xl group-hover:text-pink-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Spreek af, betaal, geniet - simpel en discreet</span>
                </li>
                <li className="flex items-start group">
                  <span className="text-pink-400 mr-4 text-xl group-hover:text-pink-500 transition-colors">✦</span>
                  <span className="font-light leading-relaxed">Leef je verlangens uit zonder schaamte of oordeel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl font-light text-rose-900 mb-12 tracking-wide">
            Waar het om gaat
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-xl text-rose-800/80 leading-relaxed font-light">
              Hoek is voor mensen die weten wat ze willen. Seks kopen en verkopen 
              is normaal, mooi, en vol passie. We maken het makkelijk om elkaar te 
              vinden voor echte ontmoetingen vol genot.
            </p>
            <p className="text-xl text-rose-800/80 leading-relaxed font-light">
              Of je nu kinky bent, vanilla, of iets daartussenin - hier vind je 
              mensen die hetzelfde zoeken. Geen oordeel, geen schaamte, gewoon 
              eerlijke seks tussen volwassenen die weten wat ze doen.
            </p>
            <p className="text-xl text-rose-800/80 leading-relaxed font-light italic">
              Consent is heilig. Respect is verplicht. Maar verder? Geniet ervan. 
              Leef je uit. Laat je gaan. Dit is jouw ruimte om te verkennen wat 
              je verlangt.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-gradient-to-br from-rose-100/50 via-pink-100/50 to-purple-100/50 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-rose-200/50 shadow-xl shadow-rose-200/30">
          <h2 className="text-4xl font-light text-rose-900 mb-6 tracking-wide">
            Klaar om te beginnen?
          </h2>
          <p className="text-xl text-rose-800/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Sluit je aan en begin vandaag nog. Verkopen of kopen - het maakt niet 
            uit. Wat telt is dat je krijgt wat je nodig hebt.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/login"
              className="px-10 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 transition-all transform hover:scale-105"
            >
              Begin te Verkopen
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 border-2 border-rose-400 text-base font-medium rounded-full text-rose-700 bg-white/80 hover:bg-white hover:border-rose-500 shadow-lg shadow-rose-200/30 hover:shadow-xl hover:shadow-rose-300/40 transition-all transform hover:scale-105"
            >
              Zoek Seks
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
