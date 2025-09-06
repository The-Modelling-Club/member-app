import UserProfile from "./_components/user-profile";

export default function ProfilePage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <UserProfile />
    </div>
  );
}
