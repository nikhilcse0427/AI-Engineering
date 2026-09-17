import ProfilePage from "@/components/ProfilePage/ProfilePage";

export const metadata = {
  title: "Doctor Profile | MediCare+",
  description: "View and manage your doctor profile in MediCare+ platform.",
};

export default function Page() {
  return <ProfilePage userType="doctor" />;
}
