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
  Select,
} from "@chakra-ui/react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import axios from "axios";
import {
  addCustomers,
  getCustomerDetails,
  updateCustomer,
} from "../actions/customerActions";
import {
  CUSTOMER_CREATE_RESET,
  CUSTOMER_UPDATE_RESET,
} from "../constants/customerConstants";

const AddCustomerKycScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerCreate = useSelector((state) => state.customerCreate);
  const { loading, error, success, customer } = customerCreate;

  const customerUpdate = useSelector((state) => state.customerUpdate);
  const { successUpdate } = customerUpdate;

  const [uploading, setUploading] = useState(false);

  const customerDetails = useSelector((state) => state.customerDetail);
  const { customerDetail, detailLodaing, detailError } = customerDetails;

  const [firstName, setFirstName] = useState(customerDetail?.firstName ?? "");
  const [lastName, setLastName] = useState(customerDetail?.lastName ?? "");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [gender, setGender] = useState(customerDetail?.gender ?? "");
  const [address, setAddress] = useState(customerDetail?.address ?? "");
  const [phone, setPhone] = useState(customerDetail?.phone ?? "");
  const [kycStatus, setKycStatus] = useState(customerDetail?.kycStatus);
  const [email, setEmail] = useState(customerDetail?.email);
  const [showUserFoem, setShowUserForm] = useState(true);

  useEffect(() => {
    if (success || successUpdate) {
      dispatch({ type: CUSTOMER_CREATE_RESET });
      dispatch({ type: CUSTOMER_UPDATE_RESET });
      navigate("/");
    } else {
      dispatch(getCustomerDetails(id));
    }
  }, [dispatch, navigate, success, successUpdate]);

  useEffect(() => {
    if (customerDetail) {
      setFirstName(customerDetail.firstName || "");
      setLastName(customerDetail.lastName || "");
      setImage1(customerDetail.image1 || "");
      setImage2(customerDetail.image2 || "");
      setImage3(customerDetail.image3 || "");
      setImage4(customerDetail.image4 || "");
      setGender(customerDetail.gender || "");
      setAddress(customerDetail.address || "");
      setPhone(customerDetail.phone || "");
      setKycStatus(customerDetail.kycStatus || "Pending");
      setEmail(
        id === userInfo?._id
          ? userInfo.email
          : customerDetail.email
          ? customerDetail.email
          : ""
      );
      setShowUserForm(userInfo?.role === "admin" ? false : true);
    }
  }, [customerDetail, id, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("On submittin ==>", customerDetail?._id);

    if (userInfo.role === "admin") {
      dispatch(
        updateCustomer(customerDetail?._id, {
          kycStatus,
        })
      );
    } else {
      dispatch(
        addCustomers({
          firstName,
          lastName,
          email: userInfo.email,
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
    }
  };

  const uploadFileHandler = async (e, value) => {
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
      console.log("Image respose after uploading ==>", data);
      switch (value) {
        case "image1":
          setImage1(data);
          break;
        case "image2":
          setImage2(data);
          break;
        case "image3":
          setImage3(data);
          break;
        case "image4":
          setImage4(data);
          break;

        default:
          break;
      }
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
            {userInfo?.role === "admin" ? "Update Details" : "Add your Detials"}
          </Heading>

          {loading && <Loader />}
          {error && <Message type="error">{error}</Message>}

          <form onSubmit={submitHandler}>
            {userInfo?.role === "admin" && (
              <>
                <FormControl id="brand" isRequired>
                  <FormLabel>Update Kyc Status</FormLabel>
                  <Select
                    color="gray.800"
                    value={kycStatus}
                    width="30"
                    onChange={(e) => {
                      setKycStatus(e.target.value);
                    }}
                  >
                    {["Approve", "Reject", "Pending"].map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Spacer h="3" />
              </>
            )}

            {showUserFoem && (
              <>
                <Spacer h="3" />
                <FormControl id="name" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    readOnly={userInfo?.role === "admin"}
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
                    readOnly={userInfo?.role === "admin"}
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
                    readOnly={userInfo?.role === "admin"}
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Spacer h="3" />

                {/* IMAGE */}
                <FormControl id="image">
                  <FormLabel>Document 1</FormLabel>
                  <Input
                    readOnly={userInfo?.role === "admin"}
                    type="text"
                    placeholder="Enter image url"
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                  />
                  <Input
                    type="file"
                    onChange={(e) => uploadFileHandler(e, "image1")}
                  />
                </FormControl>
                <Spacer h="3" />

                <FormControl id="image">
                  <FormLabel>Document 2</FormLabel>
                  <Input
                    readOnly={userInfo?.role === "admin"}
                    type="text"
                    placeholder="Enter image url"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                  />
                  <Input
                    type="file"
                    onChange={(e) => uploadFileHandler(e, "image2")}
                  />
                </FormControl>
                <Spacer h="3" />
                <FormControl id="image">
                  <FormLabel>Document 3</FormLabel>
                  <Input
                    readOnly={userInfo?.role === "admin"}
                    type="text"
                    placeholder="Enter image url"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                  />
                  <Input
                    type="file"
                    onChange={(e) => uploadFileHandler(e, "image3")}
                  />
                </FormControl>
                <Spacer h="3" />
                <FormControl id="image">
                  <FormLabel>Document 4</FormLabel>
                  <Input
                    readOnly={userInfo?.role === "admin"}
                    type="text"
                    placeholder="Enter image url"
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                  />
                  <Input
                    type="file"
                    onChange={(e) => uploadFileHandler(e, "image4")}
                  />
                </FormControl>
                <Spacer h="3" />

                {/* Address */}
                <FormControl id="address" isRequired>
                  <FormLabel>Address</FormLabel>
                  <Input
                    readOnly={userInfo?.role === "admin"}
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
                    readOnly={userInfo?.role === "admin"}
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
                  <Select
                    color="gray.800"
                    value={gender}
                    width="30"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    {["Male", "Female"].map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Spacer h="3" />
              </>
            )}
            <Flex>
              {userInfo?.role === "admin" && (
                <>
                  <Button
                    mt="4"
                    mr="4"
                    colorScheme="teal"
                    onClick={() => setShowUserForm(!showUserFoem)}
                  >
                    {showUserFoem ? "Hide" : "Show"} User Form
                  </Button>
                </>
              )}
              <Button type="submit" isLoading={false} colorScheme="teal" mt="4">
                Update
              </Button>
            </Flex>
          </form>
        </FormContainer>
      </Flex>
    </>
  );
};

export default AddCustomerKycScreen;
