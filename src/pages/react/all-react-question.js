import React, { useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Button,
  Box,
  Container,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaEdit, FaRegEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";

const AllReactQuestion = () => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteonOpen,
    onClose: deleteOnClose,
  } = useDisclosure();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, error, data } = useQuery({
    queryKey: ["techpostData"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/allReactPost").then((res) =>
        res.json()
      ),
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteTech"],
    mutationFn: async (item) => {
      console.log("item data", item);
      const result = await axios
        .delete(`http://localhost:5000/api/v1/tech/${item}`)
        .then((response) => {
          console.log(response.data); // log the response data to the console
        })
        .catch((error) => {
          console.error(error); // log any errors to the consolesdf
        });
      return result;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["deleteTech"] }),
  });

  const createMutation = useMutation({
    mutationKey: ["createTech"],
    mutationFn: async (techname) => {
      const result = await axios
        .post(`http://localhost:5000/api/v1/createTech`, {
          technology: techname,
          page: techname,
        })
        .then((response) => {
          console.log(response.data); // log the response data to the console
        })
        .catch((error) => {
          console.error(error); // log any errors to the console
        });
      return result;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["createTech"] }),
  });
  const onSubmit = (formData) => {
    createMutation.mutate(formData.techname);
    onClose();
  };

  const deleteHandler = (item) => {
    console.log(item);
    deleteMutation.mutate(item);
    // deleteonOpen();
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={4}
        bg={useColorModeValue("gray.200", "gray.700")}
        rounded={"lg"}
        mb={10}
      >
        <Heading fontSize={"xl"}> All React Question</Heading>

        <Button
          as={"a"}
          colorScheme="teal"
          variant="outline"
          href="/react/new-react-post"
          size={"md"}
        >
          Add New Post
        </Button>
      </Flex>
      <Container maxW={"full"}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Question</Th>
                <Th>Answer</Th>
                <Th w={"300px"}>codeSandbox URL</Th>
                <Th textAlign={"center"}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, idx) => {
                console.log("typeo", item.example);
                return (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{item.question}</Td>
                    <Td whiteSpace={"normal"}>
                      <Text minW={"300px"} noOfLines={3}>
                        {item.answer}
                      </Text>
                    </Td>
                    <Td whiteSpace={"normal"}>
                      <Text minW={"300px"}>
                        {item.example ? (
                          <Link
                            href={item.example}
                            target="_blank"
                            color={"red.700"}
                            fontSize={12}
                          >
                            {item.example}
                          </Link>
                        ) : (
                          "No URL"
                        )}
                      </Text>
                    </Td>

                    <Td>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Button colorScheme="teal" variant="outline">
                          <FaEdit size={18} />
                        </Button>
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => deleteHandler(item._id)}
                        >
                          <FaTrashAlt size={18} />
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={10}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <FormLabel>Technology Name</FormLabel>
                <Input
                  placeholder=""
                  {...register("techname", { required: true })}
                />
                {errors.exampleRequired && <span>This field is required</span>}
              </FormControl>
              <Button
                mt={10}
                colorScheme="teal"
                // isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={deleteIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteOnClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteOnClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AllReactQuestion;
