/**
 * Server entry used only at build time by scripts/prerender.js.
 * Renders a route to HTML and returns the Helmet head tags for it.
 */
import { renderToString } from 'react-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { AppShell } from './App';

export { getPrerenderRoutes } from './lib/prerenderRoutes';

export function render(url: string): { html: string; helmet: HelmetServerState } {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </HelmetProvider>,
  );
  return { html, helmet: helmetContext.helmet as HelmetServerState };
}
