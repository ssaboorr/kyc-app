import React from "react";
import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Header from "./components/header/Header";
import HomeScreen from "./screens/HomeScreen";
import AddCustomerKycScreen from "./screens/AddCustomerKycScreen";
import CustomerDetailScreen from "./screens/CustomerDetailScreen";

function App() {
  return (
    <div>
      <Header />
      <Flex
        as="main"
        mt={{ lg: "85px", md: "85px", base: "175px" }}
        minH="xl"
        bgColor="gray.200"
        paddingTop="20"
      >
        <Routes>
          <Route path="/" element={<HomeScreen />} />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/add-details/:id" element={<AddCustomerKycScreen />} />
          <Route path="/customer/:id" element={<CustomerDetailScreen />} />
        </Routes>
      </Flex>
    </div>
  );
}

export default App;
