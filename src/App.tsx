import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/home/HomePage';
import Footer from './components/Footer';
import ComingSoon from './components/ComingSoon';
import { CategoryData, FilterState } from './types';

// Import data files
import aiData from './data/2025/ai.json';
import systemsData from './data/2025/systems.json';
import securityData from './data/2025/security.json';
import quantumData from './data/2025/quantum.json';
import theoryData from './data/2025/theory.json';
import softwareData from './data/2025/software.json';
import hciData from './data/2025/hci.json';
import dataData from './data/2025/data.json';
import graphicsData from './data/2025/graphics.json';
import bioData from './data/2025/bio.json';
import roboticsData from './data/2025/robotics.json';

// Import categories data
import { categories } from './data/categories';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedConference = searchParams.get('conference');

  // Combine all data by type
  const allData = [
    aiData,
    systemsData,
    securityData,
    quantumData,
    theoryData,
    softwareData,
    hciData,
    dataData,
    graphicsData,
    bioData,
    roboticsData
  ];

  // Separate submissions by type
  const conferences = allData.flatMap(area => area.conferences || []);
  const workshops = allData.flatMap(area => area.workshops || []);
  const journals = allData.flatMap(area => area.journals || []);

  // Calculate stats
  const stats = {
    totalConferences: conferences.length + workshops.length + journals.length,
    conferences: conferences.length,
    workshops: workshops.length,
    journals: journals.length,
    upcomingDeadlines: [
      ...conferences,
      ...workshops,
      ...journals
    ].filter(item => new Date(item.deadline) > new Date()).length,
    uniqueLocations: new Set([
      ...conferences.map(conf => conf.location),
      ...workshops.map(ws => ws.location),
      ...journals.filter(j => j.location !== 'Online').map(j => j.location)
    ]).size
  };

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    subcategories: [],
    locations: [],
    upcoming: true,
    searchQuery: '',
    types: [],
    rankings: [],
    page: 1,
    perPage: 10,
    sortField: 'deadline',
    sortOrder: 'asc'
  });

  // Combine all data types for each area
  const areasData = allData.map(area => ({
    ...area,
    conferences: area.conferences || [],
    workshops: area.workshops || [],
    journals: area.journals || []
  }));

  if (!isUnlocked) {
    return <ComingSoon onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
        <Header />
        <HomePage
            stats={stats}
            areasData={areasData}
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            selectedConference={selectedConference}
            onClearSelection={() => setSearchParams({})}
        />
        <Footer />
      </div>
  );
}

export default App;