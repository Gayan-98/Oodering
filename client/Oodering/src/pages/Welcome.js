
//THIS IS THE WELCOME SCREEN STILL CONSTRUCTERING **********

import React, { useState, useEffect } from 'react';
import { Box, Image, Text, Flex } from '@chakra-ui/react';
import './Welcome.css';

const foodAndBeverageImages = [
  'url_to_image_1',
  'url_to_image_2',
  'url_to_image_3',
  // Add more image URLs as needed
];

function Welcome() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === foodAndBeverageImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      className="welcome-container"
      direction="column"
      align="center"
      justify="center"
    >
      <Box className="slideshow">
        {foodAndBeverageImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Food and Beverage ${index + 1}`}
            display={index === currentImageIndex ? 'block' : 'none'}
          />
        ))}
      </Box>
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        Welcome to our Kiosk System
      </Text>
    </Flex>
  );
}

export default Welcome;
