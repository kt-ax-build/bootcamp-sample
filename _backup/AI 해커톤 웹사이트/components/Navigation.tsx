import { useState } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('대회 소개');

  const menuItems = [
    { name: '대회 소개', id: 'intro' },
    { name: '참가 안내', id: 'participation' },
    { name: '신청 및 접수', id: 'registration' },
    { name: '신청 확인', id: 'confirmation' }
  ];

  const scrollToSection = (sectionId: string, name: string) => {
    setActiveSection(name);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="text-white text-xl font-bold">AI Hackathon</span>
          </div>
          
          <div className="flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id, item.name)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.name
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="text-gray-300">
            <span className="text-sm">지금 참여하세요 →</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;