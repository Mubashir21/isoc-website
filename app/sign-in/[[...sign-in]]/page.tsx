import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main>
      <div className="h-screen flex items-center justify-center">
        <SignIn />
      </div>
    </main>
  );
}
