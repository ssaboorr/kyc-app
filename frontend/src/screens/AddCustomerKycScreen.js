import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Link,
} from "@chakra-ui/react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import axios from "axios";
import { addCustomers, getCustomerDetails } from "../actions/customerActions";

const AddCustomerKycScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerCreate = useSelector((state) => state.customerCreate);
  const { loading, error, success, customer } = customerCreate;

  const [uploading, setUploading] = useState(false);

  const customerDetails = useSelector((state) => state.customerDetail);
  const { customerDetail, detailLodaing, detailError } = customerDetails;

  const [firstName, setFirstName] = useState(customerDetail.firstName ?? "");
  const [lastName, setLastName] = useState(customerDetail.lastName ?? "");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [gender, setGender] = useState(customerDetail.gender ?? "");
  const [address, setAddress] = useState(customerDetail.address ?? "");
  const [phone, setPhone] = useState(customerDetail.phone ?? "");
  const [kycStatus, setKycStatus] = useState(customerDetail.kycStatus);
  const [email, setEmail] = useState(
    id === userInfo?._id
      ? userInfo.email
      : customerDetail.email
      ? customerDetail.email
      : ""
  );

  useEffect(() => {
    if (success) {
      dispatch({ type: "CUSTOMER_CREATE_RESET" });
      navigate("/");
    } else {
      dispatch(getCustomerDetails(id));
    }
  }, [dispatch, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addCustomers({
        firstName,
        lastName,
        email,
        image1,
        image2,
        image3,
        image4,
        gender,
        phone,
        user: userInfo._id,
        address,
        kycStatus,
      })
    );
  };

  const uploadFileHandler1 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);
      setImage1(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const uploadFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);
      setImage2(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const uploadFileHandler3 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);
      setImage3(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const uploadFileHandler4 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);
      setImage4(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link mx="5" mt="7" as={RouterLink} to="/">
        Go Back
      </Link>

      <Flex mt="30" w="full" alignItems="center" justifyContent="center" py="5">
        <FormContainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            Add your details
          </Heading>

          {loading && <Loader />}
          {error && <Message type="error">{error}</Message>}

          <form onSubmit={submitHandler}>
            {/* NAME */}
            <FormControl id="name" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="text"
                placeholder="Enter First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            {/* NAME */}
            <FormControl id="name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="text"
                placeholder="Enter Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />
            {/* Email */}
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            {/* IMAGE */}
            <FormControl id="image">
              <FormLabel>Image</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="text"
                placeholder="Enter image url"
                value={image1}
                onChange={(e) => setImage1(e.target.value)}
              />
              <Input type="file" onChange={uploadFileHandler1} />
            </FormControl>
            <Spacer h="3" />

            <FormControl id="image">
              <FormLabel>Image</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="text"
                placeholder="Enter image url"
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
              />
              <Input type="file" onChange={uploadFileHandler2} />
            </FormControl>
            <Spacer h="3" />
            <FormControl id="image">
              <FormLabel>Image</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="text"
                placeholder="Enter image url"
                value={image3}
                onChange={(e) => setImage3(e.target.value)}
              />
              <Input type="file" onChange={uploadFileHandler3} />
            </FormControl>
            <Spacer h="3" />
            <FormControl id="image">
              <FormLabel>Image</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="text"
                placeholder="Enter image url"
                value={image4}
                onChange={(e) => setImage4(e.target.value)}
              />
              <Input type="file" onChange={uploadFileHandler4} />
            </FormControl>
            <Spacer h="3" />

            {/* Address */}
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            {/* phone */}
            <FormControl id="phone" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="text"
                placeholder="Enter phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            {/* Gender */}

            <FormControl id="brand" isRequired>
              <FormLabel>Gender</FormLabel>
              <Input
                readOnly={userInfo?.isAdmin}
                type="text"
                placeholder="Enter Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            {userInfo?.isAdmin && (
              <>
                <FormControl id="brand" isRequired>
                  <FormLabel>Update Kyc Status</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Gender"
                    value={kycStatus}
                    onChange={(e) => setKycStatus(e.target.value)}
                  />
                </FormControl>
              </>
            )}

            <Button type="submit" isLoading={false} colorScheme="teal" mt="4">
              Update
            </Button>
          </form>
        </FormContainer>
      </Flex>
    </>
  );
};

export default AddCustomerKycScreen;
