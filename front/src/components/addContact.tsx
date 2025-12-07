import { SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { getUserByMail } from "@/services/UserService";
import type { User } from "@/models/User";
import { sendFirstMessage } from "@/services/chatServices";
import { useUser } from "@/contexts/userContext";
import { toast } from "sonner";

export default function AddContact() {
  const LoggedInUser = useUser();

  const [message, setMessage] = useState("");
  const [mail, setMail] = useState("");
  const [user, setUser] = useState({} as User);

  const getUser = async () => {
    getUserByMail(mail)
      .then((userData) => {
        setUser(userData);
        console.log("User data retrieved:", userData);
      })
      .catch((error) => {
        console.error("Error fetching user by mail:", error);
        setUser({} as User);
      });
  };
  const sendMessage = async () => {
    sendFirstMessage({
      senderId: LoggedInUser!.id,
      recipientId: user.id,
      content: message,
    })
      .then((response) =>{
        console.log(response),
        toast("ChatRoom Created", {
          description: "Message sent successfully!",
        })}
      )
      .catch((error) => {
        console.error("Error sending first message:", error);
      });
  };

  useEffect(() => {
    if (message.length > 120) {
      setMessage(message.slice(0, 120));
    }
  }, [message]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add by E-mail</DialogTitle>
          <DialogDescription>
            Put the mail address of the contact you want to add.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="mail"
              placeholder="example@mail.com"
              type="email"
              autoFocus
              required
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="button"
          className="cursor-pointer"
          variant="secondary"
          disabled={mail == ""}
          onClick={getUser}
        >
          {user.name ? "Verified" : "Verify"}
        </Button>
        {user.name && (
          <InputGroup>
            <InputGroupTextarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-muted-foreground text-xs w-full flex justify-between">
                <div>{120 - message.length} characters left</div>
                <Button variant="default" size="sm" className="cursor-pointer" onClick={sendMessage}>
                  <SendHorizontal />
                </Button>
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        )}
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
