import ProfilePage from "@/components/ProfilePage/ProfilePage";

export const metadata = {
  title: "Patient Profile | MediCare+",
  description: "View and manage your doctor profile in MediCare+ platform.",
};

export default function Page() {
  return <ProfilePage userType="patient" />;
}
