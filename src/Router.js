import useAnimatedRoutes from './hooks/useAnimatedRoute';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

export default function Router() {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/new', element: <NewContact /> },
    { path: '/edit/:id', element: <EditContact /> },
  ];

  const animatedRoutes = useAnimatedRoutes(routes);

  return <>{animatedRoutes}</>;
}
