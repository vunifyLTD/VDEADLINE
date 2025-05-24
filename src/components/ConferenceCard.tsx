import React, { useState, useEffect } from 'react';
import { formatDeadline, formatDateRange, getDeadlineStatus } from '../utils/dateUtils';
import { Conference } from '../types';
import { Calendar, Globe, Star, CalendarPlus, Link as LinkIcon, Share2, Clock, CalendarDays, CalendarCheck, CalendarX, BookOpen, MapPin, Tag, Twitter, Linkedin, Facebook, Copy, Check, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';

interface ConferenceCardProps {
  conference: Conference;
  areaColor: string;
}

const ConferenceCard: React.FC<ConferenceCardProps> = ({ conference, areaColor }) => {
  const [countdown, setCountdown] = useState(formatDeadline(conference.deadline));
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const deadlineStatus = getDeadlineStatus(conference.deadline);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(formatDeadline(conference.deadline));
    }, 1000);
    
    // Close dropdowns when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.calendar-dropdown')) {
        setShowCalendarDropdown(false);
      }
      if (!target.closest('.share-dropdown')) {
        setShowShareDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      clearInterval(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [conference.deadline]);
  
  const getStatusStyles = () => {
    switch (deadlineStatus) {
      case 'past':
        return 'text-gray-500';
      case 'imminent':
        return 'text-red-600 animate-pulse';
      case 'near':
        return 'text-amber-600';
      case 'future':
        return 'text-emerald-600';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusColor = () => {
    switch (deadlineStatus) {
      case 'past':
        return 'rgb(107, 114, 128)';
      case 'imminent':
        return 'rgb(239, 68, 68)';
      case 'near':
        return 'rgb(245, 158, 11)';
      default:
        return 'rgb(16, 185, 129)';
    }
  };

  const getRankingColor = (ranking?: string) => {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conference':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'workshop':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'journal':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'poster':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const generateCalendarUrl = (type: 'google' | 'outlook' | 'apple' | 'yahoo') => {
    const title = `${conference.acronym} - Paper Submission Deadline`;
    const details = `Conference: ${conference.name}\nWebsite: ${conference.website}\nLocation: ${conference.location}`;
    const startDate = new Date(conference.deadline);
    const endDate = new Date(startDate.getTime() + 24*60*60*1000);
    
    switch (type) {
      case 'google':
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}`;
      
      case 'outlook':
        return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(details)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}`;
      
      case 'apple':
        return `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${conference.website}
DTSTART:${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}
DTEND:${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${conference.location}
END:VEVENT
END:VCALENDAR`;
      
      case 'yahoo':
        return `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(details)}&st=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}&et=${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}`;
    }
  };

  const generateSocialShareUrl = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const text = `${conference.acronym} ${conference.year} - Paper Submission Deadline: ${conference.paperSubmission}`;
    const url = conference.website;

    switch (platform) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    }
  };

  const copyToClipboard = async () => {
    const text = `${conference.acronym} - ${conference.name}\nDeadline: ${conference.deadline}\nWebsite: ${conference.website}`;
    await navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <motion.div 
      className="group relative flex flex-col sm:flex-row sm:items-start gap-3 p-4
                 bg-white rounded-xl border border-gray-200
                 shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                 hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)]
                 transition-all duration-300 ease-out
                 hover:scale-[1.01]"
      style={{
        borderLeftWidth: '4px',
        borderLeftColor: getStatusColor()
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Conference acronym and basic info */}
      <div className="flex-shrink-0 w-full sm:w-48">
        <h3 className="text-lg font-mono font-bold tracking-tight text-gray-900">
          {conference.acronym}
        </h3>
        
        {conference.cycle && (
          <div className="mt-0.5 text-xs font-medium text-gray-500">
            {conference.cycle} {conference.year}
          </div>
        )}
        
        <div className={`mt-1 flex items-center gap-1.5 text-xs font-mono ${getStatusStyles()}`}>
          <Clock className="h-3 w-3" />
          {countdown}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {conference.ranking && (
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border
                          ${getRankingColor(conference.ranking)}`}>
              <Star className="h-3.5 w-3.5" />
              <span className="text-xs font-bold">{conference.ranking}</span>
            </div>
          )}
          
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border
                        ${getTypeColor(conference.type)}`}>
            <FileText className="h-3.5 w-3.5" />
            <span className="text-xs font-medium capitalize">{conference.type}</span>
          </div>
        </div>
      </div>

      {/* Conference details */}
      <div className="flex-1 min-w-0 pl-0 sm:pl-2">
        <h4 className="text-sm font-medium text-gray-600 mb-1.5">
          {conference.name}
        </h4>
        
        {/* Important Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <CalendarX className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
            <div className="flex gap-1.5 items-baseline">
              <span className="text-gray-500 whitespace-nowrap">Due:</span>
              <span className="font-medium">{conference.paperSubmission}</span>
            </div>
          </div>
          
          {conference.notificationDate && (
            <div className="flex items-center gap-1.5 text-xs">
              <CalendarCheck className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
              <div className="flex gap-1.5 items-baseline">
                <span className="text-gray-500 whitespace-nowrap">Notif:</span>
                <span className="font-medium">{conference.notificationDate}</span>
              </div>
            </div>
          )}
          
          {conference.finalVersion && (
            <div className="flex items-center gap-1.5 text-xs">
              <CalendarDays className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
              <div className="flex gap-1.5 items-baseline">
                <span className="text-gray-500 whitespace-nowrap">Camera:</span>
                <span className="font-medium">{conference.finalVersion}</span>
              </div>
            </div>
          )}
        </div>

        {/* Conference Info */}
        <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gray-400" />
            <span>{formatDateRange(conference.date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gray-400" />
            <span>{conference.location}</span>
          </div>
          {conference.proceedings && (
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-gray-400" />
              <span>{conference.proceedings}</span>
            </div>
          )}
        </div>

        <div className="mt-1.5 flex flex-wrap gap-1">
          {Array.isArray(conference.areas) && conference.areas.map((area, index) => (
            <div 
              key={index}
              className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium rounded
                       bg-gray-50 text-gray-600"
            >
              <Tag className="h-2.5 w-2.5 text-gray-400" />
              {area}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1 sm:ml-2">
        {/* Calendar Dropdown */}
        <div className="relative calendar-dropdown">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setShowCalendarDropdown(!showCalendarDropdown);
              setShowShareDropdown(false);
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 
                     hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <CalendarPlus className="h-4 w-4" />
          </motion.button>

          <AnimatePresence>
            {showCalendarDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg 
                         border border-gray-200 py-1 z-50 overflow-hidden"
              >
                {[
                  { name: 'Google Calendar', type: 'google' },
                  { name: 'Apple Calendar', type: 'apple' },
                  { name: 'Outlook', type: 'outlook' },
                  { name: 'Yahoo Calendar', type: 'yahoo' }
                ].map((calendar, index) => (
                  <motion.a
                    key={calendar.type}
                    href={generateCalendarUrl(calendar.type as 'google' | 'outlook' | 'apple' | 'yahoo')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 
                             hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent
                             transition-all duration-300 ease-in-out"
                    initial={{ x: 0, backgroundColor: 'transparent' }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {calendar.name}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Share Dropdown */}
        <div className="relative share-dropdown">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setShowShareDropdown(!showShareDropdown);
              setShowCalendarDropdown(false);
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 
                     hover:bg-gray-100 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="h-4 w-4" />
          </motion.button>

          <AnimatePresence>
            {showShareDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg 
                         border border-gray-200 py-1 z-50 overflow-hidden"
              >
                {[
                  { name: 'Twitter', icon: Twitter, type: 'twitter', color: 'hover:text-sky-500' },
                  { name: 'LinkedIn', icon: Linkedin, type: 'linkedin', color: 'hover:text-blue-600' },
                  { name: 'Facebook', icon: Facebook, type: 'facebook', color: 'hover:text-blue-700' },
                  { name: 'Copy Link', icon: copySuccess ? Check : Copy, type: 'copy', color: 'hover:text-emerald-600' }
                ].map((platform) => (
                  <motion.button
                    key={platform.type}
                    onClick={() => platform.type === 'copy' ? copyToClipboard() : window.open(generateSocialShareUrl(platform.type as 'twitter' | 'linkedin' | 'facebook'), '_blank')}
                    className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700
                             hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent
                             transition-all duration-300 ease-in-out ${platform.color}`}
                    initial={{ x: 0, backgroundColor: 'transparent' }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <platform.icon className="h-4 w-4" />
                    {platform.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Website Link */}
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <motion.a
                href={conference.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 
                         hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Globe className="h-4 w-4" />
              </motion.a>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-black/90 text-white px-2 py-1 rounded text-xs"
                sideOffset={5}
              >
                Visit Website
                <Tooltip.Arrow className="fill-black/90" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </motion.div>
  );
};

export default ConferenceCard;