
export interface IChatUser {
  id:string;
  issuer: string;
  email: string;
  emailverified: boolean; // converted from "true"/"false" string
  name: string;
  profileImage: string;
}

export interface IMetaData {
  createdat: string; // ISO date string
  users: IChatUser[]; // keyed by userId
}

export interface IChatRoom {
  _id: string; // extracted from $oid
  name: string;
  private: boolean;
  participantids: string[];
  metaData: IMetaData;
}
export interface IMessage {
  id: string;          // MongoDB ObjectId as string
  roomId: string;
  senderId: string;
  content: string;
  sentAt: Date;
}



export class ChatUser implements IChatUser {
  id:string;
  issuer: string;
  email: string;
  emailverified: boolean;
  name: string;
  profileImage: string;

  constructor(data: any) {
    this.id = data.id;
    this.issuer = data.issuer;
    this.email = data.email;
    this.emailverified = data.emailverified === "true";
    this.name = data.name;
    this.profileImage = data.profileImage;
  }
}

export class MetaData implements IMetaData {
  createdat: string;
  users: ChatUser[];
  lastMessage?: Message;

  constructor(data: any) {
    this.createdat = data.createdat.$date;
    this.users = data.users.map((u: any) => new ChatUser(u));
  }
}

export class ChatRoom implements IChatRoom {
  _id: string;
  name: string;
  private: boolean;
  participantids: string[];
  metaData: MetaData;

  constructor(data: any) {
    this._id = data._id.$oid;
    this.name = data.name;
    this.private = data.private;
    this.participantids = data.participantids;
    this.metaData = new MetaData(data.metaData);
  }
}
export class Message implements IMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  sentAt: Date;

  constructor(data: any) {
    // Defensive mapping from raw MongoDB document
    this.id = data._id?.$oid ?? data.id;
    this.roomId = data.roomId;
    this.senderId = data.senderId;
    this.content = data.content;
    this.sentAt = data.sentAt instanceof Date 
      ? data.sentAt 
      : new Date(data.sentAt);
  }
}