import React, { useState } from 'react';
import {
  X,
  PhoneCall,
  Copy,
  Share2,
  Check,
  AlertTriangle,
  MapPin,
  ExternalLink,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { LocationData, UserSafetyProfile } from '../types';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLocation: LocationData;
  userProfile: UserSafetyProfile;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  activeLocation,
  userProfile,
}) => {
  const [copied, setCopied] = useState(false);
  const [showConfirmShare, setShowConfirmShare] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const timestamp = new Date().toLocaleString();
  const mapsLink = `https://maps.google.com/?q=${activeLocation.lat},${activeLocation.lon}`;

  // Formatted distress message
  const emergencyMessage = `🚨 EMERGENCY DISTRESS ALERT 🚨
I am a tourist requiring urgent assistance due to severe weather/crisis.

• Name: ${userProfile.travelerName || 'Tourist'}
• Current Location: ${activeLocation.name} (${activeLocation.region}, ${activeLocation.country})
• Exact Coordinates: Lat ${activeLocation.lat}, Lon ${activeLocation.lon}
• Map Link: ${mapsLink}
• Hotel / Stay: ${userProfile.hotelOrStay || 'Not specified'}
• Blood Group: ${userProfile.bloodGroup || 'Not specified'}
• Time Sent: ${timestamp}

Please contact local emergency responders (Dial 112) immediately!`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(emergencyMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  const handleExecuteShare = async () => {
    setShowConfirmShare(false);
    if (navigator.share) {
      try {
        await navigator.share({
          title: '🚨 Emergency Distress - SafeTrip AI',
          text: emergencyMessage,
          url: mapsLink,
        });
        setShareFeedback('Distress message sent to your sharing app.');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setShareFeedback('Sharing could not be completed. Use the Copy button instead.');
        }
      }
    } else {
      handleCopyMessage();
      setShareFeedback('Device sharing not supported on this browser. Message copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border-2 border-red-500 overflow-hidden">
        {/* Urgent Red Header */}
        <div className="bg-red-600 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">Tourist Emergency SOS</h2>
              <p className="text-xs text-red-100">Distress Communication & Rapid Help Hub</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-red-200 hover:text-white hover:bg-red-700/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Explicit disclaimer about emergency services */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start space-x-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>IMPORTANT NOTICE:</strong> Pressing SOS or sharing does <em>not</em> directly dispatch police or ambulances. This screen formats your coordinates and distress message for instant transmission via WhatsApp, SMS, or phone.
            </div>
          </div>

          {/* Current Location & Coordinates */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>Your Active Coordinates</span>
              </div>
              <div className="font-bold text-slate-800 text-sm sm:text-base mt-0.5">
                {activeLocation.name}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Lat: {activeLocation.lat}, Lon: {activeLocation.lon}
              </div>
            </div>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-lg font-medium flex items-center space-x-1 transition-colors"
            >
              <span>View Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Emergency Helplines Direct Dial */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-red-600" />
              <span>Direct Emergency Helpline Numbers</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <a
                href="tel:112"
                className="flex flex-col items-center justify-center p-2.5 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-center transition-colors group"
              >
                <span className="text-[11px] text-slate-600 font-medium">Universal (India/EU)</span>
                <span className="text-lg font-black text-red-600 group-hover:scale-105 transition-transform">112</span>
              </a>
              <a
                href="tel:1363"
                className="flex flex-col items-center justify-center p-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-center transition-colors group"
              >
                <span className="text-[11px] text-slate-600 font-medium">Tourist Police</span>
                <span className="text-lg font-black text-blue-700 group-hover:scale-105 transition-transform">1363</span>
              </a>
              <a
                href="tel:1070"
                className="flex flex-col items-center justify-center p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-center transition-colors group col-span-2 sm:col-span-1"
              >
                <span className="text-[11px] text-slate-600 font-medium">Disaster Control</span>
                <span className="text-lg font-black text-amber-700 group-hover:scale-105 transition-transform">1070</span>
              </a>
            </div>
          </div>

          {/* Configured Emergency Contact */}
          {userProfile.emergencyContactPhone && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-emerald-800 uppercase">
                  Personal Emergency Contact
                </div>
                <div className="font-bold text-slate-800 text-sm">
                  {userProfile.emergencyContactName || 'Trusted Contact'}
                </div>
                <div className="text-xs text-slate-600 font-mono">
                  {userProfile.emergencyContactPhone}
                </div>
              </div>
              <a
                href={`tel:${userProfile.emergencyContactPhone}`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call Contact</span>
              </a>
            </div>
          )}

          {/* Formatted Emergency Message Preview */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1 tracking-wider">
              Prepared Distress Message (Auto-Filled)
            </label>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs whitespace-pre-wrap border border-slate-800 leading-relaxed">
              {emergencyMessage}
            </div>
          </div>

          {/* Confirmation step before sharing */}
          {showConfirmShare ? (
            <div className="p-4 bg-red-50 border-2 border-red-300 rounded-xl space-y-3">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-900">Confirm Sharing Distress Message</h4>
                  <p className="text-xs text-red-800 mt-0.5">
                    This will open your phone's native sharing sheet (WhatsApp, SMS, or Telegram) with your live coordinates and distress text.
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 justify-end">
                <button
                  onClick={() => setShowConfirmShare(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteShare}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
                >
                  Confirm & Open Share Sheet
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                onClick={handleCopyMessage}
                id="btn-copy-sos"
                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>1-Click Copy Distress Message</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowConfirmShare(true)}
                id="btn-share-sos"
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share via SMS / WhatsApp</span>
              </button>
            </div>
          )}

          {shareFeedback && (
            <div className="text-xs text-center text-teal-800 bg-teal-50 p-2 rounded-lg border border-teal-200 font-medium">
              {shareFeedback}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>SafeTrip AI Distress Module</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
