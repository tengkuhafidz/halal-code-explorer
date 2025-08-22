
import React from 'react';

const Hero = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block mb-3 px-3 py-1 bg-accent rounded-full text-accent-foreground text-sm font-medium animate-fade-in">
          Fast & Reliable Verification
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance leading-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
          Is it <span className="text-halalDark">Halal</span>?
        </h1>
        <p
          className="text-xl text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto text-balance"
          id="hero-description"
          aria-label="App description"
        >
          Instantly check the halal status of food additives and E-codes with our comprehensive database.
        </p>
      </div>
    </div>
  );
};

export default Hero;
