interface Props {
  displayName: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
}

export const CreatorHeader = ({ displayName, username, avatarUrl, bio }: Props) => (
  <div className="text-center -mt-16 pb-8">
    <img src={avatarUrl || '/avatar.png'} alt="avatar" className="w-32 h-32 rounded-full border-4 border-tipjar-gold mx-auto" />
    <h1 className="text-3xl font-heading text-white mt-4">{displayName}</h1>
    <p className="text-tipjar-gray-light">@{username}</p>
    {bio && <p className="mt-2 text-tipjar-gray-light">{bio}</p>}
  </div>
);
