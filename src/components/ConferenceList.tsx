import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConferenceCard from './ConferenceCard';
import { Conference, AreaData, SortField } from '../types';
import { filterConferences } from '../utils/filterUtils';
import { FilterState } from '../types';
import { SearchX, Filter, RefreshCw, Coffee, Brain, Dices, Lightbulb, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, Clock, X, Star } from 'lucide-react';

interface ConferenceListProps {
  areasData: AreaData[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  selectedConference: string | null;
  onClearSelection: () => void;
}

const ConferenceList: React.FC<ConferenceListProps> = ({
  areasData,
  filters,
  setFilters,
  selectedConference,
  onClearSelection
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Conference[]>([]);

  // Memoize the combined submissions to avoid recalculating on every render
  const allSubmissions = useMemo(() => {
    const combined: Conference[] = [];

    areasData.forEach(area => {
      // Add conferences
      if (area.conferences && Array.isArray(area.conferences)) {
        area.conferences.forEach(conf => {
          combined.push({
            ...conf,
            areaColor: area.color
          });
        });
      }

      // Add workshops
      if (area.workshops && Array.isArray(area.workshops)) {
        area.workshops.forEach(workshop => {
          combined.push({
            ...workshop,
            areaColor: area.color
          });
        });
      }

      // Add journals
      if (area.journals && Array.isArray(area.journals)) {
        area.journals.forEach(journal => {
          combined.push({
            ...journal,
            areaColor: area.color
          });
        });
      }

      // Add posters if they exist
      if (area.posters && Array.isArray(area.posters)) {
        area.posters.forEach(poster => {
          combined.push({
            ...poster,
            areaColor: area.color
          });
        });
      }
    });

    return combined;
  }, [areasData, selectedConference]);

  // Effect to handle filtering and sorting
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      let processedSubmissions: Conference[];

      // If there's a selected conference, handle it specially
      if (selectedConference) {
        const selectedSubmission = allSubmissions.find(sub => sub.id === selectedConference);
        const otherSubmissions = allSubmissions.filter(sub => sub.id !== selectedConference);

        if (selectedSubmission) {
          // Apply filters to other submissions
          const filteredOthers = filterConferences(otherSubmissions, filters);

          // Put selected submission first, then filtered others
          processedSubmissions = [selectedSubmission, ...filteredOthers];
        } else {
          // Selected conference not found, proceed normally
          processedSubmissions = filterConferences(allSubmissions, filters);
        }
      } else {
        // Apply filters to the combined list
        processedSubmissions = filterConferences(allSubmissions, filters);
      }

      // Sort submissions only if no conference is selected (selected one should stay at top)
      if (!selectedConference) {
        const sortedSubmissions = [...processedSubmissions].sort((a, b) => {
          const { sortField, sortOrder } = filters;
          const multiplier = sortOrder === 'asc' ? 1 : -1;

          switch (sortField) {
            case 'name':
              return multiplier * a.acronym.localeCompare(b.acronym);

            case 'location':
              // Handle empty/missing locations - show them first for ascending order
              const locationA = a.location || '';
              const locationB = b.location || '';

              // If one location is empty and the other isn't
              if (!locationA && locationB) return -1; // Empty location comes first
              if (locationA && !locationB) return 1;  // Non-empty location comes second

              // If both are empty or both have values, sort normally
              return multiplier * locationA.localeCompare(locationB);

            case 'rank':
              const rankOrder = { 'A*': 4, 'A': 3, 'B': 2, 'C': 1 };
              const rankA = rankOrder[a.ranking || 'C'] || 0;
              const rankB = rankOrder[b.ranking || 'C'] || 0;
              return multiplier * (rankB - rankA);

            case 'deadline':
            default:
              // Handle "Rolling" deadlines - put them at the end for ascending, beginning for descending
              if (a.deadline === 'Rolling' && b.deadline === 'Rolling') return 0;
              if (a.deadline === 'Rolling') return multiplier > 0 ? 1 : -1;
              if (b.deadline === 'Rolling') return multiplier > 0 ? -1 : 1;

              // Parse dates properly
              try {
                const dateA = new Date(a.deadline);
                const dateB = new Date(b.deadline);

                // Check if dates are valid
                if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                  // If one date is invalid, put it at the end
                  if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
                  if (isNaN(dateA.getTime())) return 1;
                  if (isNaN(dateB.getTime())) return -1;
                }

                return multiplier * (dateA.getTime() - dateB.getTime());
              } catch (error) {
                return 0;
              }
          }
        });

        processedSubmissions = sortedSubmissions;
      }

      setSubmissions(processedSubmissions);
      setIsLoading(false);
    }, 100); // Reduced timeout for faster response

    return () => clearTimeout(timer);
  }, [allSubmissions, filters, selectedConference]);

  // Calculate pagination
  const totalPages = Math.ceil(submissions.length / filters.perPage);
  const startIndex = (filters.page - 1) * filters.perPage;
  const paginatedSubmissions = submissions.slice(startIndex, startIndex + filters.perPage);
  const perPageOptions = [5, 10, 25, 50];

  const handleSort = (field: SortField) => {
    setFilters(prev => ({
      ...prev,
      sortField: field,
      sortOrder: prev.sortField === field && prev.sortOrder === 'asc' ? 'desc' : 'asc',
      page: 1 // Reset to first page when sorting
    }));
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, filters.page - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {[...Array(filters.perPage)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative flex flex-col sm:flex-row sm:items-start gap-3 p-4
             bg-white rounded-xl border border-gray-200
             shadow-[0_2px_8px_rgba(0,0,0,0.08)]
             overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100
                     animate-[shimmer_2s_infinite]"
                 style={{
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 2s infinite linear',
                   '@keyframes shimmer': {
                     '0%': { backgroundPosition: '200% 0' },
                     '100%': { backgroundPosition: '-200% 0' }
                   }
                 }}/>
          </div>

          {/* Content skeleton */}
          <div className="relative flex-shrink-0 w-full sm:w-48">
            <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>

          <div className="relative flex-1 min-w-0">
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="relative flex flex-col gap-2 sm:ml-2">
            <div className="h-8 w-8 bg-gray-200 rounded-lg" />
            <div className="h-8 w-8 bg-gray-200 rounded-lg" />
            <div className="h-8 w-8 bg-gray-200 rounded-lg" />
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Render the sorting controls and active calls toggle - ALWAYS show this
  const renderSortingControls = () => (
    <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/60 backdrop-blur-xl">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-primary-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Content */}
      <div className="relative p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* View Toggle */}
          <div className="flex items-center gap-2 rounded-lg bg-white/40 p-1">
            {[
              { field: 'deadline', label: 'Deadline' },
              { field: 'name', label: 'Name' },
              { field: 'location', label: 'Location' },
              { field: 'rank', label: 'Rank' }
            ].map(({ field, label }) => (
              <motion.button
                key={field}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSort(field as SortField)}
                disabled={!!selectedConference} // Disable sorting when conference is selected
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
                       transition-all duration-200 ${
                  filters.sortField === field && !selectedConference
                    ? 'bg-primary-500 text-white'
                    : selectedConference
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-white'
                }`}
              >
                {label}
                <ArrowUpDown className={`w-4 h-4 transition-transform duration-200 ${
                  filters.sortField === field && filters.sortOrder === 'desc' && !selectedConference ? 'rotate-180' : ''
                }`} />
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Clear Selection Button */}
            {selectedConference && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClearSelection}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                       bg-rose-500 text-white hover:bg-rose-600
                       transition-all duration-200"
              >
                <X className="w-4 h-4" />
                <span>Clear Selection</span>
              </motion.button>
            )}

            {/* ALWAYS show the Active Calls toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilters(prev => ({ ...prev, upcoming: !prev.upcoming, page: 1 }))}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                   transition-all duration-200 ${
                filters.upcoming
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Active Calls</span>
              <div className={`relative ml-2 w-8 h-4 rounded-full ${
                filters.upcoming ? 'bg-emerald-400' : 'bg-gray-200'
              }`}>
                <motion.div
                  animate={{ x: filters.upcoming ? 16 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm`}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  if (submissions.length === 0 && !isLoading) {
    const suggestions = [
      { icon: Coffee, text: "Take a coffee break" },
      { icon: Brain, text: "Brainstorm new research ideas" },
      { icon: Dices, text: "Try your luck with different filters" },
      { icon: Lightbulb, text: "Start your own conference!" },
    ];

    return (
      <div className="space-y-6">
        {/* ALWAYS show sorting controls even when no results */}
        {renderSortingControls()}

        {/* No results message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary-50 via-white to-rose-50
                      transform -skew-y-6" />

          <div className="relative px-8 py-12">
            <div className="max-w-md mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-500/20
                       flex items-center justify-center transform rotate-12"
              >
                <SearchX className="h-10 w-10 text-primary-500 transform -rotate-12" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400
                       bg-clip-text text-transparent">
                {filters.searchQuery
                  ? "Oops! No matches found"
                  : "No submissions yet"}
              </h3>

              <p className="text-gray-600 mb-8">
                {filters.searchQuery
                  ? `Try toggling "Active Calls" to see past deadlines that match "${filters.searchQuery}"`
                  : "While you wait for submissions to be added, why not:"}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm
                           hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    <suggestion.icon className="h-6 w-6 text-primary-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{suggestion.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {filters.searchQuery && (
                  <motion.button
                    onClick={() => setFilters(prev => ({ ...prev, searchQuery: '', page: 1 }))}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                           bg-primary-500 text-white hover:bg-primary-600
                           transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Reset Search</span>
                  </motion.button>
                )}

                {filters.subcategories.length > 0 && (
                  <motion.button
                    onClick={() => setFilters(prev => ({ ...prev, subcategories: [], page: 1 }))}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                           bg-white text-primary-600 border border-primary-100
                           hover:bg-primary-50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Filter className="h-4 w-4" />
                    <span>Clear Filters</span>
                  </motion.button>
                )}

                {/* Suggest toggling Active Calls if search has no results */}
                {filters.searchQuery && filters.upcoming && (
                  <motion.button
                    onClick={() => setFilters(prev => ({ ...prev, upcoming: false, page: 1 }))}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                           bg-amber-500 text-white hover:bg-amber-600
                           transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Show Past Deadlines</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sorting Controls - ALWAYS show */}
      {renderSortingControls()}

      {/* Submission Cards */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {paginatedSubmissions.map((submission, index) => {
                const isSelected = selectedConference === submission.id;

                return (
                  <motion.div
                    key={submission.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.3 },
                      layout: { duration: 0.3 }
                    }}
                    className={`relative ${isSelected ? 'z-10' : ''}`}
                  >
                    {/* Selected Conference Special Background */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-primary-100/30 to-primary-50
                                    rounded-xl blur-sm -z-10 transform scale-105" />
                    )}

                    {/* Selected Badge */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute -top-2 -right-2 z-20"
                      >
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full
                                      bg-gradient-to-r from-primary-500 to-primary-600
                                      text-white text-xs font-medium shadow-lg">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Selected</span>
                        </div>
                      </motion.div>
                    )}

                    <div className={`${isSelected ? 'ring-2 ring-primary-500 ring-offset-2' : ''}`}>
                      <ConferenceCard
                        conference={submission}
                        areaColor={submission.areaColor}
                        isSelected={isSelected}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      {/* Glassmorphic Pagination Controls */}
      {!selectedConference && totalPages > 1 && (
        <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/60 backdrop-blur-xl">
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-primary-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>

          {/* Content */}
          <div className="relative p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Entries per page selector */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Show entries:</label>
                  <select
                    value={filters.perPage}
                    onChange={(e) => {
                      const newPerPage = Number(e.target.value);
                      const newTotalPages = Math.ceil(submissions.length / newPerPage);
                      const newPage = Math.min(filters.page, newTotalPages);
                      setFilters(prev => ({ ...prev, perPage: newPerPage, page: newPage }));
                    }}
                    className="w-20 h-9 rounded-lg bg-white/80 border border-gray-200 text-sm
                           focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500
                           transition-all duration-200"
                  >
                    {perPageOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="text-sm text-gray-500">
                  <span className="hidden sm:inline">Showing </span>
                  <span className="font-medium text-gray-900">
                {startIndex + 1} - {Math.min(startIndex + filters.perPage, submissions.length)}
              </span>
                  <span className="mx-1">of</span>
                  <span className="font-medium text-gray-900">{submissions.length}</span>
                </div>
              </div>

              {/* Page navigation */}
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg bg-white/40 p-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilters(prev => ({ ...prev, page: 1 }))}
                    disabled={filters.page === 1}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                           transition-all duration-200"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={filters.page === 1}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                           transition-all duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>

                  <div className="flex items-center gap-1 px-1">
                    {getPageNumbers().map(pageNum => (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters(prev => ({ ...prev, page: pageNum }))}
                        className={`min-w-[2rem] h-8 px-2 rounded-lg text-sm font-medium
                               transition-all duration-200 ${
                          pageNum === filters.page
                            ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-white'
                        }`}
                      >
                        {pageNum}
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={filters.page === totalPages}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                           transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilters(prev => ({ ...prev, page: totalPages }))}
                    disabled={filters.page === totalPages}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                           transition-all duration-200"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConferenceList;