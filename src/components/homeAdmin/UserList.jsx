import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";


function UserList({ users }) {
  console.log(users);
  return (
   
    <div className="container mx-auto px-4 py-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-400  text-white">
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              FirstName
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Code Postal
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Opérations
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="bg-white odd:bg-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.zipcode}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Link
                  to={`/user/delete/${user._id}`}
                  className="font-medium  text-red-600 hover:text-indigo-500"
                >
                  <CiCircleRemove className="text-4xl cursor-pointer " />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        to="/users/create"
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        <BsPlusCircle className="w-5 h-5 inline-block mr-2" /> Créer un
        utilisateur
      </Link>
    </div>
  );
}

export default UserList;
