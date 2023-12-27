import { useMemo } from "react";
import { Info } from "lucide-react";

import { Hint } from "@/components/hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Seuls les abonnés peuvent chatter";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Messages retardés par 3 secondes";
    }

    if (isDelayed && isFollowersOnly) {
      return "Seuls les abonnés peuvent chatter. Messages retardés par 3 secondes";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Abonnés uniquement";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Mode lent";
    }

    if (isDelayed && isFollowersOnly) {
      return "Abonnés uniquement et mode lent";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
