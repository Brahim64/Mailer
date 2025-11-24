import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { useUser } from "@/contexts/userContext";

export function SideBarProfile() {
  const user = useUser();
  return (
    <Card>
      <CardContent>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={user?.profileImage} alt="profile" />
            <AvatarFallback>Pic</AvatarFallback>
          </Avatar>
          <div>
            <h1>{user?.name}</h1>
            <h1 className="text-[grey] text-sm">{user?.email}</h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
