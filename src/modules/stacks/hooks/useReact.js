import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { notification } from "antd";

export const useGetAllReactQuestion = () => {  
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["reactData"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/allReactPost").then((res) =>
        res.json()
      ),
  });
  console.log("use query", data);

  return {
    data,
    error,
    refetch,
    isLoading,
  };
};
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationKey: ["createTech"],
    mutationFunc: async (techname) => {
      const result = await axios
        .post(`http://localhost:5000/api/v1/createReactPost`, {
          technology: techname,
          page: techname,
        })
        .then((response) => {
          console.log(response.data); // log the response data to the console
        })
        .catch((error) => {
          console.error(error); // log any errors to the console
        });
      console.log("Tech name", result);

      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["techData"] }),
  });
  return { createMutation };
};
export const useDeleteQuestion = () => {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["deleteTech"],
    mutationFunc: async (item) => {
      console.log("item data", item);
      const result = await axios
        .delete(`http://localhost:5000/api/v1/deleteReactPost/${item}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reactData"] }),
  });
  return { deleteMutation };
};
