import { Routes, Route, useLocation } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

export default function Router() {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return transitions((props, item) => (
    <animated.div key={item.key} style={props}>
      <Routes location={item}>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<NewContact />} />
        <Route path='/edit/:id' element={<EditContact />} />
      </Routes>
    </animated.div>
  ));
}
