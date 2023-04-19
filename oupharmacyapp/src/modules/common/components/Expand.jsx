import { Box, Button, Fade } from "@mui/material";
import { useState } from "react";

const ExpandCloseComponent = (props) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
      };

    const content = expanded ? (
        <div>
            <p className="!ou-text-right"> 
                <Button onClick={toggleExpanded} >Close</Button>
            </p>
                {props.children}

        </div>
      ) : (
        <Box className="!ou-text-right">
            <Button onClick={toggleExpanded} >Expand</Button>
        </Box>
      );
    return (
        <div>
          {content}
        </div>
    );

}

export default ExpandCloseComponent