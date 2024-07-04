import React, { useState } from "react";
import { Box, Button, Container, Heading, Image, Text, VStack, useToast } from "@chakra-ui/react";
import { FaShip, FaUpload } from "react-icons/fa";
import { useHubs, useAddHub } from "../integrations/supabase/index.js";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();
  const { data: hubs, error: hubsError, isLoading: hubsLoading } = useHubs();
  const addHubMutation = useAddHub();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image first.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddHub = () => {
    addHubMutation.mutate({ image: selectedImage }, {
      onSuccess: () => {
        toast({
          title: "Hub added",
          description: "The hub has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error adding hub",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={8} align="center" w="full">
        <Heading>Port Management App</Heading>
        <Box>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button as="span" leftIcon={<FaUpload />} colorScheme="blue">
              Upload Image
            </Button>
          </label>
        </Box>
        {selectedImage && (
          <Box boxShadow="md" borderRadius="lg" overflow="hidden">
            <Image src={selectedImage} alt="Uploaded" maxH="300px" />
          </Box>
        )}
        <Button
          leftIcon={<FaShip />}
          colorScheme="green"
          onClick={handleUploadClick}
          isDisabled={!selectedImage}
        >
          Add Hub
        </Button>
        <Button
          colorScheme="teal"
          onClick={handleAddHub}
          isDisabled={!selectedImage}
        >
          Add Hub
        </Button>
        {hubsLoading && <Text>Loading hubs...</Text>}
        {hubsError && <Text>Error loading hubs: {hubsError.message}</Text>}
        {hubs && hubs.map((hub) => (
          <Box key={hub.id} p={4} borderWidth={1} borderRadius="lg" w="full">
            <Text>Hub ID: {hub.id}</Text>
            <Image src={hub.image} alt={`Hub ${hub.id}`} maxH="100px" />
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;