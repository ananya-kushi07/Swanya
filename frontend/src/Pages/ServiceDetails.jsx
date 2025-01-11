// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import api from '../utils/api';

// const useStyles = makeStyles((theme) => ({
//   cardContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '20px',
//     margin: '20px',
//   },
//   card: {
//     width: '100%',
//     maxWidth: '500px',
//     borderRadius: '15px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     '&:hover': {
//       transform: 'translateY(-10px)',
//       boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
//     },
//     backgroundColor: '#fff', // White background color from Services component
//   },
//   cardContent: {
//     textAlign: 'center',
//     padding: '20px',
//   },
//   title: {
//     fontSize: '1.8rem',
//     fontWeight: '600',
//     color: '#34495e',
//     marginBottom: '10px',
//   },
//   description: {
//     fontSize: '1rem',
//     color: '#7f8c8d',
//     marginBottom: '15px',
//   },
//   price: {
//     fontWeight: 'bold',
//     fontSize: '1.2rem',
//     color: '#2ecc71', // Green color for price as in Services component
//     marginBottom: '15px',
//   },
//   button: {
//     backgroundColor: '#27ae60', // Green color for button (from Services component)
//     color: '#fff',
//     borderRadius: '5px',
//     fontSize: '0.9rem',
//     '&:hover': {
//       backgroundColor: '#2ecc71', // Darker shade for hover effect (from Services component)
//     },
//     // position: 'absolute',
//     bottom: 10,
//     right: 10,
//   },
//   availability: {
//     fontSize: '1rem',
//     color: '#e74c3c', // Red color for availability
//     fontWeight: 'bold',
//   },
// }));

// const ServiceDetails = () => {
//   const { id } = useParams();
//   const [service, setService] = useState(null);
//   const [serviceProvider, setServiceProvider] = useState(null);
//   const navigate = useNavigate();
//   const classes = useStyles();

//   useEffect(() => {
//     fetchServiceDetails();
//   }, [id]);

//   const fetchServiceDetails = async () => {
//     try {
//       const serviceResponse = await api.get(`/services/service/${id}`);
//       setService(serviceResponse.data);

//       // Fetch service provider details using provider_id from service
//       const providerResponse = await api.get(`/services/provider/${serviceResponse.data.provider_id}`);
//       setServiceProvider(providerResponse.data);
//     } catch (err) {
//       console.error('Error fetching service or provider details:', err);
//     }
//   };

//   const handleBookNow = () => {
//     navigate(`/book/${id}`, {
//       state: {
//         serviceId: id,
//         serviceProviderId: service?.provider_id,
//       },
//     });
//   };

//   if (!service || !serviceProvider) return <p>Loading...</p>;

//   return (
//     <div className={classes.cardContainer}>
//       <Card className={classes.card}>
//         <CardContent className={classes.cardContent}>
//           <Typography variant="h5" className={classes.title}>
//             {service.name}
//           </Typography>
//           <Typography className={classes.description}>{service.category}</Typography>
//           <Typography className={classes.description}>{service.description}</Typography>
//           <Typography className={classes.price}>Price: ₹{service.price}</Typography>
//           <Typography className={classes.availability}>
//             Availability: {service.availability ? 'Available' : 'Not Available'}
//           </Typography>
//         </CardContent>
//         <CardActions>
//           {/* Add any actions here if needed */}
//         </CardActions>
//       </Card>

//       <Card className={classes.card}>
//         <CardContent className={classes.cardContent}>
//           <Typography variant="h6">Service Provider Details</Typography>
//           <Typography className={classes.description}>
//             Name: {serviceProvider.full_name}
//           </Typography>
//           <Typography className={classes.description}>
//             Email: {serviceProvider.email}
//           </Typography>
//           <Typography className={classes.description}>
//             Location: {serviceProvider.location}
//           </Typography>
//         </CardContent>
//       </Card>
//         <Button
//                     variant="contained"
//                     color="success"
//                     sx={{
//                       position: 'center',
//                       bottom: 10,
//                       right: 10,
//                       borderRadius: 5,
//                       fontSize: '0.9rem',
//                       '&:hover': { backgroundColor: '#27ae60' },
//                     }}
//                     onClick={() => navigate(`/book/${service._id}`)}
//                   >
//                     Book Now
//                   </Button>
//     </div>
//   );
// };

// export default ServiceDetails;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import api from '../utils/api';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    margin: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
    },
    backgroundColor: '#fff', // White background color from Services component
  },
  cardContent: {
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#34495e',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1rem',
    color: '#7f8c8d',
    marginBottom: '15px',
  },
  price: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#2ecc71', // Green color for price as in Services component
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#27ae60', // Green color for button (from Services component)
    color: '#fff',
    borderRadius: '5px',
    fontSize: '0.9rem',
    '&:hover': {
      backgroundColor: '#2ecc71', // Darker shade for hover effect (from Services component)
    },
    // position: 'absolute',
    bottom: 10,
    right: 10,
  },
  availability: {
    fontSize: '1rem',
    color: '#e74c3c', // Red color for availability
    fontWeight: 'bold',
  },
}));

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [serviceProvider, setServiceProvider] = useState(null);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const serviceResponse = await api.get(`/services/service/${id}`);
      setService(serviceResponse.data);

      // Fetch service provider details using provider_id from service
      const providerResponse = await api.get(`/services/provider/${serviceResponse.data.provider_id}`);
      setServiceProvider(providerResponse.data);
    } catch (err) {
      console.error('Error fetching service or provider details:', err);
    }
  };

  const handleBookNow = () => {
    navigate(`/book/${id}`, {
      state: {
        serviceId: id,
        serviceProviderId: service?.provider_id,
      },
    });
  };

  if (!service || !serviceProvider) return <p>Loading...</p>;

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" className={classes.title}>
            {service.name}
          </Typography>
          <Typography className={classes.description}>{service.category}</Typography>
          <Typography className={classes.description}>{service.description}</Typography>
          <Typography className={classes.price}>Price: ₹{service.price}</Typography>
          <Typography className={classes.availability}>
            Availability: {service.availability ? 'Available' : 'Not Available'}
          </Typography>
        </CardContent>
        <CardActions>
          {/* Add any actions here if needed */}
        </CardActions>
      </Card>
  
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">Service Provider Details</Typography>
          <Typography className={classes.description}>
            Name: {serviceProvider.full_name}
          </Typography>
          <Typography className={classes.description}>
            Email: {serviceProvider.email}
          </Typography>
          <Typography className={classes.description}>
            Location: {serviceProvider.location}
          </Typography>
        </CardContent>
      </Card>
  
      {/* Chat with Provider Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: 'center',
          bottom: 10,
          right: 10,
          borderRadius: 5,
          fontSize: '0.9rem',
          marginBottom: '10px',
          '&:hover': { backgroundColor: '#2980b9' },
        }}
        onClick={() => navigate('/chatting', { state: { providerId: serviceProvider._id, providerName: serviceProvider.full_name } })}
      >
        Chat with Provider
      </Button>
  
      {/* Book Now Button */}
      <Button
        variant="contained"
        color="success"
        sx={{
          position: 'center',
          bottom: 10,
          right: 10,
          borderRadius: 5,
          fontSize: '0.9rem',
          '&:hover': { backgroundColor: '#27ae60' },
        }}
        onClick={handleBookNow}
      >
        Book Now
      </Button>
    </div>
  );
  
};

export default ServiceDetails;