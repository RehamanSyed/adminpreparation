import {
  Box,
  Button,
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
      <Box bg={"gray.900"} w={"calc(100vw)"} position={"relative"} p={5}>
        <Flex justifyContent={"space-between"}>
          <Heading size={"md"}>Prepare Interview</Heading>
          <Button display={{ base: "block", md: "none" }}></Button>
          <Text>User Account</Text>
        </Flex>
      </Box>
      <Box
        as="section"
        position={"fixed"}
        w={{ base: "0px", md: "275px" }}
        minH={"calc(100vh)"}
        shadow={"lg"}
        bg={"gray.900"}
      >
        <Stack>
          <UnorderedList listStyleType={"none"} spacing={2}>
            <ListItem
              p={2}
              _hover={{ bg: "gray.800", rounded: "lg", color: "white" }}
            >
              <Link href="/react"> ReactJs</Link>
            </ListItem>
            <ListItem
              p={2}
              _hover={{ bg: "gray.800", rounded: "lg", color: "white" }}
            >
              <Link href="#"> Css</Link>
            </ListItem>
            <ListItem
              p={2}
              _hover={{ bg: "gray.800", rounded: "lg", color: "white" }}
            >
              <Link href="#"> Javascript</Link>
            </ListItem>
            <ListItem
              p={2}
              _hover={{ bg: "gray.800", rounded: "lg", color: "white" }}
            >
              <Link href="#"> Next Js</Link>
            </ListItem>
            <ListItem
              p={2}
              _hover={{ bg: "gray.800", rounded: "lg", color: "white" }}
            >
              <Link href="#"> Html</Link>
            </ListItem>
          </UnorderedList>
        </Stack>
      </Box>
      <Box position="relative" left={"275px"} w={"calc(100% - 275px)"} p={10}>
        {children}
      </Box>
    </main>
  );
};

export default MainLayout;
