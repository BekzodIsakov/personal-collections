import { Box, Heading, Link, Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <Box px='10' pt='10' textAlign='center'>
      <Heading as='h1' mb='7' size='xl'>
        <Text mb='3'>404</Text>
        <Text fontWeight={"normal"}>
          Page you are looking for could not be found.
        </Text>
      </Heading>
      <Link href='/' color='blue.400'>
        Go to main page
      </Link>
    </Box>
  );
};

export default NotFoundPage;
