import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import { transformImage } from "../../lib/features";
import {
  primaryBackgroundColor,
  secondaryBackgroundColor,
  primaryTextColor,
  buttonText,
  statusOfflineColor,
  statusOnlineColor,
} from "../../constants/color"; // Assuming you have defined these colors in your colors.js or similar file

const UserItem = ({
  user,
  handler,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem
      disablePadding
      sx={{
        width: '90%', // Set width to 90% of its container
        maxWidth: '500px', // Optionally, set a maximum width
        backgroundColor: secondaryBackgroundColor,
        borderRadius: "8px",
        margin: "8px auto", // Center the item within its container
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: primaryBackgroundColor,
          transform: "scale(1.02)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        width="100%"
        paddingX={2}
        paddingY={1}
        {...styling}
      >
        <Avatar src={transformImage(avatar)} alt={name} sx={{ width: 48, height: 48 }} />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: primaryTextColor,
            fontWeight: "bold",
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          sx={{
            background: isAdded ? `linear-gradient(45deg, ${statusOfflineColor} 30%, ${statusOfflineColor} 90%)` : `linear-gradient(45deg, ${statusOnlineColor} 30%, ${statusOnlineColor} 90%)`,
            color: buttonText,
            "&:hover": {
              background: isAdded ? statusOfflineColor : statusOnlineColor,
            },
            transition: "background 0.3s ease",
          }}
          onClick={() => handler(_id, name)}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
