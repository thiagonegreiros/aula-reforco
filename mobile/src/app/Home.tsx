import React from "react";
import { View } from "react-native";
import { Menu } from "@/components/Menu";
import { User } from "@/components/User";

export function Home() {
  return (
    <>
      <View className="bg-white px-6 py-8 h-32">
        <User />
      </View>

      <View className="px-8 py-8 bg-white flex-1 justify-center items-center">
        <View className="flex flex-row flex-wrap justify-center items-center">
          <Menu title="Recados" navigate="notes" icon="file-text" />
          <Menu title="Lições Aplicadas" navigate="lesson" icon="book" />
          <Menu
            title="Enviar uma mensagem"
            navigate="index"
            icon="message-square"
          />
          <Menu title="Agendamento" navigate="schedule" icon="calendar" />
          <Menu title="Preferências" navigate="profile" icon="settings" />
          <Menu title="Frequência" icon="check-square" />
        </View>
      </View>
    </>
  );
}
