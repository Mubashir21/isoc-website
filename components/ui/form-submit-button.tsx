import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
      ) : (
        "Submit"
      )}
    </Button>
  );
}
