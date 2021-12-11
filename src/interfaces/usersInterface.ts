interface UserBody {
  name: string;
  classname: string;
  token?: string;
}

interface UserDB {
  name: string;
  classId: number;
  token?: string;
}

interface User {
  id: number;
  name: string;
  token: string;
  class_id: number;
}

export {
  UserBody,
  UserDB,
  User
};
