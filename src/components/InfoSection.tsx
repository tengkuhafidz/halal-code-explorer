
import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

const InfoSection = () => {
  const statusItems = [
    {
      title: 'Halal',
      description: 'Food additives that are permissible according to Islamic law and are derived from halal sources.',
      icon: Check,
      color: 'bg-halal text-white'
    },
    {
      title: 'Doubtful',
      description: 'Additives with unclear origins or multiple possible sources, some of which might be non-halal.',
      icon: AlertTriangle,
      color: 'bg-mushbooh text-white'
    }
  ];

  return (
    <section className="py-16 bg-secondary/50 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Understanding E-Codes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            E-codes are numbers assigned to food additives that have been assessed for use in foods within the European Union.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {statusItems.map((item, index) => (
            <div
              key={index}
              className="bg-card border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]"
            >
              <div className="flex justify-center">
                <div className={`${item.color} p-3 rounded-xl mb-4`}>
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
              <p className="text-muted-foreground text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
