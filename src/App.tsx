import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/home/HomePage';
import Footer from './components/Footer';
import { CategoryData, FilterState } from './types';

// Import data files
import aiData from './data/2025/ai.json';
import systemsData from './data/2025/systems.json';
import securityData from './data/2025/security.json';
import quantumData from './data/2025/quantum.json';
import theoryData from './data/2025/theory.json';
import softwareData from './data/2025/software.json';

// Import categories data
import { categories } from './data/categories';

function App() {
  // Combine all data by type
  const allData = [
    aiData,
    systemsData,
    securityData,
    quantumData,
    theoryData,
    softwareData
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

  return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
        <Header />
        <HomePage
            stats={stats}
            areasData={areasData}
            categories={categories}
            filters={filters}
            setFilters={setFilters}
        />
        <Footer />
      </div>
  );
}

export default App;