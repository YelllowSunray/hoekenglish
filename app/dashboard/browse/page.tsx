'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAllActiveServices, Service } from '@/lib/firebase/firestore';
import { getProfilePhotos, ProfilePhoto } from '@/lib/firebase/firestore';
import { getUserProfile, UserProfile } from '@/lib/firebase/auth';
import Link from 'next/link';

export default function BrowsePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<(Service & { providerProfile?: UserProfile; providerPhotos?: ProfilePhoto[] })[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      loadServices();
    }
  }, [user, loading, router]);

  const loadServices = async () => {
    try {
      const allServices = await getAllActiveServices();
      
      // Load provider profiles and photos for each service
      const servicesWithProfiles = await Promise.all(
        allServices.map(async (service) => {
          const profile = await getUserProfile(service.providerId);
          const photos = await getProfilePhotos(service.providerId);
          return {
            ...service,
            providerProfile: profile || undefined,
            providerPhotos: photos,
          };
        })
      );

      setServices(servicesWithProfiles);
    } catch (err: any) {
      console.error('Error loading services:', err);
    } finally {
      setLoadingServices(false);
    }
  };

  if (loading || loadingServices) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Laden...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center text-xl font-bold text-gray-900">
                Hoek
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Beschikbare diensten</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const primaryPhoto = service.providerPhotos?.find((p) => p.isPrimary) || service.providerPhotos?.[0];
              
              return (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {primaryPhoto && (
                    <img
                      src={primaryPhoto.url}
                      alt={service.providerProfile?.displayName || 'Aanbieder'}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {service.providerProfile?.displayName || 'Onbekend'}
                    </p>
                    <p className="text-gray-700 mt-2 text-sm line-clamp-2">{service.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold text-indigo-600">€{service.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{service.duration} minuten</p>
                      </div>
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                        Boeken
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {services.length === 0 && (
            <p className="text-gray-500 text-center py-12">
              Geen beschikbare diensten gevonden.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

