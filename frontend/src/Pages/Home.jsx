// import React, { useEffect, useState } from "react";
// import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
// import { keyframes } from "@mui/system";

// // Animation for sliding the service provider image from left to right
// const slideIn = keyframes`
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(0); }
// `;

// const HeroAnimation = keyframes`
//   0% { transform: translateY(0); opacity: 1; }
//   50% { transform: translateY(10px); opacity: 0.7; }
//   100% { transform: translateY(0); opacity: 1; }
// `;

// function Home() {
//   const [scrolling, setScrolling] = useState(false);

//   const handleScroll = () => {
//     if (window.scrollY > 200) {
//       setScrolling(true);
//     } else {
//       setScrolling(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <Box sx={{ padding: "0px", backgroundColor: "#f4f4f4" }}>
//       {/* Hero Section with Image and Text */}
//       <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
//         <Box sx={{ position: "relative", minHeight: "40vh" }}>
//           <img
//             src="https://ecrossings.in/wp-content/uploads/2018/01/services.jpg" // Use the correct path for your image
//             alt="Hero Image"
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: "10px",
//             }}
//           />
//           <Typography
//             variant="h3"
//             component="h1"
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               color: "orange",
//               fontWeight: "bold",
//               textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
//             }}
//           >
//             One-Stop Solution
//           </Typography>
//         </Box>
//         <Typography
//           variant="body1"
//           sx={{
//             marginTop: "20px",
//             fontSize: "18px",
//             textAlign: "center",
//             maxWidth: "800px",
//             margin: "0 auto",
//           }}
//         >
//           Your All-in-One Service Platform Finding trusted professionals for maintenance and repair services is now effortless with our unified platform. Whether it's AC repair, electrical fixes, plumbing, carpentry, home cleaning, or pest control, our app bridges the gap between you and verified service providers. With intuitive features like GPS tracking, instant booking, secure payments, and real-time chat, we make life hassle-free by bringing services to your doorstep. Tailored for both customers and professionals, our solution is efficient, reliable, and accessible. Experience seamless convenience for all your home and business service needs - anytime, anywhere!
//         </Typography>
//       </Box>

//       {/* Horizontal Divider */}
//       <Box sx={{ borderTop: "2px solid #ccc", margin: "40px 0" }} />

//       {/* Cards Design Section */}
//       <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
//         <Typography variant="h4" component="h2" sx={{ marginBottom: "20px", my: 10 }}>
//           Our Services
//         </Typography>
//         <Grid container spacing={4} sx={{ justifyContent: "center" }}>
//           {/* First Card (Larger) */}
//           <Grid item xs={12} sm={6} md={6} lg={4}>
//   <Card sx={{ backgroundColor: "#f5f5dc", padding: "20px", height: "400px" }}>
//     <CardContent sx={{ paddingBottom: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//       <div>
//         <Typography variant="h5" component="h3" sx={{ marginBottom: "10px" }}>
//           Electrical Services
//         </Typography>
//         <Typography variant="body1" sx={{ marginBottom: "20px" }}>
//           Expert solutions for all your electrical needs.
//         </Typography>
//       </div>

//       {/* Image inside the Card */}
//       <img
//         src="https://img.freepik.com/premium-photo/electricity-electrical-maintenance-service-engineer-hand-holding-ac-voltmeter-checking-electric-current-voltage-circuit-breaker-terminal-cable-wiring-main-power-distribution-board_101448-4286.jpg" // Use your image URL here
//         alt="Electrical Services"
//         style={{
//           width: "100%", // Makes the image fill the card width
//           height: "auto", // Adjusts the height automatically to maintain aspect ratio
//           objectFit: "cover", // Ensures the image covers the area without distortion
//           borderRadius: "8px", // Optional: gives the image rounded corners
//         }}
//       />
//     </CardContent>
//   </Card>
// </Grid>
//           {/* Two Horizontal Cards */}
//           <Grid item xs={12} sm={6} md={3} lg={3} >
//             <Card sx={{ backgroundColor: "#ff7f50", padding: "20px" ,width: "190%",marginLeft: "50px"}}>
//               <CardContent>
//                 <Typography variant="h5" component="h3" sx={{ marginBottom: "15px" }}>
//                   Plumbing
//                 </Typography>
//                 <Typography variant="body1">
//                   Efficient plumbing services, anytime you need.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3} lg={2} sx={{ marginTop: "200px" }}>
//             <Card sx={{ backgroundColor: "#77dd77", padding: "20px" ,bottom: "50",width: "295%",marginLeft: "-330px"}}>
//               <CardContent>
//                 <Typography variant="h5" component="h3" sx={{ marginBottom: "15px" }}>
//                   Mechanical
//                 </Typography>
//                 <Typography variant="body1">
//                   Reliable mechanical repairs and maintenance.
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Service Provider Section with Sliding Image */}
//       <Box sx={{ display: "flex", alignItems: "center", marginTop: "60px" }}>
//         <Box
//           sx={{
//             width: "40%",
//             animation: scrolling ? `${slideIn} 1s ease-out` : "none",
//             transition: "all 1s ease-out",
//           }}
//         >
//           <img src="https://thumbs.dreamstime.com/b/portrait-happy-young-man-standing-outside-street-blue-shirt-holding-phone-his-hand-looking-portrait-311119350.jpg" alt="Service Provider" style={{ width: "100%", borderRadius: "8px" }} />
//         </Box>
//         <Box sx={{ width: "50%", padding: "20px" }}>
//           <Typography variant="h5" component="h3" sx={{ fontSize: "30px", marginBottom: "20px" }}>
//             John Doe
//           </Typography>
//           <Typography variant="body1" sx={{ fontSize: "18px", lineHeight: 1.6 }}>
//             John is an experienced professional with over 10 years of expertise in electrical repairs. He is certified and reliable, ensuring top-notch service for all his clients.
//           </Typography>
//         </Box>
//       </Box>

