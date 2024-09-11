import FavoriteButton from "../../assets/favorite_button";
import { useRef, useEffect } from "react";

function Favorites({ setIsFavOn, isFavOn }) {

  const refFav = useRef(null);

  useEffect(() => {
    if (isFavOn) {
      refFav.current.classList.add('fav-active');
      return;
    }
    refFav.current.classList.remove('fav-active');
  }, [isFavOn])

  return (
    <div
      ref={refFav}
      onClick={(e) => setIsFavOn((prev) => !prev)}
      className='fav-button'
    ><FavoriteButton /></div>
  )
}

export default Favorites