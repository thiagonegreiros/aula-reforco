import AsyncStorage from "@react-native-async-storage/async-storage";
import { STUDENT_STORAGE } from "./storage.config";
import { StudentDtoStorage } from "@/dto/StudentDto";

export async function storageStudentSave(student: StudentDtoStorage) {
  await AsyncStorage.setItem(STUDENT_STORAGE, JSON.stringify(student));
}

export async function storageStudentGet() {
  const storage = await AsyncStorage.getItem(STUDENT_STORAGE);
  const student: StudentDtoStorage = storage ? JSON.parse(storage) : {};

  return student;
}

export async function storageStudentRemove() {
  await AsyncStorage.removeItem(STUDENT_STORAGE);
}
