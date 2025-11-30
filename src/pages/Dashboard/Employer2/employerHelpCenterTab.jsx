import HelpCenter from "@/components/helpCenter";
import { useUserData } from "@/store/userDataStorage";

export default function EmployerHelpCenterTab() {
  const employer = useUserData((state) => state.userData);
  return (
    <HelpCenter
      senderId={employer?.id}
      receiverId={"691e653096fd6d2e9f491d16"}
      userType={employer?.userType}
      profilePicture={employer?.employer.companyLogo}
      senderName={employer?.employer.companyName}
    />
  );
}
