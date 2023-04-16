import MainLayout from "@/layout/Main.Layout";
import "@/styles/globals.css";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
