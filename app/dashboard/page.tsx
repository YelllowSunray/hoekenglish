'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { logoutUser } from '@/lib/firebase/auth';
import { getAllProviders } from '@/lib/firebase/firestore';
import { getProfilePhotos, ProfilePhoto } from '@/lib/firebase/firestore';
import { getUserProfile, UserProfile } from '@/lib/firebase/auth';

interface ProviderCard {
  providerId: string;
  providerProfile?: UserProfile;
  providerPhotos?: ProfilePhoto[];
}

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [providers, setProviders] = useState<ProviderCard[]>([]);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState<ProviderCard | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadProviders();
    }
  }, [user, loading, router]);

  const loadProviders = async () => {
    try {
      // Get all provider user IDs
      const providerIds = await getAllProviders();
      
      // Load provider profiles and photos for each provider
      const providersWithProfiles = await Promise.all(
        providerIds.map(async (providerId) => {
          const profile = await getUserProfile(providerId);
          const photos = await getProfilePhotos(providerId);
          return {
            providerId,
            providerProfile: profile || undefined,
            providerPhotos: photos,
          };
        })
      );

      setProviders(providersWithProfiles);
    } catch (err: any) {
      console.error('Error loading providers:', err);
    } finally {
      setLoadingProviders(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
  };

  if (loading || loadingProviders) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <p className="text-rose-700 font-light">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-rose-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-light tracking-wide text-rose-900">Hoek</h1>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
                <Link
                  href="/dashboard"
                  className="text-rose-700 hover:text-rose-900 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-rose-50"
                >
                  Gallery
                </Link>
                {userProfile?.isProvider && (
                  <Link
                    href="/dashboard/profile"
                    className="text-rose-700 hover:text-rose-900 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-rose-50"
                  >
                    Profile
                  </Link>
                )}
                {userProfile?.isClient && (
                  <Link
                    href="/dashboard/browse"
                    className="text-rose-700 hover:text-rose-900 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-rose-50"
                  >
                    Browse
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/dashboard/profile"
                className="text-rose-700 text-sm hover:text-rose-900 transition-colors"
              >
                {userProfile?.displayName || user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-200/50 hover:shadow-xl hover:shadow-rose-300/50 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-4xl font-light text-rose-900 mb-2 tracking-wide">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {providers.map((provider) => {
            const primaryPhoto = provider.providerPhotos?.find((p) => p.isPrimary) || provider.providerPhotos?.[0];
            
            return (
              <div
                key={provider.providerId}
                className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg shadow-rose-100/50 border border-rose-100/50 overflow-hidden hover:bg-white/80 hover:shadow-xl hover:shadow-rose-200/50 transition-all transform hover:-translate-y-1 relative"
              >
                {primaryPhoto && (
                  <div 
                    className="relative w-full h-64 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <img
                      src={primaryPhoto.url}
                      alt={provider.providerProfile?.displayName || 'Provider'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-rose-300/50">
                      50 euro
                    </div>
                  </div>
                )}
                {!primaryPhoto && (
                  <div className="relative w-full h-64 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                    <div className="text-5xl text-rose-300">🌹</div>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-rose-300/50">
                      50 euro
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-light text-rose-900 mb-2 tracking-wide">
                    {provider.providerProfile?.displayName || 'Provider'}
                  </h3>
                  {provider.providerProfile?.location && (
                    <p className="text-rose-600/70 text-sm font-light mb-2 flex items-center">
                      📍 {provider.providerProfile.location}
                    </p>
                  )}
                  {provider.providerProfile?.whatsappPhone || provider.providerProfile?.phoneNumber ? (
                    <a
                      href={`tel:${provider.providerProfile?.whatsappPhone || provider.providerProfile?.phoneNumber}`}
                      className="inline-block mt-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 transition-all transform hover:scale-105"
                    >
                      {provider.providerProfile?.whatsappPhone || provider.providerProfile?.phoneNumber}
                    </a>
                  ) : (
                    <p className="text-rose-700/80 text-sm font-light mt-2">
                      No phone number
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {providers.length === 0 && (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg shadow-rose-100/50 border border-rose-100/50 p-12 text-center">
            <p className="text-xl text-rose-800/80 font-light">
              No providers found.
            </p>
          </div>
        )}
      </main>

      {/* Image Gallery Modal */}
      {selectedProvider && selectedProvider.providerPhotos && selectedProvider.providerPhotos.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProvider(null)}
        >
          <div 
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-light text-rose-900 tracking-wide">
                {selectedProvider.providerProfile?.displayName || 'Aanbieder'}
              </h3>
              <button
                onClick={() => setSelectedProvider(null)}
                className="text-rose-700 hover:text-rose-900 text-3xl font-light w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-50 transition-all"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedProvider.providerPhotos.map((photo) => (
                <div key={photo.id} className="relative aspect-square overflow-hidden rounded-2xl">
                  <img
                    src={photo.url}
                    alt={selectedProvider.providerProfile?.displayName || 'Aanbieder'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

