import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import { thumbColor, scrollerBGColor } from '../../constants/color';
import { bgcolor } from '../../constants/color';
export default function SimpleContainer({ children, backgroundColor, height ,cursor}) {
  return (
    <Fragment>
      <Box sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <div>
          <Box sx={{
            cursor:cursor,
            bgcolor:' #272626',
            height: height,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px', // Width of the scrollbar
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor:thumbColor, // Color of the thumb
              borderRadius: '4px', // Border radius of the thumb
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: scrollerBGColor , // Color of the track
            },
          }}>
            {children}
          </Box>
        </div>
      </Box>
    </Fragment>
  );
}
