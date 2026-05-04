import { AlertTriangle, Check, ChevronRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ECodeData } from '../ECode';

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

interface ECodeListRowProps {
  data: ECodeData;
  showDivider?: boolean;
}

const ECodeListRow: React.FC<ECodeListRowProps> = React.memo(({ data, showDivider = true }) => {
  const styles = statusStyles[data.status];
  const Icon = styles.icon;

  return (
    <Link
      to={`/ecode/${data.code.replace(/^E/i, '')}`}
      className={`flex items-center justify-between gap-3 px-4 py-3 active:bg-secondary/60 transition-colors ${
        showDivider ? 'border-b border-border/60' : ''
      }`}
      aria-label={`${data.code} ${data.name} — ${styles.label}`}
    >
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[15px] text-foreground">{data.code}</div>
        <div className="text-[13px] text-muted-foreground truncate">{data.name}</div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${styles.badge}`}
        >
          <Icon className="h-3 w-3 mr-1" aria-hidden="true" />
          {styles.label}
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
      </div>
    </Link>
  );
});

ECodeListRow.displayName = 'ECodeListRow';

export default ECodeListRow;
