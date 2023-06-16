import { useCreateQuestion } from "@/modules/stacks/hooks/useReact";
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
// const InputField = ({ name }) => {
//   const { control } = useFormContext();
//   const {
//     field: { onChange, ...field },
//   } = useController({ control, name });

//   return (
//     <>
//       <FormControl mb={10}>
//         <FormLabel>Enter ther question</FormLabel>
//         <Input {...field} onChange={onChange} />
//         {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
//       </FormControl>
//     </>
//   );
// };
// const InputUrl = ({ name }) => {
//   const { control } = useFormContext();
//   const {
//     field: { onChange, ...field },
//   } = useController({ control, name });

//   return (
//     <>
//       <FormControl mb={10}>
//         <FormLabel>Enter codesandbox Url (optional)</FormLabel>
//         <Input {...field} onChange={onChange} />
//         {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
//       </FormControl>
//     </>
//   );
// };

export default function NewReactPost() {
  const methods = useForm();
  // const { control } = useFormContext();
  // const {
  //   field: { onChange, ...field },
  // } = useController({ control, name });
  const { createMutation } = useCreateQuestion();
  const onSubmit = (formData) => {
    console.log(formData);
    createMutation.mutate(formData);
  };

  return (
    <Box>
      <Container maxW={"container.lg"}>
        <Flex justifyContent={"space-between"} my={5} bg={"gray.900"}>
          <Box>
            <Heading size={"md"}>Tech Post</Heading>
          </Box>
          <Box>
            <Button as={"a"} colorScheme="teal" variant="outline" href="./">
              All Post
            </Button>
          </Box>
        </Flex>

        <Form
          name="basic"
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="techname"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            Enter ther question?
            <Input placeholder="sadfdsf"  />
          </Form.Item>
          <Form.Item
            name="techname"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            Enter codesandbox Url (optional)
            <Input placeholder="sadfdsf"  />
          </Form.Item>

          <Form.Item>
            <Editor
              apiKey={"qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"}
              // onEditorChange={onChange}
              init={{
                skin: "oxide-dark",
                content_css: "dark",
                height: 400,
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
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add Stack
            </Button>
          </Form.Item>
        </Form>
        {/* <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Flex gap={5}>
              <InputField name="question" />
              <InputUrl name="url" />
            </Flex>
            <HtmlEditorComponent name="answer" />

            <Button type="submit" colorScheme="teal" mt={4}>
              Submit
            </Button>
          </form>
        </FormProvider> */}
      </Container>
    </Box>
  );
}
