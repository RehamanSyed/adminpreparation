import React, { useEffect, useRef } from "react";
import {
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
import {
  deleteQuestion,
  getAllReactQuestion,
  useDeleteQuestion,
  useGetAllReactQuestion,
} from "@/modules/stacks/hooks/useReact";
import { Button, Space, Table } from "antd";

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
  const { data, isLoading, error, refetch } = useGetAllReactQuestion();
  
  const { deleteMutation } = useDeleteQuestion();
// console.log(data)
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "1",
      render: (item, idx) => <a key={idx}>{item}</a>,
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "2",
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "3",
    },
    {
      title: "Example",
      dataIndex: "example",
      key: "4",
    },
    {
      title: "Action",
      key: "5",
      render: (_, record) => (
        <Space size="middle">
          <Button type="dashed">Edit</Button>
          <Button type="dashed" onClick={() => deleteHandler(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
    deleteMutation.mutate(item._id);
  };
  // useEffect(() => {
  //   if (data) {
  //     refetch();
  //   }
  // }, [data]);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={4}
        bg={"gray.900"}
        rounded={"lg"}
        mb={10}
      >
        <Heading fontSize={"xl"}>All React Question</Heading>

        <Button
          as={"a"}
          type="primary"
          href="./react/create-post"
        
        >
          Add New Post
        </Button>
      </Flex>
      <Container maxW={"full"}>
        <Table columns={columns} dataSource={data} />
      </Container>
    </Box>
  );
};

export default AllReactQuestion;
