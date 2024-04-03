import React from "react";
import { View } from "react-native";
import { Menu } from "@/components/Menu";
import { User } from "@/components/User";
import { useAuth } from "@/hooks/useAuth";

export function Home() {
  //TODO: create a personal message like a "Olá Professora, eu sou o aluno Juarez.";
  const { user } = useAuth();

  const msg = `Olá Professora, eu sou o(a) aluno(a) ${user.name}.`;

  let url = "https://wa.me/+55092994495985?text=" + msg;
  return (
    <>
      <View className="bg-neutral-200 px-6 py-8 h-32">
        <User />
      </View>

      <View className="bg-neutral-200 px-8 py-8 flex-1 justify-center items-center">
        <View className="flex flex-row flex-wrap justify-center items-center">
          <Menu title="Recados" navigate="notes" icon="file-text" />
          <Menu title="Lições Aplicadas" navigate="lesson" icon="book" />
          <Menu
            title="Enviar uma mensagem"
            deepLink={url}
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
