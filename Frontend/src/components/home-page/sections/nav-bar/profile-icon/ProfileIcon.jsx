import Image from "next/image";
import allIconsContainer from "@/app/components/auth/utils/icons/allIconsContainer";

export default function ProfileIcon() {
  return (
    <>
      <picture className="cartIcon userAccountIcon" title="My Profile">
        <Image
          src={allIconsContainer.accountIcon}
          alt="account icon"
          width={100}
          height={100}
          priority={true}
        />
      </picture>
    </>
  );
}
