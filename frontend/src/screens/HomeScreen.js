import React from "react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { IoPencilSharp, IoTrashBinSharp, IoAdd } from "react-icons/io5";
import { getCustomerDetails, listCustomers } from "../actions/customerActions";
import CustomerTable from "../components/CustomerTable";
import KpiCards from "../components/KpiCards";

function HomeScreen() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const customerDetails = useSelector((state) => state.customerDetail);
  const { customerDetail } = customerDetails;

  const customerListCount = useSelector((state) => state.customerListCount);
  const { counts } = customerListCount;

  console.log("Customer details in home", counts);

  const customerList = useSelector((state) => state.customerList);
  const { loading, customers, error } = customerList;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.role === "admin") {
      dispatch(listCustomers());
    } else if (userInfo?.token) {
      dispatch(getCustomerDetails(userInfo?._id));
    }
  }, [userInfo]);

  return (
    <Flex w={"100%"}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : customers?.length ? (
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="flex-start"
          py="5"
          flexDirection={"column"}
          gap={10}
        >
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            py="5"
            flexDirection={"row"}
            gap={10}
          >
            <KpiCards data={counts} />
          </Flex>
          <CustomerTable data={customers} isList={true} />
        </Flex>
      ) : customerDetail?._id ? (
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="flex-start"
          py="5"
          flexDirection={"column"}
          gap={10}
        >
          <Heading>Your Details</Heading>
          <CustomerTable data={customerDetail} isList={false} />
        </Flex>
      ) : userInfo?.token ? (
        <Flex w="100%" alignItems="flex-start" justifyContent="center" py="5">
          <RouterLink
            as={RouterLink}
            to={`/add-details/${userInfo._id}`}
            color="blue"
          >
            Click here to Add your Details
          </RouterLink>
        </Flex>
      ) : (
        <Flex w="100%" alignItems="flex-start" justifyContent="center" py="5">
          <Text>Login To complete your profile</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default HomeScreen;
