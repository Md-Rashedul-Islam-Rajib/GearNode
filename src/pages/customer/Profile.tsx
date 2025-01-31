import { useGetAllUsersQuery } from "@/redux/features/auth/authApi"
import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";


const Profile = () => {

    const { data } = useGetAllUsersQuery(undefined);
    const user = useAppSelector(currentUser);

    const profile = data?.data.find((item) => user?.email === item.email);
    console.log(profile)
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <div className="flex items-center space-x-6">
        {/* Profile Image */}
        <img
          src={profile?.image}
          alt={profile?.name}
          className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md"
        />
        <div>
          {/* Name */}
          <h1 className="text-2xl font-bold text-gray-800">{profile?.name}</h1>

          {/* Email */}
          <p className="text-gray-600">{profile?.email}</p>

          {/* Role */}
          <span className="px-3 py-1 mt-2 inline-block bg-indigo-100 text-indigo-700 rounded-full text-sm">
            {profile?.role.toUpperCase()}
          </span>

          {/* Blocked Status */}
          {profile?.isBlocked && (
            <span className="px-3 py-1 ml-2 bg-red-100 text-red-700 rounded-full text-sm">
              Blocked
            </span>
          )}

          {/* Account Creation Date */}
          <p className="text-sm text-gray-500 mt-2">
            Joined on: {new Date(profile?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile
