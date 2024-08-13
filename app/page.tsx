import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/home"); // or any other user page you want as the landing page
}
