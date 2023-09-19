/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
const Card = ({ id, tag, src, index }) => {
  return (
    <div className="my-2 p-2 text-center">
      <img src={src} alt={tag} width={400} height={400} className="object-cover h-full" />
      <p>{tag}</p>
    </div>
  );
};

export default Card;