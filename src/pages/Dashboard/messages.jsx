import HelpCenter from "@/components/helpCenter";
import { useUserData } from "@/store/userDataStorage";

export default function MessagesPage() {
  const service_provider = useUserData((state) => state.userData);
  return (
    <HelpCenter
      senderId={service_provider?.id}
      receiverId={"691e653096fd6d2e9f491d16"}
      userType={service_provider?.userType}
      profilePicture={service_provider?.serviceProvider.profilePicture}
      senderName={`${service_provider?.firstName} " " ${service_provider?.lastName}`}
    />
  );
}
