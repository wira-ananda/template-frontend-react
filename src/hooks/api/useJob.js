import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../middleware/axiosInstance";
import errorMiddleware from "../../middleware/errorMiddleware";
import { message } from "antd";

export const useGetAllAppliance = () => {
  return useQuery({
    queryKey: ["allAppliance"],
    queryFn: async () => {
      const response = await axiosInstance.get("/");
      return response.data;
    },
    onSuccess: () => {
      message.success("success!");
    },
    onError: errorMiddleware,
  });
};

export const usePostAppliance = () => {
  return useMutation({
    mutationFn: async (applianceData) => {
      const { data } = await axiosInstance.post("/", applianceData);
      return data;
    },
    onSuccess: () => {
      message.success("success!");
    },
    onError: errorMiddleware,
  });
};
