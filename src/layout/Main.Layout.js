import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <main>
      <Box
        as="section"
        position={"fixed"}
        w={{ base: "0px", md: "275px" }}
        minH={"calc(100vh)"}
        shadow={"lg"}
        bg={"gray.900"}
      >
        <Stack>
          <Flex p={10} bg={"yellow.900"}>
            <Heading size={"md"}>Prepare Interview</Heading>
          </Flex>
          <UnorderedList listStyleType={"none"} spacing={2} fontSize={12}>
            <ListItem
              p={2}
              px={5}
              _hover={{ bg: "gray.800", rounded: "lg", color: "white" }}
            >
              <Link href="/allTechnologies">Technologies</Link>
            </ListItem>
            <ListItem
              p={2}
              px={5}
              _hover={{ bg: "gray.800", rounded: "lg", color: "white" }}
            >
              <Link href="/tech-post/allposts">Post</Link>
            </ListItem>
          </UnorderedList>
        </Stack>
      </Box>
      <Box
        as="section"
        position="relative"
        left={"275px"}
        w={"calc(100% - 275px)"}
      >
        <Container maxW={"full"} p={0}>
          <Box bg={"gray.900"} w={"calc(100vw)"} position={"relative"} p={5}>
            <Flex justifyContent={"end"}>
              <Button display={{ base: "block", md: "none" }}></Button>
              <Text>User Account</Text>
            </Flex>
          </Box>
          {/* <Flex justifyContent={"space-between"} mb={10} p={5}>
            <Box>
              <Heading>Technologies</Heading>
            </Box>
            <Box>
              <Button colorScheme="teal" variant="outline">
                Add New Technology
              </Button>
            </Box>
          </Flex> */}

          {children}
        </Container>
      </Box>
    </main>
  );
};

export default MainLayout;
