import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { IoPencilSharp } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

function CustomerTable({ data, isList }) {
  if (isList) {
    return (
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
            {data.map((customers) => (
              <Tr key={customers?._id}>
                <Td>{customers?.user}</Td>
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
                      to={`/add-details/${customers?.user}`}
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
    );
  } else {
    return (
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
            <Tr key={data?._id}>
              <Td>{data?.user}</Td>
              <Td>{data?.email}</Td>
              <Td>{data?.firstName ?? "N/A"}</Td>
              <Td>{data?.lastName ?? "N/A"}</Td>
              <Td>{data?.phone ?? "N/A"}</Td>
              <Td>{data?.kycStatus?.toUpperCase()}</Td>

              <Td>
                <Flex justifyContent="flex-end" alignItems="center">
                  <Button
                    mr="4"
                    as={RouterLink}
                    to={`/add-details/${data?.user}`}
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
    );
  }
}

export default CustomerTable;
