import { Conference, FilterState } from '../types';

export const filterConferences = (
  conferences: Conference[],
  filters: FilterState
): Conference[] => {
  return conferences.filter((conference) => {
    // Filter by categories and subcategories
    if (filters.subcategories.length > 0) {
      const conferenceSubcategories = conference.subcategories || [];
      if (!conferenceSubcategories.some(sub => filters.subcategories.includes(sub))) {
        return false;
      }
    }

    // Filter by locations if any are selected
    if (filters.locations.length > 0 && (!conference.location || !filters.locations.includes(conference.location))) {
      return false;
    }

    // Filter by types if any are selected
    if (filters.types.length > 0 && !filters.types.includes(conference.type)) {
      return false;
    }

    // Filter by rankings if any are selected
    if (filters.rankings.length > 0) {
      if (!conference.ranking || !filters.rankings.includes(conference.ranking)) {
        return false;
      }
    }

    // Filter for upcoming deadlines if selected
    if (filters.upcoming && new Date(conference.deadline) < new Date()) {
      return false;
    }

    // Filter by search query
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesName = conference.name.toLowerCase().includes(searchLower);
      const matchesAcronym = conference.acronym.toLowerCase().includes(searchLower);
      const matchesLocation = conference.location?.toLowerCase().includes(searchLower) || false;
      const matchesAreas = Array.isArray(conference.areas) && conference.areas.some(area => 
        area.toLowerCase().includes(searchLower)
      );
      
      if (!matchesName && !matchesAcronym && !matchesLocation && !matchesAreas) {
        return false;
      }
    }

    return true;
  });
};

export const extractLocations = (conferences: Conference[]): string[] => {
  const locationSet = new Set<string>();
  
  conferences.forEach(conference => {
    if (conference.location) {
      locationSet.add(conference.location);
    }
  });
  
  return Array.from(locationSet).sort();
};

export const extractAreas = (conferences: Conference[]): string[] => {
  const areaSet = new Set<string>();
  
  conferences.forEach(conference => {
    if (Array.isArray(conference.areas)) {
      conference.areas.forEach(area => {
        areaSet.add(area);
      });
    }
  });
  
  return Array.from(areaSet).sort();
};