import React from 'react';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow fixed top-0 left-0 right-0 z-50 select-none"> 
            <div className="max-w-7xl mx-auto px-4 py-2">
                <div className="flex items-center select-none"> 
                    <img 
                        src={logo} 
                        alt="QuestSearch Logo" 
                        className="h-15 w-auto mr-3 select-none pointer-events-none" 
                        draggable="false"
                        onMouseDown={(e) => e.preventDefault()} 
                    />
                    <h1 
                        className="text-3xl font-bold text-gray-900 select-none pointer-events-none"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        QuestSearch
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;