import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const pageTransition = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
};

const AnimatedRoute = ({ children }) => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageTransition}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const useAnimatedRoutes = (routes) => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<AnimatedRoute>{element}</AnimatedRoute>}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default useAnimatedRoutes;
