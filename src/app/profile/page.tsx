import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold italic text-shadow text-center px-4 text-accent dark:text-secondary">
          You are not signed in :(
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="bg-white shadow-lg rounded-xl px-8 py-10 text-center inline-block"
        style={{
          maxWidth: "90vw",
        }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4 whitespace-nowrap">
          Hello,{" "}
          <span className="text-amber-600">{session.user.email}</span>
        </h1>

        <div className="space-y-2 mb-6">
          <p className="text-gray-600 text-lg whitespace-nowrap">
            <span className="font-medium text-gray-800">Google ID:</span>{" "}
            <span>
              {session.user.googleId || "—"}
            </span>
          </p>
          <p className="text-gray-600 text-lg whitespace-nowrap">
            <span className="font-medium text-gray-800">Role:</span>{" "}
            <span>
              {session.user.role || "—"}
            </span>
          </p>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Welcome!</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