//       {/* Footer Section (You can add your footer content here) */}
//     </Box>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { keyframes } from "@mui/system";

// Animation for scrolling slogan
const scrollSlogan = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const Home = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ padding: "0px", backgroundColor: "#f4f4f4" }}>
      {/* Scrolling Slogan */}
      <Box sx={{ overflow: "hidden", backgroundColor: "#ff7f50", marginBottom: "20px" }}>
        <Typography
          variant="h6"
          sx={{
            whiteSpace: "nowrap",
            animation: `${scrollSlogan} 10s linear infinite`,
            fontSize: "24px",
            color: "#fff",
            padding: "10px 0",
            textAlign: "center",
          }}
        >
          Your Trusted Service Platform - Making Life Easy with Professional Services at Your Doorstep!
        </Typography>
      </Box>

      {/* Hero Section with Image and Text */}
      <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
        <Box sx={{ position: "relative", minHeight: "40vh" }}>
          <img
            src="https://ecrossings.in/wp-content/uploads/2018/01/services.jpg" // Use the correct path for your image
            alt="Hero Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "orange",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            One-Stop Solution
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            marginTop: "20px",
            fontSize: "18px",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Your All-in-One Service Platform Finding trusted professionals for maintenance and repair services is now effortless with our unified platform. Whether it's AC repair, electrical fixes, plumbing, carpentry, home cleaning, or pest control, our app bridges the gap between you and verified service providers. With intuitive features like GPS tracking, instant booking, secure payments, and real-time chat, we make life hassle-free by bringing services to your doorstep. Tailored for both customers and professionals, our solution is efficient, reliable, and accessible. Experience seamless convenience for all your home and business service needs - anytime, anywhere!
        </Typography>
      </Box>

      {/* Horizontal Divider */}
      <Box sx={{ borderTop: "2px solid #ccc", margin: "40px 0" }} />

      {/* Cards Design Section */}
      <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
        <Typography variant="h4" component="h2" sx={{ marginBottom: "20px", my: 10 }}>
          Our Services
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {/* First Card (Larger) */}
          <Grid item xs={12} sm={6} md={6} lg={4}>
  <Card sx={{ backgroundColor: "#f5f5dc", padding: "20px", height: "400px" }}>
    <CardContent sx={{ paddingBottom: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <Typography variant="h5" component="h3" sx={{ marginBottom: "10px" }}>
          Electrical Services
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Expert solutions for all your electrical needs.
        </Typography>
      </div>

      {/* Image inside the Card */}
      <img
        src="https://img.freepik.com/premium-photo/electricity-electrical-maintenance-service-engineer-hand-holding-ac-voltmeter-checking-electric-current-voltage-circuit-breaker-terminal-cable-wiring-main-power-distribution-board_101448-4286.jpg" // Use your image URL here
        alt="Electrical Services"
        style={{
          width: "100%", // Makes the image fill the card width
          height: "auto", // Adjusts the height automatically to maintain aspect ratio
          objectFit: "cover", // Ensures the image covers the area without distortion
          borderRadius: "8px", // Optional: gives the image rounded corners
        }}
      />
    </CardContent>
  </Card>
</Grid>

          {/* Two Horizontal Cards */}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Card sx={{ backgroundColor: "#FFD7C4", padding: "20px", width: "190%", marginLeft: "50px" }}>
              <CardContent>
                <Typography variant="h5" component="h3" sx={{ marginBottom: "15px" }}>
                  Plumbing
                </Typography>
                <Typography variant="body1">Efficient plumbing services, anytime you need.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} sx={{ marginTop: "200px" }}>
            <Card sx={{ backgroundColor: "#E48586", padding: "20px", bottom: "50", width: "295%", marginLeft: "-330px" }}>
              <CardContent>
                <Typography variant="h5" component="h3" sx={{ marginBottom: "15px" }}>
                  Mechanical
                </Typography>
                <Typography variant="body1">Reliable mechanical repairs and maintenance.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
