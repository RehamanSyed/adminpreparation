import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { notification } from "antd";

export function useGetAllStack() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["techData"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/alltech").then((res) => res.json()),
  });
  return {
    data,
    error,
    refetch,
    isLoading,
  };
}
export function useCreateStack() {
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
}
export function useDeleteStack() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["deleteTech"],
    mutationFn: async (itemid) => {
      console.log("item data", itemid);

      const result = await axios
        .delete(`http://localhost:5000/api/v1/deleteTech/${itemid}`)
        .then((response) => {
          api.info({
            message: `Added Successfully`,
            description: "Item added",
            placement: "bottom",
          });
          console.log(response.data); // log the response data to the console
        })
        .catch((error) => {
          api.error({
            message: `Something went wrong`,
            description: "Some thing went wront",
            placement: "bottom",
          });
          console.error(error); // log any errors to the consolesdf
        });
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["techData"] }),
  });
  return { deleteMutation };
}
