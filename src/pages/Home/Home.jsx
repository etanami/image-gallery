import { useState } from "react";
import Card from "../../components/Card";
import imageList from "../../imagesData"

const Home = () => {
  const [images, setImages] = useState(imageList);

  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((image, index) => (
        <Card
          key={image.id}
          tag={image.tag}
          src={image.thumb}
          id={image.id}
          index={index}
        />
      ))}
    </div>
  )
}

export default Home;