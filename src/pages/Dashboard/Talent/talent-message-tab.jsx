import HelpCenter from "@/components/helpCenter";
import { useUserData } from "@/store/userDataStorage";

export default function TalentMessageTab() {
  const talent = useUserData((state) => state.userData);
  return (
    <HelpCenter
      senderId={talent?.id}
      receiverId={"691e653096fd6d2e9f491d16"}
      userType={talent?.userType}
      profilePicture={talent?.techTalentUser.profilePicture}
      senderName={`${talent?.firstName} " " ${talent?.lastName}`}
    />
  );
}
