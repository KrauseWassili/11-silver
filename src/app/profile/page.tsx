import { getServerSession } from "next-auth";
import Image from "next/image";

const ProfilePage = async () => {
  const session = await getServerSession();
  if (!session) return <div>Not signed in</div>;
  return (
    <div>
      <h1>Hello, {session.user?.email}</h1>
      <Image
        src={session.user?.image || ""}
        width={200}
        height={200}
        alt="avatar"
        unoptimized
      />
      <p>Google ID:{session.user.googleId}</p>
    </div>
  );
};

export default ProfilePage;
