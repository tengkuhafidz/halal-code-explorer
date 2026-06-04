
import React from 'react';

const Hero = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block mb-3 px-3 py-1 bg-accent rounded-full text-accent-foreground text-sm font-medium animate-fade-in">
          Free Halal Checker · Fast & Reliable
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance leading-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
          Halal Check: Is it <span className="text-halalDark dark:text-halal">Halal</span>?
        </h1>
        <p
          className="text-xl text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto text-balance"
          id="hero-description"
          aria-label="App description"
        >
          A free halal checker for food additives and E-codes — search any E-number to instantly see if it's halal, haram, or doubtful, with its source and the MUIS ruling.
        </p>
      </div>
    </div>
  );
};

export default Hero;
