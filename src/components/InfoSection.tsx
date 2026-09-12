
import React from 'react';
import { Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_LAST_REVIEWED, formatReviewedDate } from '../utils/seoHelpers';

const MUIS_PDF =
  'https://isomer-user-content.by.gov.sg/48/15766cc5-7b0d-4df0-938e-e61f1cb2b91e/FOOD%20ADDITIVE%20LISTING%205.pdf';

const InfoSection = () => {
  const statusItems = [
    {
      title: 'Halal',
      description: 'Food additives that are permissible according to Islamic law and are derived from halal sources.',
      icon: Check,
      color: 'bg-halalDark text-white'
    },
    {
      title: 'Doubtful',
      description: 'Additives with unclear origins or multiple possible sources, some of which might be non-halal.',
      icon: AlertTriangle,
      color: 'bg-mushboohDark text-white'
    }
  ];

  return (
    <section className="py-16 bg-secondary/50 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Understanding <span className="inline-block">E-Codes</span></h2>
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

        <div className="max-w-3xl mx-auto mt-12 bg-card border rounded-2xl p-6 shadow-sm text-left">
          <h3 className="text-xl font-semibold mb-3">How we determine halal status</h3>
          <p className="text-muted-foreground mb-3">
            Every status on this site follows the{' '}
            <a
              href={MUIS_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              MUIS (Majlis Ugama Islam Singapura) food additive listing
            </a>
            . MUIS marks an additive as <strong>halal</strong> when its normal production involves no
            animal-derived material, and as <strong>doubtful</strong> (mashbooh) when the same E-number
            can come from animal sources, fermentation media or processing aids that differ between
            manufacturers. Doubtful does not mean haram: for those additives the reliable check is a
            recognised halal certification logo on the finished product.
          </p>
          <p className="text-sm text-muted-foreground">
            Each E-code page explains why it has its status, where it is commonly found, and what to
            look for on the label. Data last reviewed{' '}
            <time dateTime={SITE_LAST_REVIEWED}>{formatReviewedDate()}</time>.
          </p>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/all-ecodes"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium transition-colors"
          >
            Browse all E-codes A–Z with their halal status
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
