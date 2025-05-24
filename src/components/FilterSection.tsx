import React, { useState, useEffect, useRef } from 'react';
import { FilterState, CategoryData } from '../types';
import { Search, X, Clock, ChevronDown, CheckCircle2, Circle, Star, FileText, Filter, List, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { isUpcomingDeadline } from '../utils/dateUtils';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Link, useLocation } from 'react-router-dom';

// Import data files
import aiData from '../data/2025/ai.json';
import systemsData from '../data/2025/systems.json';
import securityData from '../data/2025/security.json';
import quantumData from '../data/2025/quantum.json';
import theoryData from '../data/2025/theory.json';
import softwareData from '../data/2025/software.json';

interface FilterSectionProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  categories: CategoryData[];
}

const categoryFullNames: Record<string, string> = {
  'AI/ML': 'Artificial Intelligence & Machine Learning',
  'Systems': 'Systems & Architecture',
  'Software': 'Software Engineering & Programming Languages',
  'Theory': 'Theoretical Computer Science',
  'HCI': 'Human-Computer Interaction',
  'Data': 'Data Management & Analytics',
  'Security': 'Security & Privacy',
  'Graphics': 'Computer Graphics & Visualization',
  'Bio': 'Bioinformatics & Computational Biology',
  'Robotics': 'Robotics & Automation',
  'Quantum': 'Quantum Computing & Information',
  'Socio-Tech': 'Socio-Technical Systems & Computing'
};

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  setFilters,
  categories,
}) => {
  const location = useLocation();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showRankingFilter, setShowRankingFilter] = useState(false);
  const typeFilterRef = useRef<HTMLDivElement>(null);
  const rankingFilterRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeFilterRef.current && !typeFilterRef.current.contains(event.target as Node)) {
        setShowTypeFilter(false);
      }
      if (rankingFilterRef.current && !rankingFilterRef.current.contains(event.target as Node)) {
        setShowRankingFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMainCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const subcategoryIds = category.subcategories.map(sub => sub.id);
    
    setFilters(prev => {
      const currentSubcategories = new Set(prev.subcategories);
      const allSelected = subcategoryIds.every(id => currentSubcategories.has(id));
      
      if (allSelected) {
        return {
          ...prev,
          subcategories: prev.subcategories.filter(id => !subcategoryIds.includes(id)),
          page: 1
        };
      } else {
        const newSubcategories = new Set([...prev.subcategories, ...subcategoryIds]);
        return {
          ...prev,
          subcategories: Array.from(newSubcategories),
          page: 1
        };
      }
    });
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setFilters(prev => ({
      ...prev,
      subcategories: prev.subcategories.includes(subcategoryId)
        ? prev.subcategories.filter(id => id !== subcategoryId)
        : [...prev.subcategories, subcategoryId],
      page: 1
    }));
  };

  const toggleType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type],
      page: 1
    }));
  };

  const toggleRanking = (ranking: string) => {
    setFilters(prev => ({
      ...prev,
      rankings: prev.rankings.includes(ranking)
        ? prev.rankings.filter(r => r !== ranking)
        : [...prev.rankings, ranking],
      page: 1
    }));
  };

  const clearSearch = () => {
    setFilters(prev => ({
      ...prev,
      searchQuery: '',
      page: 1
    }));
    searchInputRef.current?.focus();
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      subcategories: [],
      locations: [],
      upcoming: true,
      searchQuery: '',
      types: [],
      rankings: [],
      page: 1,
      perPage: 10
    });
  };

  const hasActiveFilters = filters.subcategories.length > 0 || 
                          filters.searchQuery || 
                          filters.types.length > 0 || 
                          filters.rankings.length > 0;

  const types = ['conference', 'workshop', 'journal'];
  const rankings = ['A*', 'A', 'B', 'C'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conference':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'workshop':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'journal':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getRankingColor = (ranking: string) => {
    switch (ranking) {
      case 'A*':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'A':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'B':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'C':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getSubcategoryCounts = (subcategoryId: string) => {
    // Combine all submission types from all areas
    const allSubmissions = [
      ...aiData.conferences || [],
      ...systemsData.conferences || [],
      ...securityData.conferences || [],
      ...quantumData.conferences || [],
      ...theoryData.conferences || [],
      ...softwareData.conferences || [],
      ...aiData.workshops || [],
      ...systemsData.workshops || [],
      ...securityData.workshops || [],
      ...quantumData.workshops || [],
      ...theoryData.workshops || [],
      ...softwareData.workshops || [],
      ...aiData.journals || [],
      ...systemsData.journals || [],
      ...securityData.journals || [],
      ...quantumData.journals || [],
      ...theoryData.journals || [],
      ...softwareData.journals || []
    ];

    const subcategorySubmissions = allSubmissions.filter(submission => 
      submission.subcategories && submission.subcategories.includes(subcategoryId)
    );

    return {
      total: subcategorySubmissions.length,
      active: subcategorySubmissions.filter(submission => {
        if (submission.deadline === 'Rolling') return true;
        return isUpcomingDeadline(submission.deadline);
      }).length
    };
  };

  const getCategoryCounts = (categoryId: string) => {
    // Combine all submission types from all areas
    const allSubmissions = [
      ...aiData.conferences || [],
      ...systemsData.conferences || [],
      ...securityData.conferences || [],
      ...quantumData.conferences || [],
      ...theoryData.conferences || [],
      ...softwareData.conferences || [],
      ...aiData.workshops || [],
      ...systemsData.workshops || [],
      ...securityData.workshops || [],
      ...quantumData.workshops || [],
      ...theoryData.workshops || [],
      ...softwareData.workshops || [],
      ...aiData.journals || [],
      ...systemsData.journals || [],
      ...securityData.journals || [],
      ...quantumData.journals || [],
      ...theoryData.journals || [],
      ...softwareData.journals || []
    ];

    const categorySubmissions = allSubmissions.filter(submission => 
      submission.categories && submission.categories.includes(categoryId)
    );

    return {
      total: categorySubmissions.length,
      active: categorySubmissions.filter(submission => {
        if (submission.deadline === 'Rolling') return true;
        return isUpcomingDeadline(submission.deadline);
      }).length
    };
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 
                      bg-gradient-to-br from-primary-100/20 to-primary-200/10 
                      rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 
                      bg-gradient-to-tl from-primary-100/10 to-primary-200/5 
                      rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] 
                       bg-[size:24px_24px] opacity-20" />
      </div>
      
      <div className="relative p-6 space-y-6">
        {/* View Toggle */}
        <div className="flex gap-2">
          <Link to="/" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                       text-sm font-medium transition-all duration-300
                       ${location.pathname === '/' 
                         ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25' 
                         : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 shadow-sm'}`}
            >
              <List className="w-4 h-4" />
              <span>List View</span>
            </motion.button>
          </Link>

          <Link to="/calendar" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                       text-sm font-medium transition-all duration-300
                       ${location.pathname === '/calendar'
                         ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                         : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 shadow-sm'}`}
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar View</span>
            </motion.button>
          </Link>
        </div>

        <div className="space-y-3">
          {/* Search Input */}
          <div className="relative">
            <motion.div
              initial={false}
              animate={{
                scale: searchFocused ? 1.02 : 1,
                boxShadow: searchFocused 
                  ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
              className="relative overflow-hidden rounded-xl bg-white border border-gray-200"
            >
              {/* Search Background Animation */}
              <motion.div
                initial={false}
                animate={{
                  opacity: searchFocused ? 1 : 0,
                  scale: searchFocused ? 1 : 0.95
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary-50/50 via-transparent to-primary-50/50 pointer-events-none"
              />

              {/* Search Icon */}
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <motion.div
                  animate={{
                    scale: searchFocused ? 1.1 : 1,
                    color: searchFocused ? '#0c87eb' : '#9ca3af'
                  }}
                >
                  <Search className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Input Field */}
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search conferences, workshops, journals..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value, page: 1 }))}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-10 pr-10 py-3 bg-transparent
                         text-gray-900 placeholder-gray-500 text-sm
                         focus:outline-none focus:ring-0 relative z-10"
              />

              {/* Clear Button */}
              <AnimatePresence>
                {filters.searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-3 flex items-center z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="p-1 rounded-full hover:bg-gray-100">
                      <X className="w-4 h-4 text-gray-400" />
                    </div>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {searchFocused && filters.searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-2 p-2 bg-white rounded-xl
                           shadow-lg border border-gray-200 z-20"
                >
                  <div className="text-xs text-gray-500 px-2 py-1">
                    Try searching by:
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {[
                      { label: 'Conference Name', example: 'e.g., "NeurIPS"' },
                      { label: 'Location', example: 'e.g., "San Francisco"' },
                      { label: 'Research Area', example: 'e.g., "Machine Learning"' },
                      { label: 'Type', example: 'e.g., "Conference"' }
                    ].map((item, index) => (
                      <div key={index} className="px-2 py-1.5">
                        <div className="font-medium text-sm text-gray-700">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.example}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <motion.button
              onClick={() => setFilters(prev => ({ ...prev, upcoming: !prev.upcoming, page: 1 }))}
              className={`group relative w-full h-12 rounded-xl flex items-center justify-between px-4
                       transition-all duration-300 overflow-hidden
                       ${filters.upcoming 
                         ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50' 
                         : 'bg-gradient-to-r from-rose-50 to-rose-100/50'}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 
                              ${filters.upcoming 
                                ? 'bg-gradient-to-r from-emerald-100/30 to-transparent' 
                                : 'bg-gradient-to-r from-rose-100/30 to-transparent'}`} />
                <div className="absolute inset-0 backdrop-blur-[1px]" />
              </div>

              <div className="relative flex items-center gap-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg
                              transition-colors duration-300
                              ${filters.upcoming 
                                ? 'bg-emerald-100/50 text-emerald-600' 
                                : 'bg-rose-100/50 text-rose-600'}`}>
                  <Clock 
                    className={`w-5 h-5 transition-all duration-300
                             ${filters.upcoming ? 'rotate-0' : '-rotate-45'}`} 
                  />
                </div>
                <span className={`text-sm font-medium transition-colors duration-300
                              ${filters.upcoming ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {filters.upcoming ? 'Active Calls' : 'All Calls'}
                </span>
              </div>

              <div className={`relative w-12 h-6 rounded-full transition-colors duration-300
                           ${filters.upcoming ? 'bg-emerald-200' : 'bg-rose-200'}`}>
                <motion.div
                  animate={{ x: filters.upcoming ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-1 w-4 h-4 rounded-full shadow-sm
                           ${filters.upcoming 
                             ? 'bg-emerald-500' 
                             : 'bg-rose-500'}`}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2">
          {/* Type Filter */}
          <div className="relative flex-1" ref={typeFilterRef}>
            <motion.button
              onClick={() => {
                setShowTypeFilter(!showTypeFilter);
                setShowRankingFilter(false);
              }}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium
                       flex items-center justify-between gap-2
                       transition-all duration-200
                       ${filters.types.length > 0
                         ? 'bg-blue-50 text-blue-600 border border-blue-200'
                         : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-gray-50/80'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Type</span>
                {filters.types.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md text-xs bg-blue-100">
                    {filters.types.length}
                  </span>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200
                                   ${showTypeFilter ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {showTypeFilter && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-2 p-2 bg-white rounded-xl
                           shadow-lg border border-gray-200 z-20"
                >
                  <div className="grid grid-cols-1 gap-1">
                    {types.map(type => (
                      <motion.button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg
                                 text-left text-sm transition-all duration-200
                                 ${filters.types.includes(type)
                                   ? getTypeColor(type)
                                   : 'hover:bg-gray-50'}`}
                        whileHover={{ x: 4 }}
                      >
                        <FileText className="w-4 h-4" />
                        <span className="capitalize">{type}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ranking Filter */}
          <div className="relative flex-1" ref={rankingFilterRef}>
            <motion.button
              onClick={() => {
                setShowRankingFilter(!showRankingFilter);
                setShowTypeFilter(false);
              }}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium
                       flex items-center justify-between gap-2
                       transition-all duration-200
                       ${filters.rankings.length > 0
                         ? 'bg-amber-50 text-amber-600 border border-amber-200'
                         : 'bg-white/80 text-gray-600 border border-gray-200 hover:bg-gray-50/80'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Ranking</span>
                {filters.rankings.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md text-xs bg-amber-100">
                    {filters.rankings.length}
                  </span>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200
                                   ${showRankingFilter ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {showRankingFilter && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 mt-2 p-2 bg-white rounded-xl
                           shadow-lg border border-gray-200 z-20 w-full"
                  style={{ maxWidth: '100%' }}
                >
                  <div className="grid grid-cols-1 gap-1">
                    {rankings.map(ranking => (
                      <motion.button
                        key={ranking}
                        onClick={() => toggleRanking(ranking)}
                        className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg
                                 text-left text-sm transition-all duration-200
                                 ${filters.rankings.includes(ranking)
                                   ? getRankingColor(ranking)
                                   : 'hover:bg-gray-50'}`}
                        whileHover={{ x: 4 }}
                      >
                        <Star className="w-4 h-4" />
                        <span>{ranking}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Categories</h3>
            {hasActiveFilters && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full
                           bg-primary-50 text-primary-600">
                {filters.subcategories.length} selected
              </span>
            )}
          </div>

          <div className="space-y-2">
            {categories.map(category => {
              const isExpanded = expandedCategory === category.id;
              const allSelected = category.subcategories.every(sub => 
                filters.subcategories.includes(sub.id)
              );
              const counts = getCategoryCounts(category.id);
              
              return (
                <motion.div
                  key={category.id}
                  layout
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm
                           shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <motion.button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50/80"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMainCategory(category.id);
                      }}
                    >
                      {allSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-primary-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300" />
                      )}
                    </motion.div>
                    
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <Tooltip.Provider delayDuration={200}>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <span className="text-sm text-gray-900 truncate">
                              {category.name}
                            </span>
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="px-3 py-1.5 rounded-lg bg-gray-900/95 text-white text-xs
                                       shadow-lg backdrop-blur-sm border border-white/10"
                              side="top"
                              sideOffset={5}
                            >
                              {categoryFullNames[category.name] || category.name}
                              <Tooltip.Arrow className="fill-gray-900/95" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-xs font-mono bg-gray-50 text-gray-600 px-2 py-0.5 rounded">
                          {counts.active}/{counts.total}
                        </span>
                        <ChevronDown 
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200
                                   ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-100"
                      >
                        <div className="p-2 bg-gray-50/80">
                          {category.subcategories.map(subcategory => {
                            const counts = getSubcategoryCounts(subcategory.id);
                            return (
                              <Tooltip.Provider delayDuration={200} key={subcategory.id}>
                                <Tooltip.Root>
                                  <Tooltip.Trigger asChild>
                                    <motion.button
                                      onClick={() => toggleSubcategory(subcategory.id)}
                                      className="w-full flex items-center gap-2 p-2 rounded-lg
                                               text-left hover:bg-white/80"
                                      whileHover={{ x: 4 }}
                                    >
                                      {filters.subcategories.includes(subcategory.id) ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-primary-500" />
                                      ) : (
                                        <Circle className="w-3.5 h-3.5 text-gray-300" />
                                      )}
                                      <span className="flex-1 text-xs text-gray-600 truncate">
                                        {subcategory.name}
                                      </span>
                                      <span className="text-[10px] font-mono bg-gray-100/80 text-gray-500 
                                                   px-1.5 py-0.5 rounded ml-2">
                                        {counts.active}/{counts.total}
                                      </span>
                                    </motion.button>
                                  </Tooltip.Trigger>
                                  <Tooltip.Portal>
                                    <Tooltip.Content
                                      className="px-3 py-1.5 rounded-lg bg-gray-900/95 text-white text-xs
                                               shadow-lg backdrop-blur-sm border border-white/10"
                                      side="right"
                                      sideOffset={5}
                
                                    >
                                      {subcategory.name}
                                      <Tooltip.Arrow className="fill-gray-900/95" />
                                    </Tooltip.Content>
                                  </Tooltip.Portal>
                                </Tooltip.Root>
                              </Tooltip.Provider>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={clearFilters}
              className="w-full h-10 rounded-xl flex items-center justify-center gap-2
                       text-rose-600 bg-rose-50/80 border border-rose-200
                       hover:bg-rose-100/80  text-sm font-medium
                       shadow-sm hover:shadow backdrop-blur-sm
                       transition-all duration-200"
            >
              <X className="w-4 h-4" />
              <span>Clear all filters</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterSection;