import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

function VolunteerConditionalRender() {
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);
  const [cookies] = useCookies(["donor_token"]);

  useEffect(() => {
    if (cookies.donor_token) {
      try {
        const decoded = jwtDecode(cookies.donor_token);
        setDecodedToken(decoded);

        if (decoded.acclvl === "donor") {
          navigate("/Volunteers");
        } else if (decoded.acclvl === "volunteer") {
          navigate("/VolunteerDashboard");
        } else if (decoded.acclvl === "volunteer_apply") {
          navigate("/VolunteerPendingApply");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  return <div></div>;
}

export default VolunteerConditionalRender;
