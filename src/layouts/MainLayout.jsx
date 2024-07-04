import React from "react";
import { Box, Container, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaShip } from "react-icons/fa";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <Flex as="header" bg="blue.500" color="white" py={4} px={8} align="center">
        <Icon as={FaShip} w={8} h={8} mr={2} />
        <Heading as="h1" size="lg">
          Port Management App
        </Heading>
      </Flex>
      <Container as="main" maxW="container.lg" py={8} className="main-content new-design">
        {children}
      </Container>
      <Box as="footer" bg="gray.100" py={4} textAlign="center">
        <Text>&copy; {new Date().getFullYear()} Port Management App. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default MainLayout;