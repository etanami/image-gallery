
import { useAuth0 } from '@auth0/auth0-react';

const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="text-right">
      {isAuthenticated ? (
        <button className='px-4 py-2 bg-gray-200 rounded-full' onClick={() => logout()}>Log Out</button>
      ) : (
        <button className='px-4 py-2 bg-gray-200 rounded-full' onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
};

export default AuthButton;
