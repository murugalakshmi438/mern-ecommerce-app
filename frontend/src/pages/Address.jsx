import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");




  const handleAddress = () => {

    if (
      !name ||
      !phone ||
      !pincode ||
      !city ||
      !state ||
      !country ||
      !address
    ) {

      alert("Please fill all fields");

      return;
    }



    const addressData = {

      name,
      phone,
      pincode,
      city,
      state,
      country,
      address

    };



    localStorage.setItem(
      "address",
      JSON.stringify(addressData)
    );



    alert("Address Saved");

    navigate("/payment");

  };




  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Delivery Address
        </h1>



        <div className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Full Name"
            className="border p-4 rounded-lg"
            onChange={(e) => setName(e.target.value)}
          />



          <input
            type="number"
            placeholder="Phone Number"
            className="border p-4 rounded-lg"
            onChange={(e) => setPhone(e.target.value)}
          />



          <input
            type="number"
            placeholder="Pincode"
            className="border p-4 rounded-lg"
            onChange={(e) => setPincode(e.target.value)}
          />



          <input
            type="text"
            placeholder="City"
            className="border p-4 rounded-lg"
            onChange={(e) => setCity(e.target.value)}
          />



          <input
            type="text"
            placeholder="State"
            className="border p-4 rounded-lg"
            onChange={(e) => setState(e.target.value)}
          />



          <input
            type="text"
            placeholder="Country"
            className="border p-4 rounded-lg"
            onChange={(e) => setCountry(e.target.value)}
          />



          <textarea
            placeholder="Full Address"
            className="border p-4 rounded-lg h-32"
            onChange={(e) => setAddress(e.target.value)}
          />



          <button
            onClick={handleAddress}
            className="bg-black text-white p-4 rounded-lg hover:bg-gray-800"
          >
            Continue To Payment
          </button>

        </div>

      </div>

    </div>
  );
};

export default Address;