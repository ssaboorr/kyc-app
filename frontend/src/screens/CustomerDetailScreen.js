import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { getCustomerDetails } from "../actions/customerActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import { IoPencilSharp, IoTrashBinSharp, IoAdd } from "react-icons/io5";

function CustomerDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const customerDetails = useSelector((state) => state.customerDetail);
  const { loading, error, customerDetail } = customerDetails;

  console.log("customer detail ==>", customerDetail);

  useEffect(() => {
    dispatch(getCustomerDetails(id));
  }, []);

  return (
    <Flex w={"100%"}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Flex display={"flex"} flexDirection={"row"} gap={"20"}>
          <Message type="error">{error}</Message>
          <RouterLink to={"/add-details"}>Add Details</RouterLink>
        </Flex>
      ) : (
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="flex-start"
          py="5"
          flexDirection={"column"}
          gap={20}
        >
          <Text>Your Details</Text>

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
                  <Th>Edit</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr key={customerDetail?._id}>
                  <Td>{customerDetail?.user}</Td>
                  <Td>{customerDetail?.email}</Td>
                  <Td>{customerDetail?.firstName ?? "N/A"}</Td>
                  <Td>{customerDetail?.lastName ?? "N/A"}</Td>
                  <Td>{customerDetail?.phone ?? "N/A"}</Td>
                  <Td>{customerDetail?.kycStatus?.toUpperCase()}</Td>

                  <Td>
                    <Flex justifyContent="flex-end" alignItems="center">
                      <Button
                        mr="4"
                        as={RouterLink}
                        to={`/add-details/${customerDetail?.user}`}
                        colorScheme="teal"
                      >
                        <Icon as={IoPencilSharp} color="white" size="sm" />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

export default CustomerDetailScreen;
