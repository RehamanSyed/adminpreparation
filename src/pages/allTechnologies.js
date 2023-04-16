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
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
const TechnologyList = () => {
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
    queryKey: ["techData"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/alltech").then((res) => res.json()),
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteTech"],
    mutationFn: async (item) => {
      console.log("item data", item);
      const result = await axios
        .delete(`http://localhost:5000/api/v1/deleteTech/${item}`)
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
    <Box p={10}>
      <Flex justifyContent={"space-between"} mb={20}>
        <Box>
          <Heading>Technologies</Heading>
        </Box>
        <Box>
          <Button colorScheme="teal" variant="outline" onClick={onOpen}>
            Add New Technology
          </Button>
        </Box>
      </Flex>
      <Container maxW={"full"}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Page</Th>
                <Th textAlign={"center"}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{item._id}</Td>
                    <Td>{item.technology}</Td>
                    <Td>{item.page}</Td>
                    <Td>
                      <Stack
                        direction="row"
                        spacing={4}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Button colorScheme="teal" variant="outline">
                          Edit
                        </Button>
                        <Button
                          colorScheme="teal"
                          variant="outline"
                          onClick={() => deleteHandler(item._id)}
                        >
                          Delete
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

export default TechnologyList;
