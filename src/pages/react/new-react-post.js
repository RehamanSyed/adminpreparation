import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
const InputField = ({ name }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, ...field },
  } = useController({ control, name });

  return (
    <>
      <FormControl mb={10}>
        <FormLabel>Enter ther question</FormLabel>
        <Input {...field} onChange={onChange} />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
    </>
  );
};
const InputUrl = ({ name }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, ...field },
  } = useController({ control, name });

  return (
    <>
      <FormControl mb={10}>
        <FormLabel>Enter codesandbox Url (optional)</FormLabel>
        <Input {...field} onChange={onChange} />
        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
      </FormControl>
    </>
  );
};
const HtmlEditorComponent = ({ name }) => {
  const { control } = useFormContext();
  const {
    field: { onChange, ...field },
  } = useController({ control, name });

  return (
    <>
      <FormControl>
        <FormLabel>Enter your Answer</FormLabel>
        <Editor
          apiKey={"qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"}
          {...field}
          onEditorChange={onChange}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </FormControl>
    </>
  );
};

export default function NewReactPost() {
  const queryClient = useQueryClient();
  const methods = useForm();

  const createMutation = useMutation({
    mutationKey: ["createTech"],
    mutationFn: async (formData) => {
      const result = await axios
        .post(`http://localhost:5000/api/v1/createReactPost`, {
          question: formData.question,
          answer: formData.answer,
          example: formData.url,
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
    console.log(formData);

    createMutation.mutate(formData);
  };

  return (
    <Box>
      <Container maxW={"container.lg"}>
        <Flex justifyContent={"space-between"} my={5}>
          <Box>
            <Heading size={"md"}>Tech Post</Heading>
          </Box>
          <Box>
            <Button
              as={"a"}
              colorScheme="teal"
              variant="outline"
              href="/tech-post/allposts"
            >
              All Post
            </Button>
          </Box>
        </Flex>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField name="question" />
            <InputUrl name="url" />
            <HtmlEditorComponent name="answer" />

            <Button type="submit" colorScheme="teal" mt={4}>
              Submit
            </Button>
          </form>
        </FormProvider>
      </Container>
    </Box>
  );
}
