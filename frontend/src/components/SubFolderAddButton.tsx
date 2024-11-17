import { toast } from "sonner";
import { postApi } from "@/utils/api";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function SubFolderAddButton({
  refetch,
  buttonName = "Add",
}: {
  refetch: () => void;
  buttonName?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  }: any = useForm();

  const item = useSelector((state: any) => state.folder);
  console.log(item?.data[0]?._id);

  const { mutate } = useMutation({
    mutationFn: (data: any) => postApi("/sub-folder/create-sub-folder", data),
    onSuccess: () => {
      toast.success("Folder has been created.");
      refetch();
      reset();
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      const message =
        error?.response?.data?.message ||
        "An error occurred. Please try again.";
      toast.error(message);
    },
  });

  // Handle the form submission
  const handleAddClick = (data: any) => {
    mutate({ ...data, folderId: item?.data[0]?._id });
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddClick)}
      className="w-full max-w-md relative flex items-center space-x-2"
    >
      <div className="relative w-full flex flex-col justify-start">
        <Input
          {...register("subfolderName", {
            required: "Sub Folder name is required",
            minLength: {
              value: 3,
              message: "Folder name must be at least 3 characters",
            },
          })}
          type="text"
          placeholder="Enter folder name..."
          className="pl-4 pr-10 w-full"
          aria-label="Folder Name"
        />
        {errors.subfolderName && (
          <span className="absolute text-red-500 text-sm mt-2 ml-2 top-full left-0">
            {errors.subfolderName.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        variant="outline"
        className="h-10 w-28 text-muted-foreground pointer"
        disabled={isSubmitting}
      >
        {buttonName}
      </Button>
    </form>
  );
}
