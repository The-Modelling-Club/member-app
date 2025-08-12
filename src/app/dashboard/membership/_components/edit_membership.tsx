import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, updateUserData } from "@/app/lib/auth";
import { useState } from "react";

export default function EditMembership({
  handleSetUser,
  user,
}: {
  handleSetUser: (user: User) => void;
  user: User | null;
}) {
  const [open, setOpen] = useState(false);
  const isStudent = user?.type === "Student";
  const isGraduate = user?.type === "Graduate";

  const handleSave = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const update: Partial<User> = {
      type: (formData.get("type") as string) || user?.type,
      programme: (formData.get("programme") as string) || user?.programme,
      school: (formData.get("school") as string) || user?.school,
      student_type:
        (formData.get("student_type") as "Undergraduate" | "Postgraduate") ||
        user?.student_type,
      completion_year:
        (formData.get("completion_year") as string) || user?.completion_year,
      current_role:
        (formData.get("current_role") as string) || user?.current_role,
      company: (formData.get("company") as string) || user?.company,
    };
    const updated = updateUserData(update);
    if (updated) handleSetUser(updated);
    setOpen(false);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSave(e.currentTarget);
  };
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>Update Membership Info</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Update Membership Information</SheetTitle>
          </SheetHeader>
          <form className="mt-4 space-y-4 p-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="type">Member Type</Label>
              <Select name="type" defaultValue={user?.type}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select member type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="programme">Programme</Label>
              <Input name="programme" defaultValue={user?.programme} />
            </div>

            {/* Student-only */}
            {isStudent && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="student_type">Study Level</Label>
                  <Select name="student_type" defaultValue={user?.student_type}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select study level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Undergraduate">
                        Undergraduate
                      </SelectItem>
                      <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="school">School</Label>
                  <Input name="school" defaultValue={user?.school} />
                </div>
              </>
            )}

            {/* Graduate-only */}
            {isGraduate && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="completion_year">Completion Year</Label>
                  <Input
                    name="completion_year"
                    defaultValue={user?.completion_year}
                    placeholder="YYYY"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="current_role">Current Role</Label>
                  <Input
                    name="current_role"
                    defaultValue={user?.current_role}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input name="company" defaultValue={user?.company} />
                </div>
              </>
            )}

            <SheetFooter className="!p-0">
              <Button type="submit" className="w-full">
                Save
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
