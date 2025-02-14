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
import { listCustomers } from "../actions/customerActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerList = useSelector((state) => state.customerList);
  const { loading, customers, error } = customerList;

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(listCustomers());
    } else if (userInfo?.token) {
      navigate(`/customer/${userInfo._id}`);
    }
  }, [userInfo]);

  return (
    <Flex w={"100%"}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : customers?.length ? (
        <Flex w="100%" alignItems="flex-start" justifyContent="center" py="5">
          <Box
            overflowX="scroll"
            bgColor="white"
            rounded="lg"
            shadow="lg"
            px="5"
            py="5"
          >
            <Table variant="striped" colorScheme="gray" size="lg">
              <Thead>
                <Tr>
                  <Th>CUSTOMER ID</Th>
                  <Th>EMAIL</Th>
                  <Th>FIRST NAME</Th>
                  <Th>LAST NAME</Th>
                  <Th>PHONE</Th>
                  <Th>KYC STATUS</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {customers.map((customers) => (
                  <Tr key={customers?._id}>
                    <Td>{customers?.user?._id}</Td>
                    <Td>{customers?.email}</Td>
                    <Td>{customers?.firstName ?? "N/A"}</Td>
                    <Td>{customers?.lastName ?? "N/A"}</Td>
                    <Td>{customers?.phone ?? "N/A"}</Td>
                    <Td>{customers?.kycStatus?.toUpperCase()}</Td>

                    <Td>
                      <Flex justifyContent="flex-end" alignItems="center">
                        <Button
                          mr="4"
                          as={RouterLink}
                          to={`/add-details/${customers?.user?._id}`}
                          colorScheme="teal"
                        >
                          <Icon as={IoPencilSharp} color="white" size="sm" />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      ) : (
        <Text>Login To complete your profile</Text>
      )}
    </Flex>
  );
}

export default HomeScreen;
