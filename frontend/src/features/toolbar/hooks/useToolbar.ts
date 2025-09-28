import { useDispatch } from "@/imports";
import { toggleExpanded } from "@/features/thread/store/threadLocalSlice";

export const useToolbar = () => {
  const dispatch = useDispatch();

  const toggleThread = () => {
    dispatch(toggleExpanded());
  };

  return { toggleThread };
};
