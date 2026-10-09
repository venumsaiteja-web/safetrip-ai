import React, { useState } from 'react';
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Search,
  CheckCircle,
  XCircle,
  Printer,
  ChevronRight,
  Shield,
  Droplets,
  Wind,
  CloudRain,
  Briefcase,
  Radio,
  AlertTriangle,
  Phone,
} from 'lucide-react';
import { EmergencyGuideSection } from '../types';
import { EMERGENCY_GUIDES } from '../data/sampleData';

interface EmergencyGuideViewProps {
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const EmergencyGuideView: React.FC<EmergencyGuideViewProps> = ({
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(EMERGENCY_GUIDES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [activePhase, setActivePhase] = useState<'Before Hazard' | 'During Hazard' | 'After Hazard'>('During Hazard');

  const selectedGuide =
    EMERGENCY_GUIDES.find((g) => g.id === selectedGuideId) || EMERGENCY_GUIDES[0];

  const filteredGuides = EMERGENCY_GUIDES.filter((guide) => {
    const matchesCategory = categoryFilter === 'all' || guide.category === categoryFilter;
    const matchesQuery =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getGuideIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-teal-500" />;
      case 'CloudRain':
        return <CloudRain className="w-5 h-5 text-indigo-500" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-amber-500" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-purple-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isBookmarked = bookmarkedIds.includes(selectedGuide.id);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Title & Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-teal-600 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Offline Survival Repository</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Emergency Safety & Preparedness Guides
          </h1>
          <p className="text-xs text-slate-500">
            Fully accessible offline. Bookmark essential guides to your personal safety dashboard.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-200"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Guide selector search & category tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter guides (e.g., flood, cyclone, grab bag)..."
            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex space-x-1 overflow-x-auto pb-1 scrollbar-none">
          {['all', 'Water Hazards', 'Severe Storms', 'Preparedness', 'Communication'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                categoryFilter === cat
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Guide List & Reader Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Guide Cards List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
          {filteredGuides.map((guide) => {
            const isSelected = guide.id === selectedGuide.id;
            const bookmarked = bookmarkedIds.includes(guide.id);
            return (
              <div
                key={guide.id}
                onClick={() => setSelectedGuideId(guide.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-white border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getGuideIcon(guide.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {guide.category}
                      </span>
                      {guide.severityGrade === 'Crucial' && (
                        <span className="text-[9px] bg-red-100 text-red-800 font-extrabold px-1.5 py-0.2 rounded">
                          CRUCIAL
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">{guide.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(guide.id);
                    }}
                    className="p-1 text-slate-400 hover:text-teal-600 rounded transition-colors"
                    title={bookmarked ? 'Remove bookmark' : 'Save for offline'}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-teal-600 fill-teal-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                  <ChevronRight
                    className={`w-4 h-4 ${isSelected ? 'text-teal-600' : 'text-slate-300'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Detailed Guide Reader */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                  {selectedGuide.category}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                  Grade: {selectedGuide.severityGrade}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">{selectedGuide.title}</h2>
              <p className="text-xs text-slate-600 mt-1">{selectedGuide.summary}</p>
            </div>

            <button
              onClick={() => onToggleBookmark(selectedGuide.id)}
              className={`p-2 rounded-xl border flex items-center space-x-1.5 text-xs font-bold transition-all ${
                isBookmarked
                  ? 'bg-teal-50 border-teal-300 text-teal-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-teal-600" />
                  <span>Saved Offline</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save Offline</span>
                </>
              )}
            </button>
          </div>

          {/* Action Steps Phases Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Action Protocol Timeline
              </h3>
            </div>
            <div className="flex space-x-2 p-1 bg-slate-100 rounded-xl mb-3">
              {(['Before Hazard', 'During Hazard', 'After Hazard'] as const).map((phase) => (
                <button
                  key={phase}
                  onClick={() => setActivePhase(phase)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activePhase === phase
                      ? 'bg-navy-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>

            {/* Steps for current phase */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5">
              {selectedGuide.actionSteps
                .find((s) => s.phase === activePhase)
                ?.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center space-x-1.5 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Critical Do&apos;s</span>
              </h4>
              <ul className="space-y-2 text-xs text-emerald-950">
                {selectedGuide.doAndDont.do.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wide flex items-center space-x-1.5 mb-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Life-Threatening Don&apos;ts</span>
              </h4>
              <ul className="space-y-2 text-xs text-rose-950">
                {selectedGuide.doAndDont.dont.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hazard Helplines */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-slate-800">Relevant Helplines:</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {selectedGuide.emergencyNumbers.map((num, i) => (
                <a
                  key={i}
                  href={`tel:${num.number.split('/')[0].trim()}`}
                  className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:border-teal-400 font-mono font-medium"
                >
                  {num.label}: <strong className="text-red-600">{num.number}</strong>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
