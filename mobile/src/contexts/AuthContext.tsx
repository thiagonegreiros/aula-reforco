import { UserDto } from "@/dto/UserDto";
import { api } from "@/services/api";
import { ReactNode, createContext, useEffect, useState } from "react";

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@/storage/storageUser";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@/storage/storageAuthToken";
import {
  storageStudentGet,
  storageStudentSave,
} from "@/storage/storageStudent";
import { StudentDtoStorage } from "@/dto/StudentDto";

export type AuthContextDataProps = {
  user: UserDto;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
  updateUserProfile: (data: UserDto) => Promise<void>;
  student: StudentDtoStorage;
  updateStudent: (data: StudentDtoStorage) => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDto);
  const [student, setStudent] = useState({} as StudentDtoStorage);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  function userAndTokenUpdate(userData: UserDto, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDto);

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function storageUserAndTokenSave(userData: UserDto, token: string) {
    try {
      setIsLoadingUserStorageData(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/auth", { email, password });

      if (data.student) {
        await storageStudentSave(data.student);
        setStudent(data.student);
      }

      if (data.user && data.access_token) {
        await storageUserAndTokenSave(data.user, data.access_token);
        userAndTokenUpdate(data.user, data.access_token);
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();
      const student = await storageStudentGet();

      if (student) setStudent(student);

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDto) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function updateStudent(student: StudentDtoStorage) {
    try {
      console.log("Schedule update: ", student);

      setStudent(student);
      await storageStudentSave(student);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        signIn,
        isLoadingUserStorageData,
        updateUserProfile,
        student,
        updateStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
