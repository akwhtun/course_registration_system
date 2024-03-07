import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
const Dashboard = () => {

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [yearData, setYearData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/crsforcu/backend/routes/student_account_api.php?endpoint=group_data"
        );

        if (response.status === 200) {
          setYearData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(yearData);
  if(loading){
    <div>Loading</div>
  }
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
    <Sidenav
      routes={routes}
      brandImg={
        sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
      }
      activeNav='dashboard'
    />
    <div className="p-4 xl:ml-80">
      <DashboardNavbar />
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
  {yearData.map(({ student_year, count }) => (
    <div key={student_year} className="bg-gray-200 p-4 shadow-sm rounded-md h-44 flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold mb-2">{student_year}</h2>
      <p className="text-gray-600">{count} Students</p>
    </div>
  ))}
</div>

    </div>
    </div>
    </div>
  );
};

export default Dashboard;
