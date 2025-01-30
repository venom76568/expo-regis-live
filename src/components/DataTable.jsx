import React, { useEffect, useState } from "react";

const DynamicTable = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    // Fetch the data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://expo-backend-public.onrender.com/all" // Replace with your Expo backend API endpoint
        );
        const data = await response.json();
        setTeamData(data.data); // Assuming data is an array directly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to convert data to CSV format
  const convertToCSV = (data) => {
    const header = [
      "Startup Name",
      "Email",
      "Sector",
      "Headquarters",
      "LinkedIn/Website",
      "Description",
      "Challan Number",
    ];
    const rows = data.map((startup) => [
      startup.name,
      startup.email,
      startup.startUpSector,
      startup.headquarter,
      startup.linkedin,
      startup.discription,
      startup.challan,
    ]);

    // Combine the header and rows into a single string
    const csvContent = [
      header.join(","), // Header row
      ...rows.map((row) => row.join(",")), // Data rows
    ].join("\n");

    return csvContent;
  };

  // Function to trigger the CSV download
  const downloadCSV = () => {
    const csvData = convertToCSV(teamData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // Feature detection for browsers
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "startup_data.csv"); // Filename for the download
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Startup Data
      </h2>
      <button
        onClick={downloadCSV}
        style={{
          marginBottom: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Download CSV
      </button>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Startup Name
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Sector
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Headquarters
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              LinkedIn/Website
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Description
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Challan Number
            </th>
          </tr>
        </thead>
        <tbody>
          {teamData.length > 0 ? (
            teamData.map((startup, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {startup.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {startup.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {startup.startUpSector}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {startup.headquarter}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {startup.linkedin}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {startup.description}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {startup.challan}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                No startup data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
