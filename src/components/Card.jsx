/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { useDrop, useDrag } from "react-dnd";

// eslint-disable-next-line no-unused-vars
const Card = ({ id, tag, src, index, moveImage }) => {
  const ref = useRef(null); 
  
  // define the drop area
  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
                  return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      
      moveImage(dragIndex, hoverIndex);
      
      item.index = hoverIndex;
    }
  });

  // define the drag area
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });
        
  // useDrag component  
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="my-2 p-2 text-center">
      <img src={src} alt={tag} width={400} height={400} className="object-cover h-full" />
      <p>{tag}</p>
    </div>
  );
};

export default Card;