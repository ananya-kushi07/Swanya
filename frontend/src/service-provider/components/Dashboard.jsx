import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import ServiceRequestCard from "./ServiceRequestCard";
import StatsCard from "./StatsCard";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ServiceRequestCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
