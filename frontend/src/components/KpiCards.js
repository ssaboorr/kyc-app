import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

function KpiCards({ data }) {
  const kpiTitles = [
    "Total Users",
    "Approved Kyc",
    "Rejected Kyc",
    "Pending Kyc",
  ];
  return (
    <>
      {data?.map((children, index) => (
        <Flex
          p="5"
          flexDirection="row"
          boxShadow="lg"
          rounded="md"
          bgColor="white"
          width={"30"}
          gap={20}
          justifyContent={"space-between"}
        >
          <Heading size="md">{kpiTitles[index]}</Heading>
          <Text fontWeight={"bold"}>{children}</Text>
        </Flex>
      ))}
    </>
  );
}

export default KpiCards;
