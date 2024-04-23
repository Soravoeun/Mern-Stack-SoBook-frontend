import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";


function UserList({ users }) {
  console.log(users);
  return (
    <div className=" w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <table className="w-full border-collapse divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="bg-gray-400  text-white">
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider sm:px-8 lg:px-10">
              FirstName
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sm:px-8 lg:px-10">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider sm:px-8 lg:px-10">
              Code Postal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider sm:px-8 lg:px-10">
              Opérations
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="bg-white odd:bg-gray-200">
              <td className="px-6 py-4 whitespace-nowrap sm:px-8 lg:px-10">
                {user.firstName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap sm:px-8 lg:px-10">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap sm:px-8 lg:px-10">
                {user.zipcode}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center sm:px-8 lg:px-10">
                <Link
                  to={`/user/delete/${user._id}`}
                  className="font-medium  text-red-600 hover:text-indigo-500 "
                >
                  <CiCircleRemove className="text-3xl cursor-pointer " />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to="/users/create"
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-sm sm:text-base lg:text-lg"
      >
        <BsPlusCircle className="w-5 h-5 inline-block mr-2" /> Créer un
        utilisateur
      </Link>
    </div>
  );
}

export default UserList;
