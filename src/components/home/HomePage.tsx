import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './Hero';
import StatsGrid from './StatsGrid';
import FilterSection from '../FilterSection';
import ConferenceList from '../ConferenceList';
import CalendarView from '../CalendarView';
import { CategoryData, FilterState } from '../../types';

interface HomePageProps {
  stats: {
    upcomingDeadlines: number;
    premierConferences: number;
    uniqueLocations: number;
    totalConferences: number;
  };
  areasData: any[];
  categories: CategoryData[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  selectedConference: string | null;
  onClearSelection: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
                                             stats,
                                             areasData,
                                             categories,
                                             filters,
                                             setFilters,
                                             selectedConference,
                                             onClearSelection
                                           }) => {
  return (
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Hero
              title="Computer Science Conference Deadlines"
              subtitle="The world's most comprehensive and accurate conference deadline tracker, featuring an elegant interface and real-time updates for top-tier computer science venues. Never miss a deadline again."
          />

          <StatsGrid stats={stats} />

          <div className="mt-8">
            <Routes>
              <Route
                  path="/"
                  element={
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="w-full lg:w-96 lg:flex-shrink-0">
                        <div className="lg:sticky lg:top-24">
                          <FilterSection
                              filters={filters}
                              setFilters={setFilters}
                              categories={categories}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <ConferenceList
                            areasData={areasData}
                            filters={filters}
                            setFilters={setFilters}
                            selectedConference={selectedConference}
                            onClearSelection={onClearSelection}
                        />
                      </div>
                    </div>
                  }
              />
              <Route
                  path="/calendar"
                  element={
                    <CalendarView
                        areasData={areasData}
                        categories={categories}
                    />
                  }
              />
            </Routes>
          </div>
        </div>
      </main>
  );
}

export default HomePage;