"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(
            `Vous êtes désormais abonné à ${data.following.username}`
          )
        )
        .catch(() => toast.error("Une erreur est survenue"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`Vous ignorez désormais ${data.following.username}`)
        )
        .catch(() => toast.error("Une erreur est survenue"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button disabled={isPending} onClick={onClick} variant="primary">
      {isFollowing ? "Ignorer" : "Suivre"}
    </Button>
  );
};
