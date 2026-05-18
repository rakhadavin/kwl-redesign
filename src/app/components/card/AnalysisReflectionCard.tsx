type ReflectionProps = {
    username: string;
    reflection: string;
  };
  
const Reflection: React.FC<ReflectionProps> = ({ username, reflection }) => {
    return (
      <div className="flex items-center bg-white shadow-md rounded-lg p-4 mb-4">
        <img
          src="/prof_pic.jpg"
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{username}</h3>
          <p className="text-gray-600 text-base">{reflection}</p>
        </div>
      </div>
    );
  }

export default Reflection;