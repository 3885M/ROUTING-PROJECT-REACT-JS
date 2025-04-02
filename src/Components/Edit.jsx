import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  let { index } = useParams();
  let navigate = useNavigate();

  const [allEmp, setAllEmp] = useState(() => {
    let employees = localStorage.getItem("emp");
    return employees ? JSON.parse(employees) : [];
  });

  const [emp, setEmp] = useState(() => {
    let indexData = allEmp.findIndex((v) => v.id === parseInt(index));
    return allEmp[indexData] || {};
  });

  const [hobby, setHobby] = useState(emp.hoby || []);
  const [city] = useState(["Surat", "Vapi", "Tapi", "Ghandhinagar","Ahemdabad","Kheda","Ananad","Rajkot","Junagadh","Vadodra","Veraval","Vadnagar","Valsad","Bharuch"]);

  useEffect(() => {
    localStorage.setItem("emp", JSON.stringify(allEmp));
  }, [allEmp]);

  const onInputChange = (e) => {
    if (e.target.name === "hoby") {
      let hoby = [...hobby];
      if (e.target.checked) {
        hoby.push(e.target.value);
      } else {
        hoby = hoby.filter((h) => h !== e.target.value);
      }
      setHobby(hoby);
      setEmp({ ...emp, [e.target.name]: hoby });
      return;
    }
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    let employees = [...allEmp];
    let indexData = employees.findIndex((v) => v.id === parseInt(index));
    employees[indexData] = emp;
    setAllEmp([...employees]);
    navigate("/view");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h2 className="text-2xl font-bold text-center">Edit Employee Details</h2>
        </div>
        
        <form onSubmit={onFormSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Name:</label>
            <input
              type="text"
              name="name"
              value={emp.name || ""}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Email:</label>
            <input
              type="email"
              name="email"
              value={emp.email || ""}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Password:</label>
            <input
              type="text"
              name="password"
              value={emp.password || ""}
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
                  checked={emp.gender === "male"}
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
                  checked={emp.gender === "female"}
                  onChange={onInputChange}
                  className="form-radio h-5 w-5 text-blue-500 border-gray-600 focus:ring-blue-500 bg-gray-700"
                />
                <span className="ml-2 text-gray-300">Female</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Hobbies:</label>
            <div className="grid grid-cols-2 gap-3">
              {["Cricket", "Swimming", "Dancing", "Coding"].map((h) => (
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
              value={emp.city || ""}
              onChange={onInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              <option value="">--- Select City ---</option>
              {city.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Online Image:</label>
            {emp.image && (
              <div className="flex justify-center mb-4">
                <img
                  src={emp.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-lg object-cover border-2 border-gray-600 shadow-md"
                />
              </div>
            )}
            <input
              type="text"
              name="image"
              value={emp.image || ""}
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
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;