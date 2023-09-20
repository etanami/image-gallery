import { useState, useCallback } from "react";
import Card from "../../components/Card";
import imageList from "../../imagesData"
import SearchBar from "../../components/SearchBar";

const Home = () => {
  const [images, setImages] = useState(imageList);

  // search card components from user input
  const getSearch = (searchTag) => {
    const searchResults = imageList.filter(image => 
      image.tag.toLowerCase().includes(searchTag.toLowerCase())
    );
    setImages(searchResults);
  }
  
  // move image from one location to another
  const moveImage = useCallback((dragIndex, hoverIndex) => {
    setImages((prevCards) => {
    const clonedCards = [...prevCards];
    const removedItem = clonedCards.splice(dragIndex, 1)[0];
    clonedCards.splice(hoverIndex, 0, removedItem);
    return clonedCards;
  });
  }, []);

  return (
    <div className="p-8 max-w-[1440px] mx-auto">
      <SearchBar getSearch={getSearch} />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {images.map((image, index) => (
          <Card
            key={image.id}
            tag={image.tag}
            src={image.thumb}
            id={image.id}
            index={index}
            moveImage={moveImage}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;