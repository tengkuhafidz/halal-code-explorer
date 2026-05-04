import { ChevronRight, Database, Heart, MessageSquare, Share2, Shield, SunMoon } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { AppLayout } from '../components/app/AppLayout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { WebLayout } from '../components/web/WebLayout';
import { useAppContext } from '../hooks/use-app-context';
import { ThemeProvider, useTheme } from '../hooks/use-theme';
import { openExternalUrl, shareContent } from '../lib/native';

const APP_VERSION = '1.0.0';
const SITE_URL = 'https://www.ecodehalalcheck.com';
const MUIS_PDF =
  'https://isomer-user-content.by.gov.sg/48/15766cc5-7b0d-4df0-938e-e61f1cb2b91e/FOOD%20ADDITIVE%20LISTING%205.pdf';
const FEEDBACK_EMAIL = 'hi@10kb.co';

type ThemeOption = 'light' | 'dark' | 'system';

const THEME_LABEL: Record<ThemeOption, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

function SettingsRow({
  icon: Icon,
  label,
  value,
  onClick,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <div className="flex items-center gap-3 flex-1">
        <Icon className="h-5 w-5 text-primary" />
        <span className="text-base text-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {value && <span className="text-[15px] text-muted-foreground">{value}</span>}
        <ChevronRight className="h-4.5 w-4.5 text-muted-foreground/70" />
      </div>
    </>
  );

  const className =
    'w-full flex items-center justify-between px-4 py-3.5 active:bg-secondary/50 transition-colors';

  if (href) {
    if (external) {
      const isMailto = href.startsWith('mailto:');
      return (
        <button
          type="button"
          onClick={() => {
            if (isMailto) {
              window.location.href = href;
            } else {
              openExternalUrl(href);
            }
          }}
          className={className}
        >
          {content}
        </button>
      );
    }
    return (
      <Link to={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

function AboutContent() {
  const { theme, setTheme } = useTheme();
  const [themePickerOpen, setThemePickerOpen] = useState(false);

  const handleShare = async () => {
    const result = await shareContent({
      title: 'E-Code Halal Check',
      text: 'Find the halal status of food additives instantly.',
      url: SITE_URL,
      dialogTitle: 'Share E-Code Halal Check',
    });
    if (result === 'clipboard') {
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <div className="bg-secondary/40 min-h-full pb-8">
      <div className="flex flex-col items-center gap-2 pt-6 pb-8 px-4">
        <div className="w-[72px] h-[72px] rounded-[18px] bg-primary flex items-center justify-center">
          <span className="text-white text-4xl font-bold">E</span>
        </div>
        <h2 className="text-lg font-bold text-foreground mt-2">E-Code Halal Check</h2>
        <p className="text-[13px] text-muted-foreground">
          Find the halal status of food additives.
        </p>
      </div>

      <div className="px-4 space-y-6">
        <div className="bg-background rounded-xl overflow-hidden border">
          <SettingsRow
            icon={SunMoon}
            label="Appearance"
            value={THEME_LABEL[theme as ThemeOption] ?? 'System'}
            onClick={() => setThemePickerOpen(true)}
          />
        </div>

        <div className="bg-background rounded-xl overflow-hidden border divide-y">
          <SettingsRow
            icon={Database}
            label="Data Source"
            value="MUIS"
            href={MUIS_PDF}
            external
          />
          <SettingsRow icon={Shield} label="Privacy Policy" href="/privacy-policy" />
        </div>

        <div className="bg-background rounded-xl overflow-hidden border divide-y">
          <SettingsRow
            icon={MessageSquare}
            label="Send Feedback"
            href={`mailto:${FEEDBACK_EMAIL}?subject=E-Code%20Halal%20Check%20Feedback`}
            external
          />
          <SettingsRow icon={Share2} label="Share with Friends" onClick={handleShare} />
        </div>

        <div className="flex flex-col items-center gap-1 pt-2">
          <a
            href="https://10kb.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium flex items-center gap-1"
            style={{ color: '#049164' }}
          >
            <Heart className="h-3 w-3" />
            Made by 10kb.co
          </a>
          <span className="text-[11px] text-muted-foreground/70">Version {APP_VERSION}</span>
        </div>
      </div>

      <Dialog open={themePickerOpen} onOpenChange={setThemePickerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appearance</DialogTitle>
            <DialogDescription>Choose how the app looks.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-2">
            {(['system', 'light', 'dark'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setTheme(option);
                  setThemePickerOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                  theme === option
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-secondary/50'
                }`}
              >
                <span className="font-medium">{THEME_LABEL[option]}</span>
                {theme === option && (
                  <span className="text-primary text-sm font-semibold">Selected</span>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AboutScreenInner() {
  const { isInApp } = useAppContext();

  return (
    <>
      <Helmet>
        <title>About | E-Code Halal Check</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      {isInApp ? (
        <AppLayout title="About">
          <AboutContent />
        </AppLayout>
      ) : (
        <WebLayout>
          <AboutContent />
        </WebLayout>
      )}
    </>
  );
}

export default function AboutScreen() {
  return (
    <ThemeProvider>
      <AboutScreenInner />
    </ThemeProvider>
  );
}
