import allIconsContainer from "../../../../auth/utils/icons/allIconsContainer";

export default function ProfileIcon() {
  return (
    <>
      <picture className="cartIcon userAccountIcon" title="My Profile">
        <img
          src={allIconsContainer.accountIcon}
          alt="account icon"
          width={100}
          height={100}
        />
      </picture>
    </>
  );
}
