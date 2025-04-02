import React, { useEffect, useState } from "react";

const Home = () => {
  const [allEmp, setAllEmp] = useState(() => {
    let employees = localStorage.getItem("emp");
    return employees ? JSON.parse(employees) : [];
  });

  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    hoby: [],
    city: "",
    image: ""
  });

  const [hobby, setHobby] = useState([]);
  const [city] = useState(["Surat", "Vapi", "Tapi", "Ghandhinagar","Ahemdabad","Kheda","Ananad","Rajkot","Junagadh","Vadodra","Veraval","Vadnagar","Valsad","Bharuch"]);

  useEffect(() => {
    localStorage.setItem("emp", JSON.stringify(allEmp));
  }, [allEmp]);

  const onInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name === "hoby") {
      let updatedHobby = [...hobby];
      if (checked) {
        updatedHobby.push(value);
      } else {
        updatedHobby = updatedHobby.filter((h) => h !== value);
      }
      setHobby(updatedHobby);
      setNewEmp({ ...newEmp, hoby: updatedHobby });
    } else {
      setNewEmp({ ...newEmp, [name]: value });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email) {
      alert("Fill all fields");
      return;
    }

    let newId =
      allEmp.length > 0 ? Math.max(...allEmp.map((emp) => emp.id)) + 1 : 1;

    setAllEmp([...allEmp, { ...newEmp, id: newId }]);
    setNewEmp({
      name: "",
      email: "",
      password: "",
      gender: "",
      hoby: [],
      city: "",
      image: "",
    });
    setHobby([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h2 className="text-3xl font-bold text-center text-white">
            Enter Your Details
          </h2>
        </div>

        <form onSubmit={onFormSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Name:</label>
            <input
              name="name"
              type="text"
              value={newEmp.name}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Email:</label>
            <input
              name="email"
              type="email"
              value={newEmp.email}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Password:</label>
            <input
              name="password"
              type="password"
              value={newEmp.password}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Gender:</label>
            <div className="flex gap-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={newEmp.gender === "male"}
                  onChange={onInputChange}
                  className="form-radio h-5 w-5 text-blue-500 border-gray-600 focus:ring-blue-500 bg-gray-700"
                />
                <span className="ml-2 text-gray-300">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={newEmp.gender === "female"}
                  onChange={onInputChange}
                  className="form-radio h-5 w-5 text-blue-500 border-gray-600 focus:ring-blue-500 bg-gray-700"
                />
                <span className="ml-2 text-gray-300">Female</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Hobby:</label>
            <div className="grid grid-cols-2 gap-3">
              {["Cricket", "Swiming", "Dancing", "Coding"].map((h) => (
                <label key={h} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="hoby"
                    value={h}
                    checked={hobby.includes(h)}
                    onChange={onInputChange}
                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-600 rounded focus:ring-blue-500 bg-gray-700"
                  />
                  <span className="ml-2 text-gray-300">{h}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">City:</label>
            <select
              name="city"
              value={newEmp.city}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="" disabled className="bg-gray-800 text-gray-300">
                --- Select City ---
              </option>
              {city.map((c) => (
                <option key={c} value={c} className="bg-gray-800">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Online Image:</label>
            {newEmp.image && (
              <div className="flex justify-center mb-4">
                <img
                  src={newEmp.image}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-lg object-cover border-2 border-gray-600 shadow-md"
                />
              </div>
            )}
            <input
              name="image"
              type="text"
              value={newEmp.image}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;