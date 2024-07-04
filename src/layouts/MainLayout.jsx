import React from "react";
import { Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaCat } from "react-icons/fa";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <Flex as="header" bg="teal.500" color="white" py={4} px={8} align="center">
        <Icon as={FaCat} w={8} h={8} mr={2} />
        <Heading as="h1" size="lg">
          Cat Counter App
        </Heading>
      </Flex>
      <Container as="main" maxW="container.lg" py={8} className="main-content">
        {children}
      </Container>
      <Box as="footer" bg="gray.100" py={4} textAlign="center">
        <Text>&copy; {new Date().getFullYear()} Cat Counter App. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default MainLayout;