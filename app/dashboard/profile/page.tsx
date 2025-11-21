'use client';

import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { uploadImage } from '@/lib/firebase/storage';
import { addProfilePhoto, getProfilePhotos, ProfilePhoto, deleteProfilePhoto } from '@/lib/firebase/firestore';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [photos, setPhotos] = useState<ProfilePhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [isProvider, setIsProvider] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [savingPhoneNumber, setSavingPhoneNumber] = useState(false);
  const [location, setLocation] = useState('');
  const [savingLocation, setSavingLocation] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user && userProfile) {
      setIsProvider(userProfile.isProvider || false);
      setPhoneNumber(userProfile.phoneNumber || '');
      setLocation(userProfile.location || '');
      loadPhotos();
    }
    
    // Cleanup camera stream on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [user, loading, router, userProfile]);

  const loadPhotos = async () => {
    if (!user) return;
    try {
      const userPhotos = await getProfilePhotos(user.uid);
      setPhotos(userPhotos);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Alleen afbeeldingen zijn toegestaan (JPG, PNG, WEBP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Bestand is te groot (max 10MB)');
      return;
    }

    await uploadPhotoFile(file);
  };

  const uploadPhotoFile = async (file: File) => {
    if (!user) return;

    setUploading(true);
    setError('');

    try {
      const url = await uploadImage(file, 'profile-photos', user.uid);
      const isFirstPhoto = photos.length === 0;
      await addProfilePhoto(user.uid, url, isFirstPhoto);
      await loadPhotos();
    } catch (err: any) {
      setError(err.message || 'Upload mislukt');
    } finally {
      setUploading(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }, // Front camera for selfie
        audio: false,
      });
      setStream(mediaStream);
      setShowCamera(true);
      // Wait a bit for the video element to be ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err: any) {
      setError('Kan camera niet openen. Controleer je browser instellingen.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const captureSelfie = () => {
    if (!videoRef.current || !user) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], `selfie_${Date.now()}.jpg`, { type: 'image/jpeg' });
          stopCamera();
          await uploadPhotoFile(file);
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const handleSetPrimary = async (photoId: string) => {
    if (!user) return;
    try {
      // Update all photos to set the selected one as primary
      const photosRef = collection(db, 'profile-photos');
      const userPhotosQuery = query(photosRef, where('userId', '==', user.uid));
      const snapshot = await getDocs(userPhotosQuery);
      
      const batch = snapshot.docs.map(async (docSnapshot) => {
        await updateDoc(docSnapshot.ref, { 
          isPrimary: docSnapshot.id === photoId 
        });
      });
      await Promise.all(batch);
      await loadPhotos();
    } catch (err: any) {
      setError(err.message || 'Fout bij instellen hoofdfoto');
    }
  };

  const handleDeletePhoto = async (photoId: string, photoUrl: string) => {
    if (!user) return;
    if (!confirm('Weet je zeker dat je deze foto wilt verwijderen?')) return;
    
    try {
      await deleteProfilePhoto(photoId);
      // Optionally delete from storage too
      await loadPhotos();
    } catch (err: any) {
      setError(err.message || 'Fout bij verwijderen foto');
    }
  };

  const handleSaveProviderStatus = async () => {
    if (!user) return;
    
    setSaving(true);
    setError('');

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        isProvider: isProvider,
      });
      
      // Reload the page to update the profile
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Fout bij opslaan');
      setSaving(false);
    }
  };

  const handleSavePhoneNumber = async () => {
    if (!user) return;

    // Basic validation - check if it's a valid phone number format
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber.trim())) {
      setError('Voer een geldig telefoonnummer in');
      return;
    }

    setSavingPhoneNumber(true);
    setError('');

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        phoneNumber: phoneNumber.trim() || null,
      });
      
      // Reload the page to update the profile
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Fout bij opslaan');
      setSavingPhoneNumber(false);
    }
  };

  const handleSaveLocation = async () => {
    if (!user) return;

    setSavingLocation(true);
    setError('');

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        location: location.trim() || null,
      });
      
      // Reload the page to update the profile
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Fout bij opslaan');
      setSavingLocation(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
        <p className="text-rose-700">Laden...</p>
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
              <Link href="/dashboard" className="text-2xl font-light tracking-wide text-rose-900">
                Hoek
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="text-rose-700 hover:text-rose-900 px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-rose-50"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-100/50 p-8 md:p-12">
          <h1 className="text-4xl font-light text-rose-900 mb-8 tracking-wide">
            Profiel Instellen
          </h1>

          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-light mb-6">
              {error}
            </div>
          )}

          {/* Phone Number Form */}
          <div className="mb-12 p-6 bg-gradient-to-br from-rose-100/50 via-pink-100/50 to-purple-100/50 rounded-2xl border border-rose-200/50">
            <h2 className="text-2xl font-light text-rose-900 mb-4 tracking-wide">
              Telefoonnummer
            </h2>
            <p className="text-rose-700/80 mb-6 font-light leading-relaxed">
              Voeg je telefoonnummer toe zodat anderen je kunnen bereiken.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+31 6 12345678"
                  className="w-full px-4 py-3 rounded-2xl border border-rose-300 bg-white/80 backdrop-blur-sm text-rose-900 placeholder-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent font-light"
                />
              </div>
              <button
                onClick={handleSavePhoneNumber}
                disabled={savingPhoneNumber}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {savingPhoneNumber ? 'Opslaan...' : 'Opslaan'}
              </button>
            </div>
            {userProfile?.phoneNumber && (
              <p className="mt-4 text-sm text-rose-600/80 font-light">
                Huidig opgeslagen nummer: {userProfile.phoneNumber}
              </p>
            )}
          </div>

          {/* Location Form */}
          <div className="mb-12 p-6 bg-gradient-to-br from-rose-100/50 via-pink-100/50 to-purple-100/50 rounded-2xl border border-rose-200/50">
            <h2 className="text-2xl font-light text-rose-900 mb-4 tracking-wide">
              Locatie
            </h2>
            <p className="text-rose-700/80 mb-6 font-light leading-relaxed">
              Voeg je locatie toe zodat anderen weten waar je bent.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Bijv. Amsterdam, Rotterdam, Utrecht"
                  className="w-full px-4 py-3 rounded-2xl border border-rose-300 bg-white/80 backdrop-blur-sm text-rose-900 placeholder-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent font-light"
                />
              </div>
              <button
                onClick={handleSaveLocation}
                disabled={savingLocation}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {savingLocation ? 'Opslaan...' : 'Opslaan'}
              </button>
            </div>
            {userProfile?.location && (
              <p className="mt-4 text-sm text-rose-600/80 font-light">
                Huidige locatie: {userProfile.location}
              </p>
            )}
          </div>

          {/* Provider Toggle */}
          <div className="mb-12 p-6 bg-gradient-to-br from-rose-100/50 via-pink-100/50 to-purple-100/50 rounded-2xl border border-rose-200/50">
            <h2 className="text-2xl font-light text-rose-900 mb-4 tracking-wide">
              Aanbieder worden
            </h2>
            <p className="text-rose-700/80 mb-6 font-light leading-relaxed">
              Schakel dit in als je seks wilt verkopen. Je kunt altijd zowel verkopen als kopen.
            </p>
            <label className="flex items-center space-x-4 cursor-pointer">
              <input
                type="checkbox"
                checked={isProvider}
                onChange={(e) => setIsProvider(e.target.checked)}
                className="w-6 h-6 rounded border-rose-300 text-rose-500 focus:ring-rose-400 focus:ring-2"
              />
              <span className="text-lg font-light text-rose-900">
                Ik wil seks verkopen
              </span>
            </label>
            {isProvider && (
              <button
                onClick={handleSaveProviderStatus}
                disabled={saving}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-300/50 hover:shadow-xl hover:shadow-rose-400/50 transition-all transform hover:scale-105 disabled:opacity-50"
              >
                {saving ? 'Opslaan...' : 'Opslaan'}
              </button>
            )}
          </div>

          {/* Photo Upload Section */}
          {isProvider && (
            <div className="mb-8">
              <h2 className="text-2xl font-light text-rose-900 mb-6 tracking-wide">
                Profielfoto's
              </h2>
              <p className="text-rose-700/80 mb-6 font-light leading-relaxed">
                Upload foto's van jezelf of neem een selfie. De eerste foto wordt automatisch je hoofdfoto.
              </p>

              {/* Camera Section */}
              {showCamera && (
                <div className="mb-6 p-6 bg-gradient-to-br from-rose-100/50 via-pink-100/50 to-purple-100/50 rounded-2xl border border-rose-200/50">
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-2xl max-h-96 object-cover"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                      <button
                        onClick={captureSelfie}
                        className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-600 shadow-lg shadow-rose-300/50 transition-all transform hover:scale-105"
                      >
                        📸 Foto maken
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-6 py-3 bg-white/90 text-rose-700 rounded-full text-sm font-medium hover:bg-white transition-all"
                      >
                        Annuleren
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Options */}
              {!showCamera && (
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={startCamera}
                    disabled={uploading}
                    className="px-6 py-4 border-2 border-rose-300 rounded-2xl bg-rose-50/50 hover:bg-rose-100/50 cursor-pointer transition-all text-center disabled:opacity-50"
                  >
                    <p className="text-rose-700 font-light text-lg mb-1">
                      📸
                    </p>
                    <p className="text-rose-700 font-light">
                      Neem een selfie
                    </p>
                  </button>
                  <label className="block">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    <div className="w-full px-6 py-4 border-2 border-dashed border-rose-300 rounded-2xl bg-rose-50/50 hover:bg-rose-100/50 cursor-pointer transition-all text-center disabled:opacity-50">
                      {uploading ? (
                        <p className="text-rose-700 font-light">Uploaden...</p>
                      ) : (
                        <>
                          <p className="text-rose-700 font-light text-lg mb-1">
                            📷
                          </p>
                          <p className="text-rose-700 font-light">
                            Upload foto
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              )}

              {/* Photo Grid */}
              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group rounded-2xl overflow-hidden shadow-lg"
                    >
                      <img
                        src={photo.url}
                        alt="Profile"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        {!photo.isPrimary && (
                          <button
                            onClick={() => handleSetPrimary(photo.id)}
                            className="px-4 py-2 bg-white/90 text-rose-700 rounded-full text-sm font-light hover:bg-white transition-all"
                          >
                            Maak hoofdfoto
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePhoto(photo.id, photo.url)}
                          className="px-4 py-2 bg-red-500/90 text-white rounded-full text-sm font-light hover:bg-red-600 transition-all"
                        >
                          Verwijder
                        </button>
                      </div>
                      {photo.isPrimary && (
                        <div className="absolute top-2 left-2 bg-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Hoofdfoto
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {photos.length === 0 && !uploading && (
                <div className="text-center py-12 text-rose-600/60 font-light">
                  <p className="text-lg mb-2">Nog geen foto's geüpload</p>
                  <p className="text-sm">Upload je eerste foto om te beginnen</p>
                </div>
              )}
            </div>
          )}

          {!isProvider && (
            <div className="text-center py-12 text-rose-600/60 font-light">
              <p className="text-lg mb-2">Schakel "Aanbieder worden" in om foto's te uploaden</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
