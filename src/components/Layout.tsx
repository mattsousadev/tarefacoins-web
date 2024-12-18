import React from 'react';
import { Box } from '@chakra-ui/react';
import AppBar from './AppBar';

interface LayoutProps {
  title?: string;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <Box
      data-state="open"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "750ms",
        }}
      w="100vw"
      display="flex"
      flexDirection="column">
      <AppBar title={title} />
      <Box flex="1" overflowY="auto" p={4}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;