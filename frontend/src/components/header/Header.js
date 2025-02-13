import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Flex,
  Heading,
  Link,
  Box,
  Icon,
  Text,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { IoChevronDown } from "react-icons/io5";

import { HiOutlineUser, HiShoppingCart, HiLogin } from "react-icons/hi";

import { GoSignIn } from "react-icons/go";

import MenuItems from "./MenuItems";

const Header = () => {
  //   const dispatch = useDispatch();
  //   let navigate = useNavigate();

  const [show, setShow] = useState(false);

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  //   const userDetails = useSelector((state) => state.userDetails);

  //   const { user } = userDetails;

  //   if (user.name) {
  //     userInfo.name = user.name;
  //   }

  const logoutHandler = () => {
    // dispatch(logout());
    // dispatch({ type: USER_DETAILS_RESET });
    // dispatch({ type: USER_REGISTER_RESET });
    // dispatch({ type: PRODUCT_DETAILS_RESET });
    // navigate("/login");
  };

  const handleClick = () => {
    // dispatch({ type: PRODUCT_DETAILS_RESET });
    // console.log("working");
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      py="6"
      px="6"
      bgColor="white"
      w="100%"
      top="0"
      zIndex="2"
      pos="fixed"
    >
      <Flex align="center" mr="5">
        <Heading
          as="h1"
          color="gray.800"
          fontWeight="bold"
          size="md"
          letterSpacing="md"
        >
          <Link
            as={RouterLink}
            to="/"
            color="gray.800"
            _hover={{ color: "gray.500", textDecor: "none" }}
          >
            Kyc App
          </Link>
        </Heading>
      </Flex>

      <Box
        display={{ base: show ? "none" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
      >
        {false ? (
          <Flex justifyContent="center" alignItems="center">
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<IoChevronDown />}
                _hover={{ textDecoration: "none", opacity: "0.7" }}
              >
                {/* {userInfo.name} */}
              </MenuButton>
              <MenuList url="/login">
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>

            <MenuItems url="/cart">
              <Flex alignItems="center" justifyContent="center" m="2">
                <Icon w="4" h="4" mr="1" as={HiShoppingCart} />
                Cart
              </Flex>
            </MenuItems>
          </Flex>
        ) : (
          <Flex>
            <MenuItems url="/register">
              <Flex alignItems="center" justifyContent="center" m="2">
                <Icon w="4" h="4" mr="1" as={GoSignIn} />
                SignIn
              </Flex>
            </MenuItems>
            <MenuItems url="/login">
              <Flex alignItems="center" justifyContent="center" m="2">
                <Icon w="4" h="4" mr="1" as={HiLogin} />
                Login
              </Flex>
            </MenuItems>
          </Flex>
        )}

        {/* Admin Menu */}

        {
          // userInfo && userInfo.isAdmin &&
          false && (
            <Menu>
              <MenuButton
                ml="5"
                color="gray.800"
                fontWeight="semibold"
                as={Button}
                textTransform="uppercase"
                _hover={{ textDecor: "none", opacity: "0.7" }}
              >
                Manage <Icon as={IoChevronDown} />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/admin/userlist">
                  All Users
                </MenuItem>
                <MenuItem as={RouterLink} to="/admin/productlist">
                  All Products
                </MenuItem>
                <MenuItem as={RouterLink} to="/admin/orderlist">
                  All Orders
                </MenuItem>
              </MenuList>
            </Menu>
          )
        }
      </Box>
    </Flex>
  );
};

export default Header;
