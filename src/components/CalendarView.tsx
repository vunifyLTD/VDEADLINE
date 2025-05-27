import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChevronDown, Grid2X2, LayoutGrid } from 'lucide-react';
import { Conference } from '../types';
import { format, parseISO, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import FilterSection from './FilterSection';
import { FilterState } from '../types';
import { filterConferences } from '../utils/filterUtils';

interface CalendarViewProps {
  areasData: any[];
  categories: any[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ areasData, categories }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month');
  const yearPickerRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    subcategories: [],
    locations: [],
    upcoming: true,
    searchQuery: '',
    types: [],
    rankings: []
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearPickerRef.current && !yearPickerRef.current.contains(event.target as Node)) {
        setShowYearPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allConferences = useMemo(() =>
          areasData.flatMap(area => area.conferences || []),
      [areasData]
  );

  const filteredConferences = useMemo(() =>
          filterConferences(allConferences, filters),
      [allConferences, filters]
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i - 5);

  const previousYear = () => {
    setCurrentYear(prev => prev - 1);
  };

  const nextYear = () => {
    setCurrentYear(prev => prev + 1);
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    setShowYearPicker(false);
  };

  const getConferencesForMonth = (monthIndex: number): Conference[] => {
    return filteredConferences.filter(conf => {
      const deadlineDate = parseISO(conf.deadline);
      return deadlineDate.getMonth() === monthIndex && deadlineDate.getFullYear() === currentYear;
    });
  };

  const getConferencesForDay = (date: Date): Conference[] => {
    return filteredConferences.filter(conf => {
      const deadlineDate = parseISO(conf.deadline);
      return isSameDay(deadlineDate, date);
    });
  };

  const getDaysInMonth = () => {
    const date = new Date(currentYear, currentMonth, 1);
    return eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date)
    });
  };

  const renderMonthView = () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((month, index) => {
          const conferences = getConferencesForMonth(index);
          const isCurrentMonth = new Date().getMonth() === index &&
              new Date().getFullYear() === currentYear;

          return (
              <motion.div
                  key={month}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setCurrentMonth(index);
                    setViewMode('day');
                  }}
                  className={`group relative p-4 rounded-xl cursor-pointer
                     ${isCurrentMonth
                      ? 'bg-gradient-to-br from-primary-50/40 via-primary-100/20 to-transparent'
                      : 'bg-gradient-to-br from-white/60 via-gray-50/40 to-transparent'}
                     hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
              >
                {/* Modern gradient background */}
                <div className="absolute inset-0 rounded-xl bg-white/40 backdrop-blur-sm -z-10" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-white/40 to-white/60 -z-20" />

                <div className="relative flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg text-gray-700 font-normal tracking-wide">
                      {month}
                    </h3>
                    <div className="text-sm text-gray-500 mt-0.5 font-light">
                      {conferences.length} {conferences.length === 1 ? 'deadline' : 'deadlines'}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-sm font-light
                           ${isCurrentMonth
                      ? 'bg-primary-100/40 text-primary-600'
                      : 'bg-gray-100/40 text-gray-600'}`}>
                    {conferences.length}
                  </div>
                </div>

                <div className="space-y-1.5">
                  {conferences.slice(0, 3).map((conf, idx) => (
                      <motion.a
                          key={conf.id}
                          href={conf.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.1 }}
                          onClick={(e) => e.stopPropagation()}
                          className={`block px-3 py-2 rounded-xl
                           ${isCurrentMonth
                              ? 'bg-white/60 hover:bg-white/80'
                              : 'bg-gray-50/60 hover:bg-gray-50/80'}
                           backdrop-blur-[2px] transition-all duration-200
                           hover:shadow-sm`}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon className={`w-4 h-4 ${isCurrentMonth ? 'text-primary-500' : 'text-gray-400'}`} />
                          <span className="text-sm text-gray-600 font-light">{conf.acronym}</span>
                        </div>
                      </motion.a>
                  ))}
                  {conferences.length > 3 && (
                      <div className="text-center pt-1">
                  <span className="text-xs text-primary-500 font-light">
                    +{conferences.length - 3} more
                  </span>
                      </div>
                  )}
                </div>
              </motion.div>
          );
        })}
      </div>
  );

  const renderDayView = () => {
    const days = getDaysInMonth();
    const firstDayOfMonth = getDay(days[0]);
    const emptyDays = Array(firstDayOfMonth).fill(null);

    return (
        <div className="space-y-6">
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-2 text-sm text-gray-400 text-center">{day}</div>
            ))}
            {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="h-24 rounded-xl bg-gray-50" />
            ))}
            {days.map((day, index) => {
              const conferences = getConferencesForDay(day);
              const isToday = isSameDay(day, new Date());

              return (
                  <motion.div
                      key={day.toISOString()}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.01 }}
                      className={`h-24 p-2 rounded-xl bg-white ${isToday ? 'ring-2 ring-primary-500' : ''}`}
                  >
                    <div className={`text-sm mb-2 ${isToday ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {conferences.map(conf => (
                          <motion.a
                              key={conf.id}
                              href={conf.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              className="block px-2 py-1 rounded text-xs bg-gray-50 text-gray-700"
                          >
                            {conf.acronym}
                          </motion.a>
                      ))}
                    </div>
                  </motion.div>
              );
            })}
          </div>
        </div>
    );
  };

  return (
      <div className="flex flex-col lg:flex-row gap-8 max-w-[1920px] mx-auto">
        {/* Left Sidebar with Filters */}
        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-24">
            <FilterSection
                filters={filters}
                setFilters={setFilters}
                categories={categories}
                areasData={areasData}
            />
          </div>
        </div>

        {/* Calendar View */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Calendar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                      onClick={() => setViewMode('month')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                           transition-colors ${viewMode === 'month'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Grid2X2 className="w-4 h-4" />
                    <span>Month</span>
                  </button>
                  <button
                      onClick={() => setViewMode('day')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                           transition-colors ${viewMode === 'day'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Day</span>
                  </button>
                </div>

                {/* Year and Navigation */}
                <div className="flex items-center gap-4">
                  <div className="relative" ref={yearPickerRef}>
                    <button
                        onClick={() => setShowYearPicker(!showYearPicker)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100
                             hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-gray-900">{currentYear}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    <AnimatePresence>
                      {showYearPicker && (
                          <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg
                               border border-gray-200 py-1 z-20"
                          >
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => handleYearSelect(year)}
                                    className={`w-full px-4 py-2 text-left text-sm
                                   ${currentYear === year
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                  {year}
                                </button>
                            ))}
                          </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                        onClick={viewMode === 'day' ? previousMonth : previousYear}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={viewMode === 'day' ? nextMonth : nextYear}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Content */}
            <div className="p-4">
              <AnimatePresence mode="wait">
                {viewMode === 'month' ? renderMonthView() : renderDayView()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CalendarView;