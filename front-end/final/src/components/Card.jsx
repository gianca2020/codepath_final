const Card = ({ date, title, vote, image }) => {
  return (
    <div className="card bg-white p-4 rounded-lg shadow-md flex flex-col">
      <p className="text-lg text-gray-500">Posted {date} hours ago</p>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-400">Vote Count: {vote}</p>
    </div>
  );
};

export default Card;
