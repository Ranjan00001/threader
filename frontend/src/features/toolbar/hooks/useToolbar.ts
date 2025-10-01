import { useDispatch } from "@/imports";
import { toggleExpanded } from "@/slices/threadLocalSlice";

export const useToolbar = () => {
  const dispatch = useDispatch();

  const toggleThread = () => {
    dispatch(toggleExpanded());
  };

  return { toggleThread };
};
