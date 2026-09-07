// Route-preload registry. Each entry is a dynamic import that matches its
// React.lazy() call in App.tsx. Because the module loader caches, calling
// the same import() a second time, before the user navigates, warms the
// chunk without duplicating work.
export const routePreloaders: Record<string, () => Promise<unknown>> = {
  '/': () => Promise.resolve(), // eager
  '/innovation': () => import('../pages/Innovation'),
  '/impact': () => import('../pages/Impact'),
  '/change': () => import('../pages/Change'),
  '/tools': () => import('../pages/Tools'),
  '/sources': () => import('../pages/Sources'),
  '/glossary': () => import('../pages/Glossary'),
  '/process': () => import('../pages/Process'),
}
