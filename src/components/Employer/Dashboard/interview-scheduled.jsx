import NextScheduledInterview from "./next-scheduled-interview";
import TodayScheduleInterview from "./today-schedule-interview";
import PastScheduledInterview from "./past-scheduled-interview";
import { getStoredKey } from "@/lib/utils";
import { useGetAllInterviewCandidates } from "@/hooks/useJobs";
import { useUserData } from "@/store/userDataStorage";

export function ScheduledInterview() {
  const storedJwtToken = getStoredKey();
  const employer = useUserData((state) => state.userData);
  const {
    data: interviews,
    isLoading,
    isError: interviewError,
  } = useGetAllInterviewCandidates(employer?.id, storedJwtToken);

  console.log(interviews);

  //Normalize today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  //Filter logic
  const pastInterviews = interviews?.filter((interview) => {
    const d = new Date(interview.interviewDate);
    d.setHours(0, 0, 0, 0);
    return d < today;
  });

  const todayInterviews = interviews?.filter((interview) => {
    const d = new Date(interview.interviewDate);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const futureInterviews = interviews?.filter((interview) => {
    const d = new Date(interview.interviewDate);
    d.setHours(0, 0, 0, 0);
    return d > today;
  });

  return (
    <div className="flex-1 flex-col">
      <TodayScheduleInterview todayInterviews={todayInterviews} />
      <NextScheduledInterview nextInterviews={futureInterviews} />
      {!todayInterviews?.length > 0 && (
        <PastScheduledInterview pastInterviews={pastInterviews} />
      )}
    </div>
  );
}
