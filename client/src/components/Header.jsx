// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   return (
//     <div className='bg-slate-200'>
//       <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
//         <Link to='/'>
//           <h1 className='font-bold'>Auth App</h1>
//         </Link>
//         <ul className='flex gap-4'>
//           <Link to='/'>
//             <li>Home</li>
//           </Link>
//           {/* <Link to='/watchlist'>
//             <li>Watchlist</li>
//           </Link> */}
//           <Link to='/about'>
//             <li>About</li>
//           </Link>
//           <Link to='/profile'>
//             {currentUser ? (
//               <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
//             ) : (
//               <li>Sign In</li>
//             )}
//           </Link>
//         </ul>
//       </div>
//     </div>
//   );
// }


import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-6">
        <Link to="/" className="text-white font-bold text-2xl">
          Auth App
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-white hover:text-gray-300 transition duration-300">
            Home
          </Link>
          {/* <Link to='/watchlist'>
            <li>Watchlist</li>
          </Link> */}
          <Link to="/about" className="text-white hover:text-gray-300 transition duration-300">
            About
          </Link>
          <Link to="/profile" className="flex items-center">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <span className="text-white hover:text-gray-300 transition duration-300">Sign In</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
