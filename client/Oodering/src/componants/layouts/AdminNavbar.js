import {
  Avatar,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Badge,
  Text,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronRightIcon,
  BellIcon,
  StarIcon,
  InfoIcon,
  MoonIcon,
} from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../config";
// import { useGlobal } from "../../GlobalContext";
import Logo from "../Logo";

function AdminNavbar() {

//IN HERE IS GOING TO BE HANDLE AUTH PART OF THE APPLICAION

  // const { user, setUser } = useGlobal();
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await axios.post(`${api}/auth/logout`, {}, { withCredentials: true });
  //   setUser(null);
  //   navigate("/");
  // };

  return (
    <div className="admin-navbar">
      <Logo />
      <div className="admin-navbar-buttons">
        <InputGroup borderColor="blue.500">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" border-color="red" />}
          />
          <Input type="text" placeholder="Search" />
        </InputGroup>

        {/* 2. Notifications Badge */}
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          variant="ghost"
          size="lg"
          colorScheme="blue"
        />
        <Badge colorScheme="red" variant="solid" fontSize="xs">
          {/* Replace with dynamic notification count */}
        </Badge>

        {/* 3. Quick Access Links */}
        <IconButton
          aria-label="Favorite"
          icon={<StarIcon />}
          variant="ghost"
          size="md"
          colorScheme="yellow"
        />

        {/* 4. User Roles Indicator */}
        <Icon as={InfoIcon} boxSize={4} color="blue.500" />

        {/* 5. Dark Mode Toggle */}
        <IconButton
          aria-label="Toggle Dark Mode"
          icon={<MoonIcon />}
          variant="ghost"
          size="md"
          colorScheme="teal"
        />

       
      </div>
    </div>
  );
}

export default AdminNavbar;
