import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";

const ServiceRequestCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Service Request from John Doe</Typography>
        <Typography variant="body1" color="textSecondary">Location: New York, NY</Typography>
        <Typography variant="body1" color="textSecondary">
          Service Needed: Plumbing Repair
        </Typography>
        <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
          Accept Request
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestCard;
