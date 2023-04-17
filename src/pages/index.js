import Head from "next/head";
import { Box, Heading } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const editorRef = useRef(null);
  const [value, setValue] = useState(
    "<p>The quick brown fox jumps over the lazy dog</p>"
  );
  const [text, setText] = useState("");

  function handleEditorChange(e) {
    setContent(e.target.getContent());
  }

  return (
    <>
      <Box>
        <Heading>React</Heading>
      </Box>
    </>
  );
}
