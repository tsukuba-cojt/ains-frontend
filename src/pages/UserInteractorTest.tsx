import { Box, Button, useColorModeValue, Input, Text, Flex } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";

import { FilterArg } from "@/interactors/BaseInteractor";
import BaseInteractor from "@/interactors/BaseInteractor";
import DMInteractor from "@/interactors/DM/DMInteractor";
import { DMCreateData, DMMessageCreateData } from "@/interactors/DM/DMTypes";

import { theme } from "./_app";

const FirebaseTestPage = () => {
  const auth = getAuth();
  const db = getFirestore();
  const [DMIDInput, setDMIDInput] = useState("");
  const [senderIDInput, setSenderIDInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [dmMembersInput, setDMMembersInput] = useState("");
  const [dmNameInput, setDMNameInput] = useState("");
  const [DMdom, setDMdom] = useState<ReactNode>(<></>);

  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  const hoge_func = async () => {
    console.log("nnnnnnnnn");
    const interactor = new BaseInteractor();
    const dminteractor = new DMInteractor();
    //console.log(await interactor.get("o8S50pCLAIcpOtl6cGtj"));
    //const fddd: FilterArg = { key: "tags", operator: "array-contains", value: "temple" };
    //console.log(await interactor.FilterAnd("artworks", [fddd]));
    const fddd: FilterArg = { key: "member_ids", operator: "array-contains", value: "fKlgkoss0nNWYamOJkMuLxOWGEW2" };
    //console.log(await interactor.FilterAnd("DMs", [fddd]));
    console.log(await dminteractor.getWithMemberID_DM("fKlgkoss0nNWYamOJkMuLxOWGEW2"));
    console.log(await interactor.getSubCollections("DMs", ["o8S50pCLAIcpOtl6cGtj", "Comments"], 100));
  };

  const addDM = async (): Promise<void> => {
    const members = dmMembersInput.split("/");
    const interactor: DMInteractor = new DMInteractor();
    const createData: DMCreateData = { name: dmNameInput, member_ids: members };
    await interactor.set_DM(createData);
    console.log("DMを新規作成");
  };
  const addDMMessage = async (): Promise<void> => {
    const interactor: DMInteractor = new DMInteractor();
    const createData: DMMessageCreateData = {
      sender_id: senderIDInput,
      content: contentInput,
    };
    await interactor.set_DMMessage(DMIDInput, createData);
    console.log("おくったよ");
  };

  const getDMs = async () => {
    const data = await new DMInteractor().getLatests_DM(10);
    console.log(data);
    if (data) {
      let nextDom = <></>;

      for (let i = 0; i < data.length; i++) {
        const DMMessages = await new DMInteractor().getLatests_DMMessage(data[i].id, 20);
        nextDom = (
          <>
            {nextDom}
            <Box key='ss' border={"8px"} padding={"8px"}>
              <Text key={data[i].id}>{`${data[i].id}`}</Text>
              <Text key={data[i].id}>{`member:${data[i].members.map((aData) => aData.id)}`}</Text>
              <Text key={data[i].id}>{`name:${data[i].name}`}</Text>
              <Text>
                {DMMessages?.map((aData) => aData.content + `(${aData.sender.id} : ${aData.created_at})` + "<=")}
              </Text>
            </Box>
          </>
        );
      }
      setDMdom(nextDom);
    }
  };

  const GetDMMessage = async (): Promise<void> => {
    const interactor: DMInteractor = new DMInteractor();

    console.log(await interactor.getLatests_DMMessage(DMIDInput, 20));
  };

  return (
    <Box>
      <Flex>
        <Text width={"200px"}>DMのID</Text>
        <Input
          id='name'
          type='text'
          onChange={(e) => {
            setDMIDInput(e.target.value);
          }}
        />
      </Flex>
      <Flex>
        <Text width={"200px"}>送信者のID</Text>
        <Input
          id='name'
          type='text'
          onChange={(e) => {
            setSenderIDInput(e.target.value);
          }}
        />
      </Flex>
      <Flex>
        <Text width={"200px"}>送信内容</Text>
        <Input
          id='name'
          type='text'
          onChange={(e) => {
            setContentInput(e.target.value);
          }}
        />
      </Flex>

      <Button onClick={addDMMessage}>addMessage</Button>
      <Button onClick={GetDMMessage}>GetMessage</Button>
      <Box margin='50px'></Box>
      <Flex>
        <Text width={"200px"}>DMの名前</Text>
        <Input
          id='name'
          type='text'
          onChange={(e) => {
            setDMNameInput(e.target.value);
          }}
        />
      </Flex>
      <Flex>
        <Text width={"200px"}>DMのメンバーのID</Text>
        <Input
          id='name'
          type='text'
          onChange={(e) => {
            setDMMembersInput(e.target.value);
          }}
        />
      </Flex>
      <Button onClick={addDM}>addDM</Button>
      <Button onClick={getDMs}>getDM</Button>
      {DMdom}
    </Box>
  );
};

export default FirebaseTestPage;
