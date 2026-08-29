import { ArrowUpRight } from 'lucide-react';
import { COMMUNITY_APPS } from '../lib/communityApps';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

/**
 * "More details" link that opens a dialog introducing 10kb.co and the other
 * community apps. Used in the footer so the promo stays out of the footer's
 * visual field until asked for.
 */
export function CommunityAppsDialog() {
  return (
    <Dialog>
      <DialogTrigger
        onClick={() =>
          window.gtag?.('event', 'community_apps_dialog_open', {
            event_category: 'footer',
            event_label: 'more_details_link',
          })
        }
        className="text-sm text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
      >
        More details
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Built by 10kb.co</DialogTitle>
          <DialogDescription className="text-left">
            10kb.co builds technical solutions — websites, apps, automations, integrations,
            dashboards, you name it. Alongside our client work, we build free community apps
            like this one.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Other community apps
          </h4>
          <div className="space-y-2">
            {COMMUNITY_APPS.map(({ name, url, tagline, iconSrc, gaLabel }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  window.gtag?.('event', 'community_app_click', {
                    event_category: 'community_apps_dialog',
                    event_label: gaLabel,
                  })
                }
                className="group flex items-center gap-3 rounded-xl border p-3 transition-colors hover:border-primary/40 hover:bg-secondary/50"
              >
                <img
                  src={iconSrc}
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-10 rounded-[10px] shrink-0"
                  width="40"
                  height="40"
                  loading="lazy"
                />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-sm font-medium">{name}</span>
                  <span className="block text-xs text-muted-foreground">{tagline}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/60 group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
