import React from 'react';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 py-2">
                <div className="flex items-center">
                    <img 
                        src={logo} 
                        alt="QuestSearch Logo" 
                        className="h-15 w-auto mr-3"
                    />
                    <h1 className="text-3xl font-bold text-gray-900">QuestSearch</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;