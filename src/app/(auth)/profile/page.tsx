import { requireSession } from "@/lib/session";
import ProfileView from "@/components/profile/ProfileView";

export default async function ProfilePage() {
  // 🔒 লগইন ছাড়া এই পেজ খোলে না
  const session = await requireSession("/profile");
  const { name, email, image } = session.user;

  return <ProfileView name={name} email={email} image={image ?? null} />;
}