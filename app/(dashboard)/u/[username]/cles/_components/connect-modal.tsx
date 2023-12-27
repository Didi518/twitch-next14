"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";

import { createIngress } from "@/actions/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Entrée créée");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Une erreur est survenue"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Générer une connexion</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Générer une connexion</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Type d'entrée" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Avertissement</AlertTitle>
          <AlertDescription>
            Cette action mettra fin à tous les streams utilisant cette connexion
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Annuler</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit} variant="primary">
            Générer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
