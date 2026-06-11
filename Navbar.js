import { Link, useNavigate } from "react-router-dom";

function Navbar({ cart }) {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#ff6b00",
        color: "white",
        position: "sticky",
        top: "0",
      }}
    >

      <h1
        style={{
          margin: "0",
        }}
      >
        FoodApp
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >

        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Home
        </Link>

        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Cart ({cart.length})
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <h3>{user.name}</h3>

            <button
              onClick={handleLogout}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: "white",
                color: "#ff6b00",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar;