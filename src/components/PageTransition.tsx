import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return <motion.div transition={{ duration: 0.5 }}>{children}</motion.div>;
};

export default PageTransition;
