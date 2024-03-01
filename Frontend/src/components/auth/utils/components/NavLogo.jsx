import allIconsContainer from "../icons/allIconsContainer";
import Image from "next/image";

export default function NavLogo() {
  return (
    <>
      <div className="logo-container">
        <div className="logo">
          <div className="logo-icon">
            <Image
              src={allIconsContainer.letterW}
              alt="logo letter w"
              width={100}
              height={100}
            />
          </div>
          <div className="logo-icon letter-f">
            <Image
              src={allIconsContainer.letterF}
              alt="logo letter f"
              width={100}
              height={100}
            />
          </div>
          <div className="logo-icon letter-r">
            <Image
              src={allIconsContainer.letterR}
              alt="logo letter r"
              width={100}
              height={100}
            />
          </div>
        </div>
        <h2 className="icon-title">Work for Reputation</h2>
      </div>
    </>
  );
}
