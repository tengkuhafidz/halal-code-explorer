import React from 'react';
import { Link } from 'react-router-dom';
import { Check, AlertTriangle } from 'lucide-react';
import { ECodeData } from './ECode';

const statusStyles = {
  halal: {
    badge:
      'bg-green-100 text-halalDark border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-700',
    icon: Check,
    label: 'Halal',
  },
  doubtful: {
    badge:
      'bg-yellow-100 text-mushboohDark border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700',
    icon: AlertTriangle,
    label: 'Doubtful',
  },
} as const;

interface ECodeListTileProps {
  data: ECodeData;
}

const ECodeListTile: React.FC<ECodeListTileProps> = React.memo(({ data }) => {
  const styles = statusStyles[data.status];
  const Icon = styles.icon;

  return (
    <Link
      to={`/ecode/${data.code.replace(/^E/i, '')}`}
      className="block h-full p-4 rounded-lg border bg-card hover:bg-secondary/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`${data.code} ${data.name} — ${styles.label}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-semibold">{data.code}</div>
          <div className="text-sm text-muted-foreground break-words">
            {data.name}
          </div>
        </div>
        <span
          className={`inline-flex items-center shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${styles.badge}`}
        >
          <Icon className="h-3 w-3 mr-1" aria-hidden="true" />
          {styles.label}
        </span>
      </div>
    </Link>
  );
});

ECodeListTile.displayName = 'ECodeListTile';

export default ECodeListTile;
