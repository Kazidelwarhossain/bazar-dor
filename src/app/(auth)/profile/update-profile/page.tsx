import { redirect } from "next/navigation";

// ফিগমায় আপডেট ফর্ম প্রোফাইল পেজেই আছে
export default function UpdateProfileRedirect() {
  redirect("/profile");
}