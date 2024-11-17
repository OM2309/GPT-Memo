import { toast } from "sonner";
import { postApi } from "@/utils/api";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

export default function AddButton({ refetch }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  }: any = useForm();

  const { mutate } = useMutation({
    mutationFn: (data: { folderName: string }) =>
      postApi("/folder/create-folder", data),
    onSuccess: () => {
      toast.success("Folder has been created.");
      refetch();
      reset();
    },
    onError: (error: any) => {
      console.log("helo", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  // handle the form submission
  const handleAddClick = (data: { folderName: string }) => {
    mutate(data); // Trigger the mutation with the folder name
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddClick)} // Using handleSubmit from react-hook-form
      className="w-full max-w-md relative flex items-center space-x-2"
    >
      <div className="relative w-full flex flex-col justify-start">
        <Input
          {...register("folderName", {
            required: "Folder name is required",
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
        {/* Use absolute positioning for the error message to avoid layout shift */}
        {errors.folderName && (
          <span className="absolute text-red-500 text-sm mt-2 ml-2 top-full left-0">
            {errors.folderName.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        variant="outline"
        className="h-10 w-16  text-muted-foreground pointer " // Add margin-top to create space between the button and input
        disabled={!!errors.folderName} // Disable button if there's a validation error
      >
        Add
      </Button>
    </form>
  );
}
