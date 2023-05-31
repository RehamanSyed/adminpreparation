import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { notification } from "antd";

export const getAllReactQuestion = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["reactData"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/allReactPost").then((res) =>
        res.json()
      ),
  });
  return {
    data,
    error,
    refetch,
    isLoading,
  };
};

export const createQuestion = () => {
  const queryClient = useQueryClient();
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
      console.log("Tech name", result);

      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["techData"] }),
  });
  return { createMutation };
};
export const deleteQuestion = () => {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["deleteTech"],
    mutationFn: async (item) => {
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
