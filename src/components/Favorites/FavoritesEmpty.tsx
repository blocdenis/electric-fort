import FavoritesEmptyIcon from '../icons/FavoritesEmptyIcon';

function FavoritesEmpty() {
  return (
    <div className=" flex gap-24 justify-start items-center text-lg ml-4 ">
      <div>
        <FavoritesEmptyIcon />
      </div>
      <p>Ви ще не додали жодного товару в список бажань...</p>
    </div>
  );
}

export default FavoritesEmpty;
