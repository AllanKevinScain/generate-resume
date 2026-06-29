import { Button, Input, Text } from "@/components";
import { useAuth } from "@/hooks";
import { LoginSchema, type Login } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: Login) => {
    const success = login(data.email, data.password);

    if (success) {
      navigate("/admin");
    } else {
      setError("root", {
        type: "manual",
        message: "Invalid credentials",
      });
    }
  };

  if (isAuthenticated) {
    navigate("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--color-bg)">
      <div className="w-full max-w-md rounded-lg bg-(--color-card) p-8 sm:border sm:border-(--color-border) sm:shadow-xl">
        <Text variant="h1">Login</Text>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Input name="email" control={control} label="Email" />
          </div>

          <div className="flex flex-col gap-1">
            <Input name="password" control={control} label="Password" type="password" />
          </div>

          {errors.root && (
            <Text variant="span" className="text-red-500">
              {errors.root.message}
            </Text>
          )}

          <Button.solid type="submit" className="mt-4">
            Login
          </Button.solid>
        </form>
      </div>
    </div>
  );
}
