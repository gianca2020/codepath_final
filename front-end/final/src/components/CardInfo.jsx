import React from 'react';
import { Link } from 'react-router-dom';

const CardInfo = (props) => (
  <Link to="/postinfo" state={{ post: props }}>
    <div className="card bg-white p-4 rounded-lg shadow-md flex flex-col cursor-pointer hover:shadow-lg transition max-w-6xl mx-auto mt-6">
      <p className="text-lg text-gray-500">Posted {props.date} hours ago</p>
      <h2 className="text-xl font-semibold">{props.title}</h2>
      <p className="text-sm text-gray-400">Vote Count: {props.vote}</p>
    </div>
  </Link>
);

export default CardInfo;
