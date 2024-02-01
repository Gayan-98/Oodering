import { Link } from "react-router-dom";
import { DragHandleIcon, HamburgerIcon,ExternalLinkIcon,SettingsIcon,CalendarIcon,InfoOutlineIcon,
  RepeatClockIcon,UpDownIcon,ViewIcon} from '@chakra-ui/icons'

import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}from 'react-icons/bs'
 

const items = [
  {
    id: 1,
    name: <><BsGrid1X2Fill /> Dashboard</>,
    path: "/admin",
  },
  {
    id: 2,
    name: <><BsFillArchiveFill/> Products</>,
    path: "/admin/items",
  },
  {
    id: 3,
    name:  <><BsPeopleFill /> orders</>,
    path: "/admin/orders",
  },
  {
    id: 1,
    name: <><BsListCheck /> Inventory</>,
    path: "/",
  },
  {
    id: 2,
    name: <><BsMenuButtonWideFill/> Bill</>,
    path: "/admin/items",
  },
  {
    id: 3,
    name:  <><RepeatClockIcon /> Analytics</>,
    path: "/admin/orders",
  },
  {
    id: 1,
    name: <><UpDownIcon /> Suplayer</>,
    path: "/",
  },
  {
    id: 2,
    name: <><ViewIcon/> Report</>,
    path: "/admin/items",
  },
  {
    id: 3,
    name:  <><SettingsIcon /> Settigs</>,
    path: "/admin/orders",
  },
];

function Sidebar() {

  
  return (
    <div className="sidebar">
      {items.map((item) => (
        <Link to={item.path} key={item.id} className="sidebar-item">
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
