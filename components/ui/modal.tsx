"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MotionScale } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";

type ModalProps = {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/**
 * Reusable Modal built on Dialog primitives with motion.
 * Prefer Dialog for low-level composition; Modal for common patterns.
 */
export function Modal({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent>
        <MotionScale>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>
          <div className="py-2">{children}</div>
          {footer ? (
            <DialogFooter>{footer}</DialogFooter>
          ) : (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange?.(false)}>
                Close
              </Button>
            </DialogFooter>
          )}
        </MotionScale>
      </DialogContent>
    </Dialog>
  );
}
