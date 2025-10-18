import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import StoryDetailPage, { Story } from './components/StoryDetailPage';
import MembershipAndAdsPage from './components/MembershipAndAdsPage';
import AboutPage from './components/AboutPage';
import MediaPage from './components/MediaPage';

export type Language = 'en' | 'fa';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' or a category name

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
  };
  
  const handleGoHome = () => {
    setSelectedStory(null);
    setCurrentView('home');
  }

  const handleNavClick = (view: string) => {
    setSelectedStory(null); // Ensure we're not on a story page
    setCurrentView(view);
  };
  
  const renderCurrentView = () => {
    if (selectedStory) {
      return <StoryDetailPage story={selectedStory} language={language} />;
    }
    switch (currentView) {
      case 'membership':
        return <MembershipAndAdsPage language={language} />;
      case 'About':
        return <AboutPage language={language} />;
      case 'Watch/Listen':
        return <MediaPage language={language} />;
      default:
        return (
          <>
            {currentView === 'home' && <HeroSection language={language} />}
            <ContentSection 
              language={language} 
              onSelectStory={handleSelectStory}
              currentView={currentView}
            />
          </>
        );
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white antialiased">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onLogoClick={handleGoHome}
        currentView={currentView}
        onNavClick={handleNavClick}
      />
      <main className="flex-grow">
        {renderCurrentView()}
      </main>
      <Footer language={language} onNavClick={handleNavClick} />
    </div>
  );
};

export default App;