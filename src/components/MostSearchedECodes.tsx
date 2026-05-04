import React, { useMemo } from 'react';
import { useAppContext } from '../hooks/use-app-context';
import { getAllECodes } from '../services/eCodeService';
import AppECodeList from './app/AppECodeList';
import { ECodeData } from './ECode';
import ECodeListTile from './ECodeListTile';

const MOST_SEARCHED_CODES = [
  'E500',
  'E621',
  'E412',
  'E476',
  'E407',
  'E450',
  'E211',
  'E951',
];

const MostSearchedECodes: React.FC = () => {
  const { isInApp } = useAppContext();
  const items = useMemo<ECodeData[]>(() => {
    const lookup = new Map(getAllECodes().map((c) => [c.code, c]));
    return MOST_SEARCHED_CODES.map((code) => lookup.get(code)).filter(
      (c): c is ECodeData => Boolean(c),
    );
  }, []);

  if (items.length === 0) return null;

  if (isInApp) {
    return (
      <section aria-labelledby="most-searched-heading" className="mt-4">
        <div className="px-4 pt-4 pb-2">
          <h2 id="most-searched-heading" className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Most Searched
          </h2>
        </div>
        <AppECodeList items={items} />
      </section>
    );
  }

  return (
    <section aria-labelledby="most-searched-heading" className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 id="most-searched-heading" className="text-2xl sm:text-3xl font-bold mb-2">
            Most Searched <span className="inline-block">E-Codes</span>
          </h2>
          <p className="text-muted-foreground">
            The food additives people check on most often.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.code}>
              <ECodeListTile data={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MostSearchedECodes;
