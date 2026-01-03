import NextScheduledInterview from "./next-scheduled-interview";
import TodayScheduleInterview from "./today-schedule-interview";
import PastScheduledInterview from "./past-scheduled-interview";
import { getStoredKey } from "@/lib/utils";
import { useUserData } from "@/store/userDataStorage";
import { useGetInterviewCandidates } from "@/hooks/useJobs";
import emptyScheduleImage from "@/static/icons/SVG/schedule.svg";

export function ScheduledInterview() {
  const storedJwtToken = getStoredKey();
  const employer = useUserData((state) => state.userData);

  const {
    allInterviews,
    pastInterviews,
    todayInterviews,
    upcomingInterviews,
    isLoading,
  } = useGetInterviewCandidates(employer?.id, storedJwtToken);

  return (
    <>
      {allInterviews?.length > 0 ? (
        <div className="flex-1 flex-col">
          <TodayScheduleInterview todayInterviews={todayInterviews} />
          <NextScheduledInterview nextInterviews={upcomingInterviews} />
          {todayInterviews?.length <= 0 && (
            <PastScheduledInterview pastInterviews={pastInterviews} />
          )}
        </div>
      ) : (
        <div className="flex-1 flex-col bg-white border rounded-lg p-4">
          <div className="w-full py-32 flex flex-col gap-3 justify-center items-center">
            <img
              className="w-40"
              src={emptyScheduleImage}
              alt="no schedule yet "
            />
            <div className="text-sm italic text-center text-gray-400">
              <p className="text-primary">No interview schedule yet...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
