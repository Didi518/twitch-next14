"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { onBlock, onUnblock } from "@/actions/block";
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

  const handleBlock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => toast.success(`${data.blocked.username} débloqué`))
        .catch(() => toast.error("Une erreur est survenue"));
    });
  };

  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? "Ignorer" : "Suivre"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        Bloquer
      </Button>
    </>
  );
};
