import { useEffect, useState } from "react";

export const useGetRandomPhoto = (id) => {
  const [photo, setPhoto] = useState("");
 

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
        const {thumbnailUrl} =await res.json()
        setPhoto(thumbnailUrl)
      } catch (error) {
        console.log(error);
      }
    };
    if (id < 4999) {
      fetching();
    }
  }, [id]);

  return photo
};
