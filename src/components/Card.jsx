/* eslint-disable react/prop-types */
import { useAuth0 } from '@auth0/auth0-react';
import { useRef } from 'react';
import { useDrop, useDrag } from "react-dnd";

const Card = ({ id, tag, src, index, moveImage, isLoading }) => {
  const ref = useRef(null);
  const { isAuthenticated } = useAuth0();
  
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

  // define the drag area , but only allow dragging when authenticated
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    canDrag: isAuthenticated,
    // collect: (monitor) => {
    //   return {
    //     isDragging: monitor.isDragging()
    //   };
    // }
  });
        
  // useDrag component  
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="card">
      {isLoading ? (
        // Display loading indicator
        <div role="status" className="my-8 animate-pulse">
          <div className="flex items-center justify-center bg-gray-300 rounded w-96 h-96 ">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
              </svg>
          </div>
          <div className="w-full mt-4">
            <div className="h-8 bg-gray-200 rounded-full"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        // Display the card content when isLoading is false
        <>
          <img src={src} alt={tag} width={400} height={400} className="object-cover w-full h-full" />
          <p className="py-2 text-lg font-bold">{tag}</p>
        </>
      )}
    </div>
  );
};

export default Card;