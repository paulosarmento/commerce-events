import { Box, Typography } from "@mui/material";

interface CustomerProps {}

const Account: React.FC<any> = ({ customer }) => {
  return (
    <Box>
      <Typography variant="h6">My Account</Typography>
    </Box>
  );
};

export default Account;
