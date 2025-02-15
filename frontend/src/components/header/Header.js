import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Flex,
  Heading,
  Link,
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { IoChevronDown } from "react-icons/io5";

import { HiLogin } from "react-icons/hi";

import { GoSignIn } from "react-icons/go";

import MenuItems from "./MenuItems";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions.js";

const Header = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
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
        display={{ base: "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
      >
        {userInfo?.token ? (
          <Flex justifyContent="center" alignItems="center">
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<IoChevronDown />}
                _hover={{ textDecoration: "none", opacity: "0.7" }}
              >
                {userInfo.email}
              </MenuButton>
              <MenuList url="/login">
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
            {userInfo.role === "admin" && (
              <Heading
                as="h1"
                color="red"
                fontWeight="bold"
                size="md"
                letterSpacing="md"
                px="4"
              >
                Admin
              </Heading>
            )}
          </Flex>
        ) : (
          <Flex>
            <MenuItems url="/login">
              <Flex alignItems="center" justifyContent="center" m="2">
                <Icon w="4" h="4" mr="1" as={HiLogin} />
                Login
              </Flex>
            </MenuItems>
          </Flex>
        )}

        {/* Admin Menu */}
      </Box>
    </Flex>
  );
};

export default Header;
