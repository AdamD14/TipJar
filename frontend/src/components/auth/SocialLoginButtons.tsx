import React from 'react';

export const SocialLoginButtons = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  return (
    <>
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-tipjar-turquoise"></div>
        <span className="flex-shrink mx-4 text-tipjar-gray-light">LUB</span>
        <div className="flex-grow border-t border-tipjar-turquoise"></div>
      </div>
      <div className="space-y-4">
        <a href={`${backendUrl}/auth/google`} className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50">
          Kontynuuj z Google
        </a>
        <a href={`${backendUrl}/auth/twitch`} className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#9146FF] hover:bg-opacity-90">
          Kontynuuj z Twitch
        </a>
      </div>
    </>
  );
};
