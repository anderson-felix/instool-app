import React from "react";
import styled from "styled-components";
import { Card } from "antd";

export const UsernameDiv = styled(Card)`
  width: 50%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  & .ant-card-body {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    & .username {
      margin-top: 20px;
      width: 400px;
    }
  }
`;
