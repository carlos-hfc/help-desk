interface AvatarProps {
  avatar?: string
  name: string
  email?: string
}

export function Avatar({ name, avatar, email }: AvatarProps) {
  const fallback = name
    .split(" ")
    .map(item => item.charAt(0))
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-center gap-2">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="size-7 rounded-full object-cover"
        />
      ) : (
        <div className="rounded-full bg-blue-dark size-7 text-gray-600 content-center text-center text-xs">
          {fallback}
        </div>
      )}

      <div>
        <span className="block text-gray-200">{name}</span>
        <span className="block text-gray-300 text-xs">{email}</span>
      </div>
    </div>
  )
}
