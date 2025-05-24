import { formatDistance, parseISO, isPast, isFuture, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

const getUserTimezone = () => {
  try {
    return localStorage.getItem('preferredTimezone') || 
           Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return 'UTC';
  }
};

export const getDeadlineStatus = (deadline: string): 'past' | 'near' | 'future' | 'imminent' => {
  const timezone = getUserTimezone();
  const now = new Date();
  const deadlineDate = utcToZonedTime(parseISO(deadline), timezone);
  
  if (deadlineDate < now) {
    return 'past';
  }
  
  const days = differenceInDays(deadlineDate, now);
  
  if (days <= 10) {
    return 'imminent';
  } else if (days <= 30) {
    return 'near';
  }
  
  return 'future';
};

export const getDaysUntil = (dateStr: string) => {
  const timezone = getUserTimezone();
  const now = new Date();
  const deadlineInUTC = parseISO(dateStr);
  const deadlineInUserTZ = utcToZonedTime(deadlineInUTC, timezone);
  
  const diffTime = deadlineInUserTZ.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const remainingMs = diffTime % (1000 * 60 * 60 * 24);
  const diffHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingMinutes = remainingMs % (1000 * 60 * 60);
  const diffMinutes = Math.floor(remainingMinutes / (1000 * 60));
  const diffSeconds = Math.floor((remainingMinutes % (1000 * 60)) / 1000);
  
  return { days: diffDays, hours: diffHours, minutes: diffMinutes, seconds: diffSeconds };
};

export const formatDeadline = (deadline: string): string => {
  if (deadline === 'Rolling') {
    return 'Rolling';
  }

  const timezone = getUserTimezone();
  const now = new Date();
  const deadlineInUTC = parseISO(deadline);
  const deadlineInUserTZ = utcToZonedTime(deadlineInUTC, timezone);
  
  if (deadlineInUserTZ < now) {
    return 'Passed';
  }
  
  const timeLeft = getDaysUntil(deadline);
  const parts = [];
  
  if (timeLeft.days > 0) {
    parts.push(`${timeLeft.days}d`);
  }
  parts.push(`${timeLeft.hours}h`);
  parts.push(`${timeLeft.minutes}m`);
  parts.push(`${timeLeft.seconds}s`);
  
  return parts.join(' ');
};

export const formatDateRange = (dateRange: string): string => {
  if (!dateRange || typeof dateRange !== 'string' || dateRange.trim() === '') {
    return 'TBD';
  }

  const dateParts = dateRange.split(' to ');
  if (dateParts.length !== 2) {
    return 'TBD';
  }

  const [startStr, endStr] = dateParts;
  
  try {
    const timezone = getUserTimezone();
    const startDate = parseISO(startStr);
    const endDate = parseISO(endStr);
    
    // Check if dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 'TBD';
    }
    
    const startInTZ = utcToZonedTime(startDate, timezone);
    const endInTZ = utcToZonedTime(endDate, timezone);
    
    return format(startInTZ, 'MMM d', { timeZone: timezone }) + 
           ' – ' + 
           format(endInTZ, 'MMM d, yyyy', { timeZone: timezone });
  } catch (error) {
    return 'TBD';
  }
};

export const isUpcomingDeadline = (deadline: string): boolean => {
  if (deadline === 'Rolling') {
    return true;
  }

  const timezone = getUserTimezone();
  const now = new Date();
  const deadlineInUTC = parseISO(deadline);
  const deadlineInUserTZ = utcToZonedTime(deadlineInUTC, timezone);
  return deadlineInUserTZ > now;
};