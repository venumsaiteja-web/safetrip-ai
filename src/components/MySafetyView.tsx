import React, { useState } from 'react';
import {
  UserCheck,
  Shield,
  Save,
  CheckCircle2,
  Copy,
  Check,
  Phone,
  BookmarkCheck,
  AlertTriangle,
  Hotel,
  User,
  HeartPulse,
} from 'lucide-react';
import { UserSafetyProfile, LocationData, Language } from '../types';
import { SAFETY_CHECKLIST_ITEMS, EMERGENCY_GUIDES } from '../data/sampleData';

interface MySafetyViewProps {
  userProfile: UserSafetyProfile;
  onUpdateProfile: (profile: UserSafetyProfile) => void;
  activeLocation: LocationData;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateToGuide: (guideId: string) => void;
}

export const MySafetyView: React.FC<MySafetyViewProps> = ({
  userProfile,
  onUpdateProfile,
  activeLocation,
  language,
  onLanguageChange,
  onNavigateToGuide,
}) => {
  const [formData, setFormData] = useState<UserSafetyProfile>(userProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedCard, setCopiedCard] = useState(false);

  const handleCheckboxToggle = (id: string) => {
    const isCompleted = formData.completedChecklist.includes(id);
    const updatedChecklist = isCompleted
      ? formData.completedChecklist.filter((c) => c !== id)
      : [...formData.completedChecklist, id];

    const updatedProfile = { ...formData, completedChecklist: updatedChecklist };
    setFormData(updatedProfile);
    onUpdateProfile(updatedProfile);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const progressPercentage = Math.round(
    (formData.completedChecklist.length / SAFETY_CHECKLIST_ITEMS.length) * 100
  );

  const digitalCardText = `🪪 TOURIST EMERGENCY PROFILE CARD
• Traveler: ${formData.travelerName || 'Tourist'}
• Current Destination: ${activeLocation.name} (${activeLocation.country})
• Hotel / Stay: ${formData.hotelOrStay || 'Not specified'}
• Blood Group: ${formData.bloodGroup || 'Not specified'}
• Emergency Contact: ${formData.emergencyContactName || 'None'} (${formData.emergencyContactPhone || 'N/A'})
• Preferred Language: ${formData.preferredLanguage.toUpperCase()}
• SafeTrip Readiness Score: ${progressPercentage}% (${formData.completedChecklist.length}/${SAFETY_CHECKLIST_ITEMS.length})
Verified locally on SafeTrip AI`;

  const handleCopyCard = () => {
    navigator.clipboard.writeText(digitalCardText);
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2500);
  };

  const bookmarkedGuides = EMERGENCY_GUIDES.filter((g) =>
    userProfile.savedGuideIds.includes(g.id)
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-teal-600 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-4 h-4" />
            <span>Personal Crisis Preparedness</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            My Safety & Emergency Profile
          </h1>
          <p className="text-xs text-slate-500">
            Stored locally on your device only. Accessible without cellular connectivity.
          </p>
        </div>

        <button
          onClick={handleCopyCard}
          className="self-start sm:self-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors shadow-xs"
        >
          {copiedCard ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedCard ? 'Copied Card!' : 'Copy Emergency ID Card'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Profile */}
        <div className="lg:col-span-7 space-y-6">
          {/* Profile Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <User className="w-4 h-4 text-teal-600" />
              <span>Traveler & Emergency Contacts</span>
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.travelerName}
                    onChange={(e) => setFormData({ ...formData, travelerName: e.target.value })}
                    placeholder="e.g., Alex Johnson"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                    Blood Group (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    placeholder="e.g., O+, B+, A-"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                  Current Hotel / Resort / Stay Address
                </label>
                <input
                  type="text"
                  value={formData.hotelOrStay}
                  onChange={(e) => setFormData({ ...formData, hotelOrStay: e.target.value })}
                  placeholder="e.g., Miramar Grand Resort, Room 302, North Goa"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>Trusted Emergency Contact Person</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Contact Name / Relation
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) =>
                        setFormData({ ...formData, emergencyContactName: e.target.value })
                      }
                      placeholder="e.g., Sarah (Spouse) / Dad"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Phone Number (with Country Code)
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, emergencyContactPhone: e.target.value })
                      }
                      placeholder="e.g., +1 555-0199 or +91 9876543210"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-500">
                  Data persists in your browser&apos;s localStorage
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Local Profile</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200 text-center">
                  Safety profile saved to local storage!
                </div>
              )}
            </form>
          </div>

          {/* Bookmarked Emergency Guides */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <BookmarkCheck className="w-4 h-4 text-teal-600" />
              <span>Saved Offline Guides ({bookmarkedGuides.length})</span>
            </h2>

            {bookmarkedGuides.length > 0 ? (
              <div className="space-y-2">
                {bookmarkedGuides.map((guide) => (
                  <div
                    key={guide.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-800">{guide.title}</div>
                      <div className="text-[10px] text-slate-500">{guide.category} &bull; Grade: {guide.severityGrade}</div>
                    </div>
                    <button
                      onClick={() => onNavigateToGuide(guide.id)}
                      className="text-xs text-teal-700 font-bold hover:underline"
                    >
                      Read Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                No guides bookmarked yet. Visit the Emergency Guide tab and click &quot;Save Offline&quot;.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Readiness Checklist & Digital Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Readiness Meter Card */}
          <div className="bg-gradient-to-br from-navy-950 to-navy-900 text-white rounded-2xl p-5 sm:p-6 border border-navy-800 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Tourist Readiness Score
              </span>
              <span className="text-xl font-black text-white">{progressPercentage}%</span>
            </div>

            <div className="w-full bg-navy-800 rounded-full h-3 mt-3 overflow-hidden border border-navy-700">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  progressPercentage >= 75
                    ? 'bg-emerald-400'
                    : progressPercentage >= 50
                    ? 'bg-teal-400'
                    : 'bg-amber-400'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              {progressPercentage >= 75
                ? 'High Readiness: You have satisfied key emergency requirements.'
                : 'Action Needed: Complete the remaining safety checklist items below before outdoor travel.'}
            </p>
          </div>

          {/* Interactive Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Tourist Disaster Checklist</span>
            </h2>

            <div className="space-y-2.5">
              {SAFETY_CHECKLIST_ITEMS.map((item) => {
                const checked = formData.completedChecklist.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      checked
                        ? 'bg-teal-50/50 border-teal-200'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCheckboxToggle(item.id)}
                      className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
                    />
                    <div className="text-xs leading-relaxed">
                      <span className={checked ? 'text-slate-800 line-through text-slate-500' : 'text-slate-800 font-medium'}>
                        {item.text}
                      </span>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold mt-0.5">
                        {item.category}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
