import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const StatsCard = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Completed Services",
        data: [5, 10, 7, 15, 20, 25],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Service Stats</Typography>
        <Box style={{ height: "300px" }}>
          <Line data={data} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
