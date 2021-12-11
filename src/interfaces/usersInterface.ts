interface UserBody {
  name: string;
  classname: string;
  token?: string;
}

interface UserDB {
  name: string;
  classId: number;
  token: string;
}

export {
  UserBody,
  UserDB,
};
