import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1></h1>
      {!!user && (<h1>Hi {user.firstName}!</h1>)}
    </div>
  );
}
