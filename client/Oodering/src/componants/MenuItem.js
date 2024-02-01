import { api } from "../config";



function ManuItem({item,ONclick}) {
  return (
    <div className="menu-item-container" onClick={ONclick}>     
     

      <img
        src={`data:image/${item.imageType};base64,${item.dat}`}
        alt="image"
      />
      <h3 className="menu-item-name">{item.name}</h3>
      <h5 className="menu-item--price">{item.pric}</h5>
      <h5 className="menu-item--price">{item.id}</h5>
      
     

      
      
    </div>
  );
}
export default ManuItem;
