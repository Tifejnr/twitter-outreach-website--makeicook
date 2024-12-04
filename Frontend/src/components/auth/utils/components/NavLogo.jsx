import allIconsContainer from "../icons/allIconsContainer";

export default function NavLogo() {
  return (
    <>
      <div className="logo-container">
        <div className="logo">
          <div className="logo-icon">
            <img
              src={allIconsContainer.letterW}
              alt="logo letter w"
              width={100}
              height={100}
            />
          </div>
          <div className="logo-icon letter-f">
            <img
              src={allIconsContainer.letterF}
              alt="logo letter f"
              width={100}
              height={100}
            />
          </div>
          <div className="logo-icon letter-r">
            <img
              src={allIconsContainer.letterR}
              alt="logo letter r"
              width={100}
              height={100}
            />
          </div>
        </div>
        <h2 className="icon-title">Make I Cook</h2>
      </div>
    </>
  );
}
